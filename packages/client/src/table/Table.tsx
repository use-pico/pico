import type { DeepKeys, StateType } from "@use-pico/common";
import type { FC } from "react";
import { Cursor } from "../cursor/Cursor";
import type { Fulltext } from "../fulltext/Fulltext";
import { EmptyResultIcon } from "../icon/EmptyResultIcon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";
import { useTableInit } from "./hook/useTableInit";
import { Row } from "./Row";
import { TableCls } from "./TableCls";
import { TableHeader } from "./TableHeader";
import { TableTools } from "./TableTools";
import type { ActionType } from "./type/ActionType";
import type { ColumnType } from "./type/ColumnType";
import type { DataType } from "./type/DataType";
import type { FilterType } from "./type/FilterType";
import type { RowType } from "./type/RowType";
import type { SelectionType } from "./type/SelectionType";
import type { SortType } from "./type/SortType";
import type { ToolbarType } from "./type/ToolbarType";

export namespace Table {
	/**
	 * === Internal re-exported types
	 */
	export type Data = DataType.Data;

	export namespace Toolbar {
		export type Component<
			TData extends Data,
			TContext = any,
		> = ToolbarType.Component<TData, TContext>;

		export type Props<
			TData extends Data,
			TContext = any,
		> = ToolbarType.Props<TData, TContext>;
	}

	export namespace Action {
		export namespace Table {
			export type Table<
				TData extends Data,
				TContext = any,
			> = ActionType.Table.Component<TData, TContext>;

			export type Props<
				TData extends Data,
				TContext = any,
			> = ActionType.Table.Props<TData, TContext>;
		}

		export namespace Row {
			export type Component<
				TData extends Data,
				TContext = any,
			> = ActionType.Row.Component<TData, TContext>;

			export type Props<
				TData extends Data,
				TContext = any,
			> = ActionType.Row.Props<TData, TContext>;
		}
	}

	/**
	 * === Table own public API and stuff
	 */

	export type Fulltext = StateType<Fulltext.Value>;

	export type Controls = "toolbar" | "action-table" | "action-row";

	export interface Props<TData extends Data, TContext = any>
		extends TableCls.Props {
		/**
		 * Data for the table.
		 */
		data?: TData[];
		/**
		 * All the columns defined in the table.
		 */
		columns: ColumnType.Props<TData, any, TContext>[];
		/**
		 * Only visible columns in the table.
		 */
		visible?: DeepKeys<TData>[];
		/**
		 * Hidden columns in the table.
		 *
		 * Hidden columns, they're not exclusive with visible columns.
		 */
		hidden?: DeepKeys<TData>[];
		/**
		 * Order of columns displayed in the table.
		 */
		order?: DeepKeys<TData>[];
		/**
		 * Selection configuration.
		 */
		selection?: SelectionType.Table;
		/**
		 * Filter configuration.
		 */
		filter?: FilterType.Table;
		/**
		 * Sort configuration.
		 */
		sort?: SortType.Table;
		/**
		 * Context for the table.
		 */
		context?: TContext;
		/**
		 * Row configuration.
		 */
		row?: RowType.Props<TData>;
		/**
		 * Action configuration.
		 */
		fulltext?: Fulltext;
		/**
		 * When table is loading, there is an indicator for it.
		 *
		 * Fetching - any loading state, e.g. during pagination
		 * Loading - initial data loading (when mounted)
		 */
		loading?: "fetching" | "loading";
		/**
		 * Controls to hide.
		 */
		controlsHidden?: Controls[];
		/**
		 * Toolbar, displayed next to the fulltext.
		 *
		 * Good UI may be just icons to be used.
		 */
		toolbar?: ToolbarType.Component<TData, TContext>;
		cursor?: Cursor.Props;
		empty?: FC;
		/**
		 * Table-wise action.
		 */
		actionTable?: ActionType.Table.Component<TData, TContext>;
		/**
		 * Row-wise action.
		 */
		actionRow?: ActionType.Row.Component<TData, TContext>;
		/**
		 * Width of the action column when actions are present.
		 *
		 * This should be set to accommodate the widest possible action content.
		 * Examples: "2rem", "5rem", "8rem", etc.
		 */
		actionWidth?: string;
	}

	export type PropsEx<TData extends Data, TContext = any> = Omit<
		Props<TData, TContext>,
		"columns"
	>;
}

export const Table = <TData extends Table.Data, TContext = any>({
	columns,
	data = [],
	visible,
	hidden = [],
	order = [],
	selection,
	context,
	row: rowProps,
	filter,
	sort,
	controlsHidden = [],
	actionTable,
	actionRow,
	actionWidth,
	fulltext,
	toolbar = () => null,
	cursor,
	loading = undefined,
	empty: Empty = loading === "loading"
		? () => (
				<Status
					icon={LoaderIcon}
					textTitle={<Tx label={"Loading..."} />}
					textMessage={<Tx label={"Please wait..."} />}
				/>
			)
		: () => (
				<Status
					icon={EmptyResultIcon}
					textTitle={<Tx label={"Nothing here"} />}
					textMessage={
						<Tx label={"There is nothing to see right now."} />
					}
				/>
			),
	variant,
	tva = TableCls,
	cls,
}: Table.Props<TData, TContext>) => {
	const withActions = Boolean(
		(actionTable && !controlsHidden.includes("action-table")) ||
			(actionRow && !controlsHidden.includes("action-row")) ||
			selection,
	);

	const {
		slots,
		selection: $selection,
		filter: $filter,
		rows: $rows,
		sort: $sort,
		visible: $visible,
		grid,
		isFetching,
	} = useTableInit<TData, TContext>({
		data,
		columns,
		visible,
		hidden,
		order,
		filter,
		selection,
		sort,
		variant,
		tva,
		cls,
		withActions,
		actionWidth,
		loading,
	});

	return (
		<div className={slots.base()}>
			<TableTools
				data={data}
				cursor={cursor}
				fulltext={fulltext}
				toolbar={toolbar}
				controlsHidden={controlsHidden}
				context={context}
				selection={$selection}
				filter={$filter}
			/>

			<div className={"overflow-x-auto"}>
				<div className={slots.table()}>
					<TableHeader
						data={data}
						withActions={withActions}
						visible={$visible}
						context={context}
						selection={$selection}
						sort={$sort}
						filter={$filter}
						actionTable={actionTable}
						controlsHidden={controlsHidden}
						slots={slots}
						grid={grid}
						loading={isFetching}
					/>

					{$rows.map((row) => (
						<Row<TData>
							props={rowProps}
							withActions={withActions}
							key={row.id}
							row={row}
							actionRow={actionRow}
							controlsHidden={controlsHidden}
							context={context}
							filter={$filter}
							selection={$selection}
							grid={grid}
							slots={slots}
						/>
					))}
				</div>
			</div>

			{data.length === 0 ? <Empty /> : null}
			<div className={"flex flex-row items-center justify-end gap-2"}>
				<div />
				{cursor ? <Cursor {...cursor} /> : null}
			</div>
		</div>
	);
};
