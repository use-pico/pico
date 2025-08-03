import { type EntitySchema, tvc, type withQuerySchema } from "@use-pico/common";
import type { FC } from "react";
import { match, P } from "ts-pattern";
import { Icon } from "../icon/Icon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import { Cell } from "./Cell";
import { useRow } from "./hook/useRow";
import type { Table } from "./Table";
import type { TableCls } from "./TableCls";

export namespace Row {
	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> {
		item: TData;
		visibleColumns: Table.Column.Props<TQuery, TData, any, TContext>[];
		selection: Table.Selection.Props | undefined;
		filter: Table.Filter.State<TQuery> | undefined;
		// props: Table.Row<TData> | undefined;
		// withActions: boolean;

		/**
		 * Row-wise action.
		 */
		// actionRow: ActionType.Row.Table<TData, TContext> | undefined;
		// controlsHidden: Table.Controls[];
		context: TContext;
		grid: string;
		slots: TableCls.Slots;
		onDoubleClick?(props: { data: TData; context: TContext }): void;
	}

	export type Component<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> = FC<Props<TQuery, TData, TContext>>;
}

export const Row = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	item,
	visibleColumns,
	selection,
	filter,
	// props,
	// withActions,
	// actionRow,
	// controlsHidden,
	context,
	grid,
	slots,
	onDoubleClick,
}: Row.Props<TQuery, TData, TContext>) => {
	// const { action: RowAction } = actionRow ?? {
	// 	RowAction: undefined,
	// };

	const row = useRow<TQuery, TData, TContext>({
		data: item,
		visible: visibleColumns,
		context,
	});

	const onSelect = () => {
		match(selection)
			.with(
				{
					type: "single",
				},
				({ state: { value, set } }) => {
					const selected = value.includes(item.id);
					set(
						selected
							? []
							: [
									item.id,
								],
					);
					selected
						? set(value.filter((id) => id !== item.id))
						: set([
								...value,
								item.id,
							]);
				},
			)
			.with(
				{
					type: "multi",
				},
				({ state: { value, set } }) => {
					const selected = value.includes(item.id);
					set(
						selected
							? value.filter((id) => id !== item.id)
							: [
									...value,
									item.id,
								],
					);
				},
			)
			.with(P.nullish, () => {
				//
			})
			.exhaustive();
	};

	return (
		<div
			className={slots.row(
				{
					selected: selection?.state.value.includes(item.id),
				},
				// props?.css?.(row),
			)}
			style={{
				gridTemplateColumns: grid,
			}}
			onDoubleClick={() => {
				if (onDoubleClick) {
					return onDoubleClick({
						data: row.data,
						context,
					});
				}

				onSelect();
			}}
		>
			<div
				className={tvc([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-2",
				])}
			>
				{selection ? (
					<Icon
						icon={
							selection.state.value.includes(item.id)
								? SelectionOnIcon
								: SelectionOffIcon
						}
						cls={{
							base: slots.select({
								selected: selection.state.value.includes(
									item.id,
								),
							}),
						}}
						variant={{
							size: "2xl",
						}}
						onClick={onSelect}
					/>
				) : null}
				{/* {RowAction && !controlsHidden.includes("action-row") ? (
						<RowAction
							data={row.data}
							context={context}
						/>
					) : null} */}
			</div>

			{row.cells.map((cell) => {
				return (
					<Cell
						key={`${item.id}-${cell.column.name}`}
						cell={cell}
						slots={slots}
						filter={filter}
					/>
				);
			})}
		</div>
	);
};
