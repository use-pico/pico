import { type EntitySchema, tvc, type withQuerySchema } from "@use-pico/common";
import type { FC } from "react";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Icon } from "../icon/Icon";
import { SelectionAnyIcon } from "../icon/SelectionAnyIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import type { Table } from "./Table";
import type { TableCls } from "./TableCls";

export namespace TableHeader {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> {
		items: TData[];
		visible: Table.Column.Props<TQuery, TData, any, TContext>[];
		grid: string;
		// withActions: boolean;
		slots: TableCls.Slots;
		isFetching: boolean;
		context: TContext;
		selection: Table.Selection.Props | undefined;
		// sort: SortType.Sort | undefined;
		filter: Table.Filter.State<TQuery["filter"]> | undefined;
		// actionTable: ActionType.Table.Table<TData, TContext> | undefined;
		// controlsHidden: Table.Controls[];
	}

	export type Component<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> = FC<Props<TQuery, TData, TContext>>;
}

export const TableHeader = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	items,
	// withActions,
	context,
	visible,
	slots,
	grid,
	selection,
	isFetching,
	// sort,
	filter,
	// actionTable,
	// controlsHidden,
	// visible,
}: TableHeader.Props<TQuery, TData, TContext>) => {
	const isAll = items.every((data) =>
		selection?.state.value.includes(data.id),
	);
	const isAny = items.some((data) =>
		selection?.state.value.includes(data.id),
	);

	const onSelectAll = () => {
		if (items.every((data) => selection?.state.value.includes(data.id))) {
			selection?.state.set([]);
		} else {
			selection?.state.set(items.map(({ id }) => id));
		}
	};

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
				<div
					className={tvc(
						"flex",
						"flex-row",
						"items-center",
						"justify-between",
						"gap-2",
					)}
				>
					{selection ? (
						<Icon
							icon={
								isAll
									? SelectionOnIcon
									: isAny
										? SelectionAnyIcon
										: SelectionOffIcon
							}
							variant={{
								disabled: selection.type === "single",
								size: "2xl",
							}}
							cls={{
								base: slots.select({
									selected: isAny,
								}),
							}}
							onClick={onSelectAll}
						/>
					) : null}
					{/* {TableAction ? (
						<TableAction
							data={data}
							selection={selection}
							context={context}
						/>
					) : null} */}
				</div>

				{visible.map((column) => {
					const Header = column.header;
					const isSortOrFilter =
						// (sort && column.sort) ||
						filter &&
						column.filter?.is({
							state: filter,
						});

					return (
						<div
							key={`header-${column.name}`}
							className={slots.headerCell()}
						>
							<Header
								items={items}
								context={context}
							/>
							{isSortOrFilter ? (
								<div
									className={
										"flex flex-row items-center gap-2"
									}
								>
									{/* <ColumnSort
										column={column}
										sort={sort}
									/> */}

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
								</div>
							) : null}
						</div>
					);
				})}
			</div>
		</>
	);
};
