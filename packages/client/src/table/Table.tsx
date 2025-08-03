import type {
	CountSchema,
	cls,
	DeepKeys,
	DeepValue,
	EntitySchema,
	StateType,
} from "@use-pico/common";
import type { FC } from "react";
import type { Cursor as CoolCursor } from "../cursor/Cursor";
import type { Fulltext as CoolFulltext } from "../fulltext/Fulltext";
import { useCls } from "../hooks/useCls";
import { AbstractList } from "../list/AbstractList";
import { slot } from "../slot/Slot";
import type { withQuery } from "../source/withQuery";
import { useGrid } from "./hook/useGrid";
import { useVisibleColumns } from "./hook/useVisibleColumns";
import { Row } from "./Row";
import { TableCls } from "./TableCls";
import { TableHeader } from "./TableHeader";
import { TablePrefix } from "./TablePrefix";

export namespace Table {
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
			TData extends EntitySchema.Type,
			TKey extends DeepKeys<TData>,
			TContext = any,
		> {
			name: TKey;
			header: Header.Component<TData, TContext>;
			render: Render.Component<TData, TKey, TContext>;
			size: Size;
		}
	}

	export namespace Cell {
		//
	}

	export interface Cell<
		TData extends EntitySchema.Type,
		TKey extends DeepKeys<TData>,
		TContext = any,
	> {
		column: Column.Props<TData, TKey, TContext>;
		data: TData;
		value: DeepValue<TData, TKey>;
		context: TContext;
	}

	export namespace Row {}

	export interface Row<TData extends EntitySchema.Type, TContext = any> {
		id: string;
		data: TData;
		cells: Cell<TData, any, TContext>[];
		context: TContext;
	}

	export namespace Fulltext {
		export type Props = StateType<CoolFulltext.Value>;
	}

	export namespace Cursor {
		export interface Props<TRequest extends AbstractList.Request>
			extends Omit<CoolCursor.Props, "count" | "cursor"> {
			/**
			 * Query used to fetch count of items.
			 */
			withCountQuery: withQuery.Api<TRequest, CountSchema.Type>;
		}
	}

	export interface Props<
		TRequest extends AbstractList.Request,
		TData extends EntitySchema.Type,
		TContext = any,
	> extends TableCls.Props<cls.Clear<AbstractList.PropsEx<TRequest, TData>>> {
		/**
		 * All the columns defined in the table.
		 *
		 * Columns _must_ be a stable reference or Strange Things may happen and you'll
		 * have nightmare during night and day.
		 */
		columns: Column.Props<TData, any, TContext>[];
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
		// /**
		//  * Selection configuration.
		//  */
		// selection?: SelectionType.Table;
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
		/**
		 * Configure fulltext search
		 */
		fulltext?: Fulltext.Props;
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
		cursor?: Cursor.Props<TRequest>;
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
		TRequest extends AbstractList.Request,
		TData extends EntitySchema.Type,
		TContext = any,
	> = Omit<
		Props<TRequest, TData, TContext>,
		"columns" | "withQuery" | "withCountQuery" | "context"
	>;
}

export const Table = <
	TRequest extends AbstractList.Request,
	TData extends EntitySchema.Type,
	TContext = any,
>({
	columns,
	visible,
	hidden = [],
	order = [],
	context,
	// selection,
	// row: rowProps,
	// filter,
	// sort,
	// controlsHidden = [],
	// actionTable,
	// actionRow,
	fulltext,
	cursor,
	// toolbar = () => null,
	variant,
	tva = TableCls,
	cls,
	...props
}: Table.Props<TRequest, TData, TContext>) => {
	// const withActions = Boolean(
	// 	(actionTable && !controlsHidden.includes("action-table")) ||
	// 		(actionRow && !controlsHidden.includes("action-row")) ||
	// 		selection,
	// );

	const { slots } = useCls(tva, variant, cls);

	const visibleColumns = useVisibleColumns<TData>({
		columns,
		visible,
		hidden,
		order,
	});

	const grid = useGrid({
		visible: visibleColumns,
	});

	return (
		<AbstractList
			cls={{
				root: slots.root(),
			}}
			prefixSlot={slot(TablePrefix<TRequest, TContext>, {
				context,
				request: props.request,
				fulltext,
				cursor,
			})}
			headerSlot={slot<
				TableHeader.Component<TData, TContext>,
				AbstractList.Header.Props<TData>
			>(TableHeader, {
				grid,
				context,
				slots,
				visible: visibleColumns,
			})}
			itemSlot={slot<
				Row.Component<TData, TContext>,
				AbstractList.Item.Props<TData>
			>(Row, {
				visibleColumns,
				context,
				grid,
				slots,
			})}
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
