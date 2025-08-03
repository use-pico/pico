import { type DeepKeys, type EntitySchema, pathOf } from "@use-pico/common";
import type { Table } from "../Table";
import type { FilterType } from "../type/FilterType";

export namespace wrapFilter {
	export interface Props<
		TData extends EntitySchema.Type,
		TKey extends DeepKeys<TData>,
		TContext = any,
	> {
		props?: FilterType.Table;
		columns: Table.Column.Props<TData, TKey, TContext>[];
	}
}

export const wrapFilter = <
	TData extends EntitySchema.Type,
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
			return columns.some((_column) => {
				// column.filter?.is({
				// 	filter: this,
				// }),
			});
		},
		reset() {
			columns.forEach((_column) => {
				// column.filter?.reset({
				// 	filter: this,
				// }),
			});
		},
		shallow({ path, value }) {
			pathOfFilter.set(path, value);
			props.set({
				...$filter,
			});
		},
	};
};
