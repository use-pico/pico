import { tvc } from "@use-pico/cls";
import type { EntitySchema, withQuerySchema } from "@use-pico/common";
import type { FC } from "react";
import { Action } from "../action/Action";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Icon } from "../icon/Icon";
import { SelectionAnyIcon } from "../icon/SelectionAnyIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import type { useSelection } from "../selection/useSelection";
import { ColumnSort } from "./ColumnSort";
import type { Table } from "./Table";
import type { TableCls } from "./TableCls";

export namespace TableHeader {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> {
		data: TData[];
		visible: Table.Column.Props<TQuery, TData, any, TContext>[];
		grid: string;
		slots: TableCls.Slots;
		isFetching: boolean;
		context: TContext;
		filter: Table.Filter.State<TQuery> | undefined;
		selection: useSelection.Selection<TData> | undefined;
		sort: Table.Sort.State<TQuery> | undefined;
		actionTable: Table.Action.Table.RenderFn<TData, TContext> | undefined;
		controlsHidden: Table.Controls[];
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
	data,
	context,
	visible,
	slots,
	grid,
	filter,
	selection,
	sort,
	isFetching,
	actionTable,
	controlsHidden,
}: TableHeader.Props<TQuery, TData, TContext>) => {
	const isAll = selection?.every(data);
	const isAny = selection?.some(data);

	const onSelectAll = () => {
		if (isAll) {
			selection?.set(
				selection.selection.filter(
					({ id }) => !data.some((item) => item.id === id),
				),
			);

			return;
		}

		selection?.set(selection.selection.concat(data));
	};

	return (
		<>
			<div
				data-ui="Table-header-loading"
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
				data-ui="Table-header"
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
							disabled={selection.mode === "single"}
							size="sm"
							tweak={{
								slot: {
									root: {
										class: slots.select({
											variant: {
												selected: isAny,
											},
										}),
									},
								},
							}}
							onClick={onSelectAll}
						/>
					) : null}
					{controlsHidden.includes("actions")
						? null
						: actionTable?.({
								data,
								context,
							})}
				</div>

				{visible.map((column) => {
					const Header = column.header;
					const isFilter =
						filter &&
						column.filter?.is({
							state: filter,
						});

					return (
						<div
							key={`header-${column.name}`}
							data-ui="Table-headerCell"
							className={slots.headerCell()}
						>
							<Header
								data={data}
								context={context}
							/>

							<div className={"flex flex-row items-center gap-2"}>
								{sort && column.sort ? (
									<ColumnSort
										state={sort}
										sort={column.sort}
									/>
								) : null}

								{isFilter ? (
									<Action
										iconEnabled={FilterRemoveIcon}
										tweak={{
											variant: {
												tone: "primary",
												theme: "light",
											},
										}}
										size={"xs"}
										onClick={() => {
											column.filter?.reset({
												state: filter,
											});
										}}
									/>
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
