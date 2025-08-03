import {
	type CountSchema,
	type cls,
	type DeepKeys,
	type DeepValue,
	type EntitySchema,
	type StateType,
	tvc,
	type withQuerySchema,
} from "@use-pico/common";
import type { FC } from "react";
import type { Cursor as CoolCursor } from "../cursor/Cursor";
import type { Fulltext as CoolFulltext } from "../fulltext/Fulltext";
import { useCls } from "../hooks/useCls";
import { AbstractList } from "../list/AbstractList";
import type { withQuery } from "../source/withQuery";
import { useGrid } from "./hook/useGrid";
import { useVisibleColumns } from "./hook/useVisibleColumns";
import { Row } from "./Row";
import { TableCls } from "./TableCls";
import { TableCursor } from "./TableCursor";
import { TableHeader } from "./TableHeader";
import { TablePrefix } from "./TablePrefix";

export namespace Table {
	export namespace Fulltext {
		export type Props = CoolFulltext.State;
	}

	export namespace Cursor {
		export interface Props<TQuery extends withQuerySchema.Query> {
			/**
			 * Query used to fetch count of items.
			 */
			withCountQuery: withQuery.Api<TQuery, CountSchema.Type>;
			state: CoolCursor.State;
		}
	}

	export namespace Selection {
		export type State = StateType<string[]>;

		export interface Props {
			type: "single" | "multi";
			state: State;
		}
	}

	export namespace Filter {
		export type State<TQuery extends withQuerySchema.Query> = StateType<
			TQuery["filter"]
		>;

		export namespace is {
			export interface Props<TQuery extends withQuerySchema.Query> {
				state: State<TQuery>;
			}

			export type Fn<TQuery extends withQuerySchema.Query> = (
				props: Props<TQuery>,
			) => boolean;
		}

		export namespace reset {
			export interface Props<TQuery extends withQuerySchema.Query> {
				state: State<TQuery>;
			}

			export type Fn<TQuery extends withQuerySchema.Query> = (
				props: Props<TQuery>,
			) => void;
		}

		export namespace component {
			export interface Props<
				TData,
				TQuery extends withQuerySchema.Query,
			> {
				data: TData;
				is: is.Fn<TQuery>;
				reset: reset.Fn<TQuery>;
				state: State<TQuery>;
			}

			export type Component<
				TData,
				TQuery extends withQuerySchema.Query,
			> = FC<Props<TData, TQuery>>;
		}

		export interface Props<TData, TQuery extends withQuerySchema.Query> {
			/**
			 * Checks if the filter is enabled for this setup (usually on a value/cell).
			 */
			is: is.Fn<TQuery>;
			/**
			 * A cell should know how to reset it's own value while preserving the others.
			 */
			reset: reset.Fn<TQuery>;
			/**
			 * Render filter controls inline
			 */
			component: component.Component<TData, TQuery>;
		}
	}

	export namespace Sort {
		export type State<TQuery extends withQuerySchema.Query> = StateType<
			TQuery["sort"]
		>;

		export interface Props<TQuery extends withQuerySchema.Query> {
			value: withQuerySchema.SortKeys<TQuery>;
			exclusive?: boolean;
		}
	}

	export namespace Column {
		export type Size = number | "auto";

		export namespace Header {
			export interface Props<
				TData extends EntitySchema.Type,
				TContext = any,
			> {
				items: TData[];
				context: TContext;
			}

			export type Component<
				TData extends EntitySchema.Type,
				TContext = any,
			> = FC<Header.Props<TData, TContext>>;
		}

		export namespace Render {
			export interface Props<
				TData extends EntitySchema.Type,
				TKey extends DeepKeys<TData>,
				TContext = any,
			> {
				/**
				 * Table row data.
				 */
				data: TData;
				/**
				 * Current value of the column, picked up from data by column's name.
				 */
				value: DeepValue<TData, TKey>;
				context: TContext;
			}

			export type Component<
				TData extends EntitySchema.Type,
				TKey extends DeepKeys<TData>,
				TContext = any,
			> = FC<Render.Props<TData, TKey, TContext>>;
		}

		/**
		 * Input props - definition on user-side
		 */
		export interface Props<
			TQuery extends withQuerySchema.Query,
			TData extends EntitySchema.Type,
			TKey extends DeepKeys<TData>,
			TContext = any,
		> {
			name: TKey;
			header: Header.Component<TData, TContext>;
			render: Render.Component<TData, TKey, TContext>;
			filter?: Filter.Props<TData, TQuery>;
			sort?: Sort.Props<TQuery>;
			size: Size;
		}
	}

	export namespace Cell {
		//
	}

	export interface Cell<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TKey extends DeepKeys<TData>,
		TContext = any,
	> {
		column: Column.Props<TQuery, TData, TKey, TContext>;
		data: TData;
		value: DeepValue<TData, TKey>;
		context: TContext;
	}

	export namespace Row {}

