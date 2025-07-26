import { ColumnFilter } from "./ColumnFilter";
import { ColumnSort } from "./ColumnSort";
import { TableActionWrapper } from "./TableActionWrapper";
import type { TableCls } from "./TableCls";
import type { ActionType } from "./type/ActionType";
import type { ColumnType } from "./type/ColumnType";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";
import type { SelectionType } from "./type/SelectionType";
import type { SortType } from "./type/SortType";

export namespace TableHeader {
	export interface Props<TData extends DataType.Data, TContext = any> {
		data: TData[];
		withActions: boolean;
		context: TContext | undefined;
		selection: SelectionType.Selection | undefined;
		sort: SortType.Sort | undefined;
		filter: FilterType.Filter | undefined;
		actionTable: ActionType.Table.Component<TData, TContext> | undefined;
		visible: ColumnType.Props<TData, any, TContext>[];
		slots: TableCls.Slots;
		grid: string;
	}
}

export const TableHeader = <TData extends DataType.Data, TContext = any>({
	data,
	withActions,
	context,
	selection,
	sort,
	filter,
	actionTable,
	visible,
	slots,
	grid,
}: TableHeader.Props<TData, TContext>) => {
	return (
		<div
			className={slots.thead()}
			style={{
				gridTemplateColumns: grid,
			}}
		>
			{withActions ? (
				<TableActionWrapper
					data={data}
					actionTable={actionTable}
					context={context}
					selection={selection}
					slots={slots}
				/>
			) : null}

			{visible.map((column) => {
				const Header = column.header || (() => null);
				const withSortOrFilter =
					(sort && column.sort) ||
					(filter &&
						column.filter?.is({
							filter,
						}));

				return (
					<div
						key={`header-${column.name}`}
						className={slots.th()}
					>
						{withSortOrFilter ? (
							<div className={"flex flex-row items-center gap-2"}>
								<ColumnSort
									column={column}
									sort={sort}
								/>
								<ColumnFilter
									column={column}
									filter={filter}
								/>
							</div>
						) : null}
						<Header />
					</div>
				);
			})}
		</div>
	);
};
