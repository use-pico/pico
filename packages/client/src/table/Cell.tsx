import { FilterApplyIcon } from "../icon/FilterApplyIcon";
import { Icon } from "../icon/Icon";
import { TableCss } from "./TableCss";
import type { CellType } from "./type/CellType";
import type { DataType } from "./type/DataType";
import type { UseTable } from "./type/UseTable";

export namespace Cell {
	export interface Props<TData extends DataType.Data> extends TableCss.Props {
		table: UseTable<TData>;
		cell: CellType.Cell<TData, any>;
	}
}

export const Cell = <TData extends DataType.Data>({
	table,
	cell: { column, data, value },
	variant,
	tva = TableCss,
	css,
}: Cell.Props<TData>) => {
	const Render = column.def.render;
	const tv = tva({ ...variant, css }).slots;

	return (
		<td className={tv.td()}>
			<div className={"group flex flex-row items-center gap-2 justify-between"}>
				<Render
					table={table}
					data={data}
					value={value}
				/>
				{column.filter && !column.filter.is() ?
					<Icon
						icon={FilterApplyIcon}
						css={{
							base: [
								"group-hover:visible",
								"invisible",
								"opacity-50 hover:opacity-100",
								"cursor-pointer",
							],
						}}
						variant={{ size: "xl" }}
						onClick={() => {
							if (column.filter) {
								column.def.filter?.onFilter({
									data,
									filter: column.filter,
								});
								window.scrollTo({
									top: 0,
									behavior: "smooth",
								});
							}
						}}
					/>
				:	null}
			</div>
		</td>
	);
};