	export interface Row<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> {
		id: string;
		data: TData;
		cells: Cell<TQuery, TData, any, TContext>[];
		context: TContext;
	}

	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> extends TableCls.Props<cls.Clear<AbstractList.PropsEx<TQuery, TData>>> {
		/**
		 * All the columns defined in the table.
		 *
		 * Columns _must_ be a stable reference or Strange Things may happen and you'll
		 * have nightmare during night and day.
		 */
		columns: Column.Props<TQuery, TData, any, TContext>[];
		/**
		 * Only visible columns in the table.
		 *
		 * Consider this value being "default", so it won't change until the table is re-mounted.
		 */
		visible?: DeepKeys<TData>[];
		/**
		 * Hidden columns in the table.
		 *
		 * Hidden columns, they're not exclusive with visible columns.
		 *
		 * Consider this value being "default", so it won't change until the table is re-mounted.
		 */
		hidden?: DeepKeys<TData>[];
		/**
		 * Order of columns displayed in the table.
		 *
		 * Consider this value being "default", so it won't change until the table is re-mounted.
		 */
		order?: DeepKeys<TData>[];
		/**
		 * Configure fulltext search
		 */
		fulltext?: Fulltext.Props;
		cursor?: Cursor.Props<TQuery>;
		/**
		 * Selection configuration.
		 */
		selection?: Selection.Props;
		filter?: Filter.State<TQuery>;
		sort?: Sort.State<TQuery>;
		/**
		 * If not preferred auto, this can be used to set width of table actions explicitly.
		 *
		 * Used only when there are any actions (e.g. selection or user-land actions).
		 */
		actionWidth?: string;
		// /**
		//  * Filter configuration.
		//  */
		// filter?: FilterType.Table;
		// /**
		//  * Sort configuration.
		//  */
		// sort?: SortType.Table;
		/**
		 * Context for the table.
		 */
		context: TContext;
		// /**
		//  * Row configuration.
		//  */
		// row?: RowType.Props<TData>;
		// /**
		//  * Controls to hide.
		//  */
		// controlsHidden?: Controls[];
		// /**
		//  * Toolbar, displayed next to the fulltext.
		//  *
		//  * Good UI may be just icons to be used.
		//  */
		// toolbar?: ToolbarType.Component<TData, TContext>;
		// empty?: FC;
		// /**
		//  * Table-wise action.
		//  */
		// actionTable?: ActionType.Table.Table<TData, TContext>;
		// /**
		//  * Row-wise action.
		//  */
		// actionRow?: ActionType.Row.Table<TData, TContext>;
	}

	export type PropsEx<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> = Omit<
		Props<TQuery, TData, TContext>,
		"columns" | "withQuery" | "withCountQuery" | "context"
	>;
}

export const Table = <
	TQuery extends withQuerySchema.Query,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	columns,
	visible,
	hidden = [],
	order = [],
	fulltext,
	cursor,
	context,
	selection,
	filter,
	sort,
	actionWidth,
	// row: rowProps,
	// controlsHidden = [],
	// actionTable,
	// actionRow,
	// toolbar = () => null,
	variant,
	tva = TableCls,
	cls,
	...props
}: Table.Props<TQuery, TData, TContext>) => {
	// const withActions = Boolean(
	// 	(actionTable && !controlsHidden.includes("action-table")) ||
	// 		(actionRow && !controlsHidden.includes("action-row")) ||
	// 		selection,
	// );

	const { slots } = useCls(tva, variant, cls);

	const visibleColumns = useVisibleColumns<TQuery, TData>({
		columns,
		visible,
		hidden,
		order,
	});

	const grid = useGrid({
		visible: visibleColumns,
		actionWidth,
		selection,
	});

	return (
		<AbstractList
			cls={{
				root: slots.root(),
			}}
			renderPrefix={(render) => (
				<TablePrefix<TQuery, TContext>
					query={props.query}
					cursor={cursor}
					fulltext={fulltext}
					context={context}
					{...render}
				/>
			)}
			renderHeader={(render) => (
				<TableHeader<TQuery, TData, TContext>
					grid={grid}
					context={context}
					slots={slots}
					visible={visibleColumns}
					selection={selection}
					filter={filter}
					sort={sort}
					{...render}
				/>
			)}
			renderItem={(render) => (
				<Row<TQuery, TData, TContext>
					key={render.item.id}
					visibleColumns={visibleColumns}
					selection={selection}
					filter={filter}
					context={context}
					grid={grid}
					slots={slots}
					{...render}
				/>
			)}
			renderFooter={() => {
				return (
					<div
						className={tvc(
							"flex",
							"flex-row",
							"items-center",
							"justify-end",
							"gap-2",
						)}
					>
						<div />
						{cursor ? (
							<TableCursor
								cursor={cursor}
								query={props.query}
							/>
						) : (
							<div />
						)}
					</div>
				);
			}}
			{...props}
		/>
	);

	// return (
	// 	<div className={slots.base()}>
	// 		<TableTools
	// 			data={data}
	// 			cursor={cursor}
	// 			fulltext={fulltext}
	// 			toolbar={toolbar}
	// 			controlsHidden={controlsHidden}
	// 			context={context}
	// 			selection={$selection}
	// 			filter={$filter}
	// 		/>

	// 		<div className={"overflow-x-auto"}>
	// 			<div className={slots.table()}>
	// 				<TableHeader
	// 					data={data}
	// 					withActions={withActions}
	// 					visible={$visible}
	// 					context={context}
	// 					selection={$selection}
	// 					sort={$sort}
	// 					filter={$filter}
	// 					actionTable={actionTable}
	// 					controlsHidden={controlsHidden}
	// 					slots={slots}
	// 					grid={grid}
	// 					loading={isFetching}
	// 				/>

	// 				{$rows.map((row) => (
	// 					<Row<TData>
	// 						props={rowProps}
	// 						withActions={withActions}
	// 						key={row.id}
	// 						row={row}
	// 						actionRow={actionRow}
	// 						controlsHidden={controlsHidden}
	// 						context={context}
	// 						filter={$filter}
	// 						selection={$selection}
	// 						grid={grid}
	// 						slots={slots}
	// 					/>
	// 				))}
	// 			</div>
	// 		</div>

	// 		{data.length === 0 ? <Empty /> : null}
	// 		<div className={"flex flex-row items-center justify-end gap-2"}>
	// 			<div />
	// 			{cursor ? <Cursor {...cursor} /> : null}
	// 		</div>
	// 	</div>
	// );
};
