import { type EntitySchema, tvc } from "@use-pico/common";
import type { FC } from "react";
import type { Table } from "./Table";
import type { TableCls } from "./TableCls";

export namespace TableHeader {
	export interface Props<TData extends EntitySchema.Type, TContext = any> {
		items: TData[];
		visible: Table.Column.Props<TData, any, TContext>[];
		grid: string;
		// withActions: boolean;
		slots: TableCls.Slots;
		isFetching: boolean;
		context: TContext;
		// selection: SelectionType.Selection | undefined;
		// sort: SortType.Sort | undefined;
		// filter: FilterType.Filter | undefined;
		// actionTable: ActionType.Table.Table<TData, TContext> | undefined;
		// controlsHidden: Table.Controls[];
	}

	export type Component<TData extends EntitySchema.Type, TContext = any> = FC<
		Props<TData, TContext>
	>;
}

export const TableHeader = <TData extends EntitySchema.Type, TContext = any>({
	items,
	// withActions,
	context,
	visible,
	slots,
	grid,
	isFetching,
	// selection,
	// sort,
	// filter,
	// actionTable,
	// controlsHidden,
	// visible,
}: TableHeader.Props<TData, TContext>) => {
	return (
		<>
			<div
				className={tvc(
					[
						"absolute",
						"h-0.5",
						"w-full",
					],
					isFetching
						? [
								"bg-blue-300",
								"animate-pulse",
							]
						: undefined,
				)}
			/>
			<div
				className={slots.header()}
				style={{
					gridTemplateColumns: grid,
				}}
			>
				{/* {withActions && !controlsHidden.includes("action-table") ? (
					<TableActionWrapper
						data={data}
						actionTable={actionTable}
						context={context}
						selection={selection}
						slots={slots}
					/>
				) : null} */}

				{visible.map((column) => {
					const Header = column.header;
					// const withSortOrFilter =
					// 	(sort && column.sort) ||
					// 	(filter &&
					// 		column.filter?.is({
					// 			filter,
					// 		}));

					return (
						<div
							key={`header-${column.name}`}
							className={slots.headerCell()}
						>
							{/* {withSortOrFilter ? (
								<div
									className={
										"flex flex-row items-center gap-2"
									}
								>
									<ColumnSort
										column={column}
										sort={sort}
									/>
									<ColumnFilter
										column={column}
										filter={filter}
									/>
								</div>
							) : null} */}
							<Header
								items={items}
								context={context}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};
