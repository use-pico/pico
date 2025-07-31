import { type DeepKeys, pathOf } from "@use-pico/common";
import type { ColumnType } from "../type/ColumnType";
import type { DataType } from "../type/DataType";
import type { FilterType } from "../type/FilterType";

export namespace wrapFilter {
	export interface Props<
		TData extends DataType.Data,
		TKey extends DeepKeys<TData>,
		TContext = any,
	> {
		props?: FilterType.Table;
		columns: ColumnType.Props<TData, TKey, TContext>[];
	}
}

export const wrapFilter = <
	TData extends DataType.Data,
	TKey extends DeepKeys<TData>,
	TContext = any,
>({
	props,
	columns,
}: wrapFilter.Props<TData, TKey, TContext>): FilterType.Filter | undefined => {
	if (!props) {
		return undefined;
	}

	const $filter = {
		...(props.value || {}),
	};
	const pathOfFilter = pathOf($filter);

	return {
		...props,
		is() {
			return columns.some((column) =>
				column.filter?.is({
					filter: this,
				}),
			);
		},
		reset() {
			columns.forEach((column) =>
				column.filter?.reset({
					filter: this,
				}),
			);
		},
		shallow({ path, value }) {
			pathOfFilter.set(path, value);
			props.set({
				...$filter,
			});
		},
	};
};
