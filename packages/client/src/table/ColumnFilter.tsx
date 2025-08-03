import type { FC } from "react";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Icon } from "../icon/Icon";
import type { Table } from "./Table";
import type { FilterType } from "./type/FilterType";

export namespace ColumnFilter {
	export interface Props {
		filter: FilterType.Filter | undefined;
		column: Table.Column.Props<any, any, any>;
	}
}

export const ColumnFilter: FC<ColumnFilter.Props> = ({ filter, column }) => {
	// if (
	// 	!filter ||
	// 	!column.filter?.is({
	// 		filter,
	// 	})
	// ) {
	// 	return null;
	// }

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
				// column.filter?.reset({
				// 	filter,
				// });
			}}
		/>
	);
};
