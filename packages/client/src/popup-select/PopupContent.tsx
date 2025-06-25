import type { UseQueryResult } from "@tanstack/react-query";
import type { IdentitySchema } from "@use-pico/common";
import { type FC, useContext, useMemo } from "react";
import { ModalContext } from "../modal/ModalContext";
import type { withListCount } from "../source/withListCount";
import type { createLocalTableStore } from "../table/createLocalTableStore";
import type { Table } from "../table/Table";
import { Tx } from "../tx/Tx";
import { PopupSelectCls } from "./PopupSelectCls";

export namespace PopupContent {
	export interface Props extends PopupSelectCls.Props {
		table: FC<Table.PropsEx<any>>;

		/**
		 * Stable reference to the table store.
		 */
		useLocalStore: createLocalTableStore.Store;

		result: UseQueryResult<
			withListCount.Result<IdentitySchema.Type>,
			Error
		>;

		onChange(value: string | null): void;
		/**
		 * Selected (submitted) value/null.
		 */
		onSelect?(item: IdentitySchema.Type | null): void;
	}
}

export const PopupContent: FC<PopupContent.Props> = ({
	table: Table,
	useLocalStore,

	result,

	onChange,
	onSelect,

	variant,
	tva = PopupSelectCls,
	cls,
}) => {
	const page = useLocalStore((state) => state.page);
	const setPage = useLocalStore((state) => state.setPage);
	const size = useLocalStore((state) => state.size);
	const setSize = useLocalStore((state) => state.setSize);
	const selection = useLocalStore((state) => state.selection);
	const setSelection = useLocalStore((state) => state.setSelection);
	const fulltext = useLocalStore((state) => state.fulltext);
	const setFulltext = useLocalStore((state) => state.setFulltext);

	const useModal = useContext(ModalContext);
	const close = useModal((state) => state.close);

	const { slots } = tva(variant, cls);

	return (
		<div className={slots.base()}>
			<div className={slots.content()}>
				<Table
					cursor={useMemo(
						() => ({
							cursor: {
								page,
								size,
							},
							count: result.data?.count
								? result.data.count
								: {
										filter: -1,
										total: -1,
										where: -1,
									},
							textTotal: (
								<Tx label={"Total count of items (label)"} />
							),
							onPage(page) {
								setPage(page);
							},
							onSize(size) {
								setSize(size);
								setPage(0);
							},
						}),
						[
							page,
							size,
							result.data,
							setPage,
							setSize,
						],
					)}
					fulltext={useMemo(
						() => ({
							value: fulltext,
							set(value) {
								setFulltext(value);
								setPage(0);
							},
						}),
						[
							fulltext,
							setFulltext,
							setPage,
						],
					)}
					data={result.data?.list}
					selection={useMemo(
						() => ({
							type: "single",
							state: {
								value: selection,
								set(selection) {
									setSelection(selection);
								},
							},
						}),
						[
							selection,
							setSelection,
						],
					)}
					row={{
						onDoubleClick({ data }) {
							onChange(data.id);
							onSelect?.(data);
							close();
						},
					}}
				/>
			</div>
		</div>
	);
};
