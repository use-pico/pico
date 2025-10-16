import { useMutation } from "@tanstack/react-query";
import type { EntitySchema } from "@use-pico/common";
import writeXlsxFile, { type Schema } from "write-excel-file";
import { Button } from "../button/Button";
import { ExportIcon } from "../icon/ExportIcon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { Modal } from "../modal/Modal";
import { ModalFooter } from "../modal/ModalFooter";
import type { Transfer } from "../transfer/Transfer";
import { Tx } from "../tx/Tx";

export namespace ExportButton {
	export type ExportSchema<TItem extends EntitySchema.Type> = Schema<TItem>;

	export namespace Source {
		export interface Props {
			page: number;
			size: number;
		}

		export type Fn = (props: Props) => Promise<EntitySchema.Type[]>;
	}

	export interface Props<TItem extends EntitySchema.Type>
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
		source: Source.Fn;
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

	export type PropsEx<TItem extends EntitySchema.Type> = Omit<
		Props<TItem>,
		"items" | "schema"
	>;
}

export const ExportButton = <TItem extends EntitySchema.Type>({
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
			tweak={{
				slot: {
					modal: {
						class: [
							"w-1/2",
						],
					},
				},
			}}
			{...modalProps}
			target={<Button {...props} />}
		>
			{() => (
				<ModalFooter
					disabled={!selected.length}
					loading={mutation.isPending}
					cancelText="Cancel (button)"
					confirmText="Export (button)"
					confirmIcon={ExportIcon}
					onConfirm={() => {
						mutation.mutate(undefined, {
							onSuccess() {
								close();
							},
						});
					}}
				/>
			)}
		</Modal>
	);
};
