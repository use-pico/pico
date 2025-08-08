import { type ClassName, type ClsClear, tvc } from "@use-pico/cls";
import type {
	CountSchema,
	DeepKeys,
	DeepValue,
	EntitySchema,
	StateType,
	withQuerySchema,
} from "@use-pico/common";
import type { FC, ReactNode } from "react";
import type { Cursor as CoolCursor } from "../cursor/Cursor";
import type { Fulltext as CoolFulltext } from "../fulltext/Fulltext";
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
	export namespace Selection {
		export type State = StateType<string[]>;
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
				data: TData[];
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

	export namespace Row {
		export namespace Cls {
			export interface Props<
				TData extends EntitySchema.Type,
				TContext = any,
			> {
				data: TData;
				context: TContext;
			}

			export type Fn<TData extends EntitySchema.Type, TContext = any> = (
				props: Props<TData, TContext>,
			) => ClassName;
		}

		export namespace DblClick {
			export interface Props<
				TData extends EntitySchema.Type,
				TContext = any,
			> {
				data: TData;
				context: TContext;
			}

			export type Fn<TData extends EntitySchema.Type, TContext = any> = (
				props: Props<TData, TContext>,
			) => void;
		}
	}

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

	export namespace Toolbar {
		export interface Props<
			TQuery extends withQuerySchema.Query,
			TContext = any,
		> {
			context: TContext;
			selection: Selection.State | undefined;
			filter: Filter.State<TQuery> | undefined;
		}

		export type Render<
			TQuery extends withQuerySchema.Query,
			TContext = any,
		> = (props: Props<TQuery, TContext>) => ReactNode;
	}

	export namespace Action {
		export namespace Table {
			export interface Props<
				TData extends EntitySchema.Type,
				TContext = any,
			> {
				data: TData[];
				context: TContext;
			}

			export type Render<
				TData extends EntitySchema.Type,
				TContext = any,
			> = (props: Props<TData, TContext>) => ReactNode;
		}

		export namespace Row {
			export interface Props<
				TData extends EntitySchema.Type,
				TContext = any,
			> {
				data: TData;
				context: TContext;
			}

			export type Render<
				TData extends EntitySchema.Type,
				TContext = any,
			> = (props: Props<TData, TContext>) => ReactNode;
		}
	}

	export type Controls = "toolbar" | "actions";

	export namespace ActionWidth {
		export interface Props {
			controlsHidden: Controls[];
		}

		export type Fn = (props: Props) => string;
	}

	export interface Props<
		TQuery extends withQuerySchema.Query,
		TData extends EntitySchema.Type,
		TContext = any,
	> extends TableCls.Props<ClsClear<AbstractList.PropsEx<TQuery, TData>>> {
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
		fulltext?: CoolFulltext.State;
		cursor?: CoolCursor.State;
		/**
		 * Query used to fetch count of items.
		 */
		withCountQuery?: withQuery.Api<TQuery, CountSchema.Type>;
		/**
		 * Selection configuration.
		 */
		selection?: Selection.State;
		selectionMode?: "single" | "multi";
		filter?: Filter.State<TQuery>;
		sort?: Sort.State<TQuery>;
		/**
		 * If not preferred auto, this can be used to set width of table actions explicitly.
		 *
		 * Used only when there are any actions (e.g. selection or user-land actions).
		 */
		actionWidth?: ActionWidth.Fn;
		/**
		 * Context for the table.
		 */
		context: TContext;
		/**
		 * Controls to hide.
		 */
		controlsHidden?: Controls[];
		/**
		 * Row-wise class if you need something special.
		 */
		rowCls?: Row.Cls.Fn<TData, TContext>;
		rowDblClick?: Row.DblClick.Fn<TData, TContext>;
		/** Toolbar, displayed next to the fulltext.
		 *
		 * Good UI may be just icons to be used.
		 */
		toolbar?: Toolbar.Render<TQuery, TContext>;
		/**
		 * Table-wise action.
		 */
		actionTable?: Action.Table.Render<TData, TContext>;
		/**
		 * Row-wise action.
		 */
		actionRow?: Action.Row.Render<TData, TContext>;
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
	withCountQuery,
	context,
	selection,
	selectionMode = "multi",
	filter,
	sort,
	actionWidth,
	actionTable,
	actionRow,
	toolbar,
	controlsHidden = [],
	rowCls,
	rowDblClick,
	variant,
	tva = TableCls,
	cls,
	...props
}: Table.Props<TQuery, TData, TContext>) => {
	const { slots } = tva.create(cls, {
		variant,
	});

	const visibleColumns = useVisibleColumns<TQuery, TData>({
		columns,
		visible,
		hidden,
		order,
	});

	const grid = useGrid({
		visible: visibleColumns,
		actionWidth: actionWidth?.({
			controlsHidden,
		}),
		selection,
		actionTable,
		actionRow,
	});

	return (
		<AbstractList
			tva={tva}
			renderPrefix={(render) => (
				<TablePrefix<TQuery, TContext>
					withCountQuery={withCountQuery}
					query={props.query}
					cursor={cursor}
					fulltext={fulltext}
					toolbar={toolbar}
					controlsHidden={controlsHidden}
					selection={selection}
					filter={filter}
					context={context}
					{...render}
				/>
			)}
			renderHeader={({ items, ...render }) => (
				<TableHeader<TQuery, TData, TContext>
					data={items}
					grid={grid}
					context={context}
					slots={slots}
					visible={visibleColumns}
					selection={selection}
					selectionMode={selectionMode}
					filter={filter}
					sort={sort}
					actionTable={actionTable}
					controlsHidden={controlsHidden}
					{...render}
				/>
			)}
			renderItem={(render) => (
				<Row<TQuery, TData, TContext>
					key={render.item.id}
					visibleColumns={visibleColumns}
					selection={selection}
					selectionMode={selectionMode}
					filter={filter}
					context={context}
					grid={grid}
					slots={slots}
					actionRow={actionRow}
					controlsHidden={controlsHidden}
					rowCls={rowCls}
					rowDblClick={rowDblClick}
					{...render}
				/>
			)}
			renderPostfix={() => {
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
						{cursor && withCountQuery ? (
							<TableCursor
								withCountQuery={withCountQuery}
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
};
