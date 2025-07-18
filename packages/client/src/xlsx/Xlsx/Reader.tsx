import { useQuery } from "@tanstack/react-query";
import { xlsxOf } from "@use-pico/common";
import { useMemo, type FC } from "react";
import z from "zod";
import type { JustDropZone } from "../../just-drop-zone/JustDropZone";
import { LoadingOverlay } from "../../loading-overlay/LoadingOverlay";

export namespace Reader {
	export interface Sheet<TSchema extends z.core.$ZodObject> {
		sheet: string;
		schema: TSchema;
	}

	export type Result<TLoad extends Record<string, Sheet<any>>> = {
		[K in keyof TLoad]: z.infer<TLoad[K]["schema"]>[];
	};

	export interface Props<TLoad extends Record<string, Sheet<any>>>
		extends JustDropZone.ChildrenProps {
		load: TLoad;
		onSuccess(result: Result<TLoad>): Promise<any>;
		children: FC<{
			result: Result<TLoad>;
		}>;
	}
}

export const Reader = <TLoad extends Record<string, Reader.Sheet<any>>>({
	files: [file],
	load,
	onSuccess,
	children: Children = () => null,
}: Reader.Props<TLoad>) => {
	const data = useQuery({
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryKey: [
			"xlsx",
			{
				file: file.name,
				sheets: Object.keys(load),
			},
		],
		async queryFn() {
			const defaults = (
				await xlsxOf({
					file,
					sheet: "defaults",
					schema: z.object({
						tab: z.string(),
						key: z.string(),
						value: z.string(),
					}),
				})
			).reduce(
				(acc, { tab, key, value }) => {
					acc[tab] = {
						...acc[tab],
						[key]: value,
					};
					return acc;
				},
				{} as Record<string, Record<string, any>>,
			);

			/**
			 * Load translations which are common for all sheets.
			 */
			const commonTranslations = (
				await xlsxOf({
					file,
					sheet: "translations",
					schema: z.object({
						from: z.string(),
						to: z.string(),
					}),
				})
			)?.reduce(
				(acc, { from, to }) => {
					acc[from] = to;
					return acc;
				},
				{} as Record<string, string>,
			);

			const result = {} as Reader.Result<TLoad>;

			for (const [key, { sheet, schema }] of Object.entries(load)) {
				/**
				 * Load sheet specific translations.
				 */
				const sheetTranslations = (
					await xlsxOf({
						file,
						sheet: `${sheet} - translations`,
						schema: z.object({
							from: z.string(),
							to: z.string(),
						}),
					})
				)?.reduce(
					(acc, { from, to }) => {
						acc[from] = to;
						return acc;
					},
					{} as Record<string, string>,
				);

				const data = await xlsxOf({
					file,
					sheet,
					schema,
					translations: {
						...commonTranslations,
						...sheetTranslations,
					},
					defaults: defaults[sheet],
				});

				result[key as keyof TLoad] = data;
			}

			await onSuccess(result);

			return result;
		},
	});

	const memo = useMemo(
		() =>
			data.isSuccess ? <Children result={data.data} /> : "err, (not yet)",
		[
			data.data,
			data.isSuccess,
			Children,
		],
	);

	if (data.isFetching) {
		return <LoadingOverlay />;
	} else if (data.isSuccess) {
		return memo;
	}

	return <LoadingOverlay />;
};
