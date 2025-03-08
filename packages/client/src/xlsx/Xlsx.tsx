import { useQuery } from "@tanstack/react-query";
import { xlsxOf } from "@use-pico/common";
import { useMemo, type FC } from "react";
import { z } from "zod";
import { JustDropZone } from "../just-drop-zone/JustDropZone";
import { LoadingOverlay } from "../loading-overlay/LoadingOverlay";

export namespace Xlsx {
	export interface Props<TSchema extends z.ZodObject<any, any, any, any, any>>
		extends Omit<JustDropZone.Props, "children"> {
		sheet?: string;
		schema: TSchema;
		onSuccess?(result: xlsxOf.Result<TSchema>): Promise<any>;
		children?: FC<{ result: xlsxOf.Result<TSchema> }>;
	}
}

export const Xlsx = <TSchema extends z.ZodObject<any, any, any, any, any>>({
	sheet,
	schema,
	onSuccess = async () => null,
	children: Children = () => null,
	...props
}: Xlsx.Props<TSchema>) => {
	return (
		<JustDropZone
			accept={{
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
					".xlsx",
				],
				"application/x-excel": [".xlsx"],
				"application/vnd.ms-excel": [".xlsx"],
			}}
			{...props}
		>
			{({ files: [file] }) => {
				const data = useQuery({
					queryKey: ["xlsx", { file: file?.name, sheet }],
					queryFn: async () => {
						const translations = (
							await xlsxOf({
								file: file!,
								sheet: `${sheet} - translations`,
								schema: z.object({ from: z.string(), to: z.string() }),
							})
						)?.reduce(
							(acc, { from, to }) => {
								acc[from] = to;
								return acc;
							},
							{} as Record<string, string>,
						);

						const data = await xlsxOf({
							file: file!,
							sheet: sheet!,
							schema,
							map({ header, value }) {
								return translations?.[header] ?
										{ header: translations[header], value }
									:	{ header, value };
							},
						});

						await onSuccess(data);

						return data;
					},
					enabled: Boolean(file) && Boolean(sheet),
				});

				const memo = useMemo(
					() =>
						data.isSuccess ? <Children result={data.data} /> : "err, (not yet)",
					[data.data],
				);

				if (data.isFetching) {
					return <LoadingOverlay />;
				} else if (data.isSuccess) {
					return memo;
				}

				return <LoadingOverlay />;
			}}
		</JustDropZone>
	);
};
