import { tvc } from "@use-pico/cls";
import type { EntitySchema, withQuerySchema } from "@use-pico/common";
import type { FC } from "react";
import { Action } from "../action/Action";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { Icon } from "../icon/Icon";
import { SelectionAnyIcon } from "../icon/SelectionAnyIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
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
		selection: Table.Selection.State | undefined;
		selectionMode: "single" | "multi";
		sort: Table.Sort.State<TQuery> | undefined;
		actionTable: Table.Action.Table.Render<TData, TContext> | undefined;
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
	selectionMode,
	sort,
	isFetching,
	actionTable,
	controlsHidden,
}: TableHeader.Props<TQuery, TData, TContext>) => {
	const isAll = data.every((data) => selection?.value.includes(data.id));
	const isAny = data.some((data) => selection?.value.includes(data.id));

	const onSelectAll = () => {
		if (isAll) {
			selection?.set(
				selection.value.filter(
					(id) => !data.some((item) => item.id === id),
				),
			);
		} else {
			selection?.set(selection.value.concat(data.map(({ id }) => id)));
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
							cls={({ what }) => ({
								variant: what.variant({
									disabled: selectionMode === "single",
									size: "md",
								}),
								slot: what.slot({
									root: what.css(
										slots.select(({ what }) => ({
											variant: what.variant({
												selected: isAny,
											}),
										})),
									),
								}),
							})}
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
										cls={({ what }) => ({
											variant: what.variant({
												tone: "neutral",
												theme: "light",
											}),
										})}
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
