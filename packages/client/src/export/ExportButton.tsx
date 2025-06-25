import { useMutation } from "@tanstack/react-query";
import type { IdentitySchema } from "@use-pico/common";
import writeXlsxFile, { type Schema } from "write-excel-file";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { ExportIcon } from "../icon/ExportIcon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { Modal } from "../modal/Modal";
import type { Transfer } from "../transfer/Transfer";
import { Tx } from "../tx/Tx";

export namespace ExportButton {
	export type ExportSchema<TItem extends IdentitySchema.Type> = Schema<TItem>;

	export namespace Source {
		export interface Props {
			page: number;
			size: number;
		}

		export type Callback = (props: Props) => Promise<IdentitySchema.Type[]>;
	}

	export interface Props<TItem extends IdentitySchema.Type>
		extends Button.Props {
		selected: string[];
		/**
		 * Definition of available items to export.
		 */
		items: Transfer.Group<{
			id: string;
			name?: string;
		}>[];
		/**
		 * Quite obvious, but still.
		 */
		modalProps?: Modal.PropsEx;
		/**
		 * Source callback used to get data for export.
		 *
		 * There is no input as the source is responsible for binding all required parameters.
		 */
		source: Source.Callback;
		/**
		 * Callback to get the count of items to be exported. Used for internal paging & progress.
		 */
		count(): Promise<number>;
		/**
		 * How many items per page to download.
		 */
		pageSize?: number;
		sheet: string;
		/**
		 * Excel schema for an export.
		 */
		schema: Schema<TItem>;
		file: string;
	}

	export type PropsEx<TItem extends IdentitySchema.Type> = Omit<
		Props<TItem>,
		"items" | "schema"
	>;
}

export const ExportButton = <TItem extends IdentitySchema.Type>({
	selected,
	items,
	modalProps,
	source,
	count,
	pageSize = 100,
	sheet,
	file,
	schema,
	...props
}: ExportButton.Props<TItem>) => {
	const mutation = useMutation({
		mutationKey: [
			"export",
		],
		async mutationFn() {
			const total = await count();
			const pages = Math.ceil(total / pageSize);
			const data: any[] = [];

			const pick = items
				.flatMap((group) => group.items)
				.filter((i) => selected.includes(i.id))
				.map((i) => i.id);

			for (let page = 0; page < pages; page++) {
				data.push(
					...(await source({
						page,
						size: pageSize,
					})),
				);
			}

			return writeXlsxFile(data, {
				sheet,
				schema: schema
					.filter((s) => s.column && selected.includes(s.column))
					.sort(
						(a, b) =>
							pick.indexOf(a.column ?? "") -
							pick.indexOf(b.column ?? ""),
					),
				fileName: file,
			});
		},
		onError(e) {
			console.error(e);
		},
	});

	return (
		<Modal
			textTitle={<Tx label={"Export settings (title)"} />}
			icon={mutation.isPending ? LoaderIcon : ExportIcon}
			disabled={mutation.isPending}
			footer={({ close }) => {
				return (
					<div
						className={
							"flex flex-row gap-2 justify-between items-center"
						}
					>
						<Button
							variant={{
								variant: "light",
								borderless: true,
								size: "md",
							}}
							iconEnabled={BackIcon}
							onClick={() => {
								close();
							}}
						>
							<Tx label={"Cancel (button)"} />
						</Button>

						<Button
							iconEnabled={ExportIcon}
							iconDisabled={ExportIcon}
							loading={mutation.isPending}
							disabled={!selected.length}
							onClick={() => {
								mutation.mutate(undefined, {
									onSuccess() {
										close();
									},
								});
							}}
						>
							<Tx label={"Export (button)"} />
						</Button>
					</div>
				);
			}}
			cls={{
				modal: [
					"w-1/2",
				],
			}}
			{...modalProps}
			target={<Button {...props} />}
		/>
	);
};
