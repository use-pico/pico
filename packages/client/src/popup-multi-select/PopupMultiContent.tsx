import type { UseQueryResult } from "@tanstack/react-query";
import type { CountSchema, EntitySchema } from "@use-pico/common";
import type { FC } from "react";
import type { createLocalTableStore } from "../table/createLocalTableStore";
import { PopupMultiSelectCls } from "./PopupMultiSelectCls";

export namespace PopupMultiContent {
	export interface List<TItem extends EntitySchema.Type> {
		list: TItem[];
		count: CountSchema.Type;
	}

	export interface Props extends PopupMultiSelectCls.Props {
		// table: FC<Table.PropsEx<any, any>>;
		/**
		 * Stable reference to the table store.
		 */
		useLocalStore: createLocalTableStore.Store;
		result: UseQueryResult<List<any>, Error>;
	}
}

export const PopupMultiContent: FC<PopupMultiContent.Props> = ({
	// table: Table,
	useLocalStore: _useLocalStore,

	result: _result,

	variant,
	tva = PopupMultiSelectCls,
	cls,
}) => {
	// const page = useLocalStore((state) => state.page);
	// const setPage = useLocalStore((state) => state.setPage);
	// const size = useLocalStore((state) => state.size);
	// const setSize = useLocalStore((state) => state.setSize);
	// const selection = useLocalStore((state) => state.selection);
	// const setSelection = useLocalStore((state) => state.setSelection);
	// const fulltext = useLocalStore((state) => state.fulltext);
	// const setFulltext = useLocalStore((state) => state.setFulltext);

	const { slots } = tva(variant, cls);

	return (
		<div className={slots.base()}>
			<div className={slots.content()}>
				{/* <Table
					cursor={{
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
					}}
					fulltext={{
						value: fulltext,
						set(value) {
							setFulltext(value);
							setPage(0);
						},
					}}
					data={result.data?.list}
					selection={{
						type: "multi",
						state: {
							value: selection,
							set(selection) {
								setSelection(selection);
							},
						},
					}}
					row={{
						onDoubleClick({ data }) {
							setSelection(
								selection.includes(data.id)
									? selection.filter(
											(item) => item !== data.id,
										)
									: [
											...selection,
											data.id,
										],
							);
						},
					}}
				/> */}
			</div>
		</div>
	);
};
