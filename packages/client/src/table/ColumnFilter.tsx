import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Icon } from "../icon/Icon";
import type { Table } from "./Table";

export namespace ColumnFilter {
	export interface Props<TFilter> {
		filter: Table.Filter.State<TFilter> | undefined;
		column: Table.Column.Props<any, any, any>;
	}
}

export const ColumnFilter = <TFilter,>({
	filter,
	column,
}: ColumnFilter.Props<TFilter>) => {
	if (
		!filter ||
		!column.filter?.is({
			state: filter,
		})
	) {
		return null;
	}

	return (
		<Icon
			icon={FilterRemoveIcon}
			variant={{
				size: "md",
			}}
			cls={{
				base: [
					"opacity-50",
					"hover:opacity-100",
					"cursor-pointer",
				],
			}}
			onClick={() => {
				column.filter?.reset({
					state: filter,
				});
			}}
		/>
	);
};
