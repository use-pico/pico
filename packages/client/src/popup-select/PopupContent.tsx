import type { UseQueryResult } from "@tanstack/react-query";
import type { CountSchema, EntitySchema } from "@use-pico/common";
import type { FC } from "react";
import type { createLocalTableStore } from "../table/createLocalTableStore";
import type { PopupSelect } from "./PopupSelect";
import { PopupSelectCls } from "./PopupSelectCls";

export namespace PopupContent {
	export interface List<TItem extends EntitySchema.Type> {
		list: TItem[];
		count: CountSchema.Type;
	}

	export interface Props extends PopupSelectCls.Props {
		table: PopupSelect.Table.Component;

		/**
		 * Stable reference to the table store.
		 */
		useLocalStore: createLocalTableStore.Store;

		result: UseQueryResult<List<EntitySchema.Type>, Error>;

		onChange(value: string | null): void;
		/**
		 * Selected (submitted) value/null.
		 */
		onSelect?(item: EntitySchema.Type | null): void;
	}
}

export const PopupContent: FC<PopupContent.Props> = ({
	// table: Table,
	// useLocalStore,

	// result,

	// onChange,
	// onSelect,

	variant,
	tva = PopupSelectCls,
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

	// const useModal = useContext(ModalContext);
	// const close = useModal((state) => state.close);

	const { slots } = tva(variant, cls);

	return (
		<div className={slots.base()}>
			<div className={slots.content()}>
				{/* <Table
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
				/> */}
			</div>
		</div>
	);
};
