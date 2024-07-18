import { FloatingDelayGroup } from "@floating-ui/react";
import {
	Css,
	WithEntity,
	cssOf,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema,
} from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { type z } from "zod";
import { t } from "../i18n/t";
import { FilterIcon } from "../icon/FilterIcon";
import { Empty } from "../query/Empty";
import { Fulltext } from "../query/Fulltext";
import { type IQueryStore } from "../query/IQueryStore";
import type { IWithSourceQuery } from "../query/IWithSourceQuery";
import { Pagination } from "../query/Pagination";
import { QueryProgress } from "../query/QueryProgress";
import { Refresh } from "../query/Refresh";
import { RemoveFilter } from "../query/RemoveFilter";
import { createSelectionStore } from "../selection/createSelectionStore";
import type { IStore } from "../store/IStore";
import { Action } from "../ui/Action";
import { Modal } from "../ui/Modal";
import { Body } from "./Body";
import { Header } from "./Header";
import { Loader } from "./Loader";

export namespace Table {
	export interface Filter<
		TSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> {
		/**
		 * Check if a filter is applied to a column.
		 */
		isFilter(filter?: QuerySchema.FilterType<TQuerySchema> | null): boolean;

		/**
		 * Apply a filter to a column.
		 */
		filter(props: Filter.FilterProps<TSchema, TQuerySchema>): void;

		/**
		 * Clear a filter from a column.
		 */
		clear(props: Filter.ClearProps<TQuerySchema>): void;
	}

	export interface Compare<
		TSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> {
		/**
		 * Greater than.
		 */
		gte: Filter<TSchema, TQuerySchema>;
		/**
		 * Less than.
		 */
		lte: Filter<TSchema, TQuerySchema>;
	}

	/**
	 * Special filters are separated to display the correct UI for filtered items.
	 */
	export interface Filters<
		TSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> {
		/**
		 * Common equal filter.
		 */
		equal?: Filter<TSchema, TQuerySchema>;
		/**
		 * Comparison filters (greater than, less than).
		 */
		compare?: Compare<TSchema, TQuerySchema>;
	}

	export interface Render<
		TSchema extends WithIdentitySchema,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	> extends Css.Style {
		/**
		 * Column title.
		 */
		title?: ReactNode;
		/**
		 * Render column contents; function is component, thus hooks, and everything else can be used.
		 */
		render: FC<Render.RenderProps<TSchema>>;
		/**
		 * Enable sorting: all columns are sorted by same rules: ascending, descending, none.
		 */
		sort?: QuerySchema.Order<TQuerySchema>;
		/**
		 * Setup a dynamic filters for a column.
		 */
		filters?: Filters<TSchema, TQuerySchema>;
	}

	export namespace Render {
		export interface RenderProps<TSchema extends WithIdentitySchema>
			extends WithEntity.Schema<TSchema> {}
	}

	export namespace Filter {
		export interface FilterProps<
			TSchema extends WithIdentitySchema,
			TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		> {
			item: z.infer<TSchema>;
			shallowFilter: IQueryStore<TQuerySchema>["props"]["shallowFilter"];
		}

		export interface ClearProps<
			TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		> {
			shallowFilter: IQueryStore<TQuerySchema>["props"]["shallowFilter"];
		}
	}

	/**
	 * Action component is used to perform an action on the whole table.
	 */
	export type Action = FC;
	/**
	 * Row component is used to perform an action on a single row.
	 */
	export type Row<TSchema extends WithIdentitySchema> = FC<{
		entity: z.infer<TSchema>;
	}>;

	export interface Props<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Css.Style {
		/**
		 * Query store containing query data for the table.
		 */
		withQueryStore: IQueryStore.Store<TQuerySchema>;
		/**
		 * Query source to fetch data from.
		 */
		withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
		/**
		 * When selection is enabled, table will provide selection support.
		 */
		selectionStore?: IStore.Store<
			createSelectionStore.StoreProps<z.infer<TSchema>>
		>;
		selection?: createSelectionStore.Selection;
		/**
		 * Table action (over the whole table).
		 */
		action?: Action;
		/**
		 * Table row action (over a single row).
		 */
		row?: Row<TSchema>;
		/**
		 * How often refetch data.
		 */
		refresh?: number;
		/**
		 * Column renderers.
		 */
		render: Partial<Record<TColumns, Render<TSchema, TQuerySchema>>>;
		/**
		 * Column order to display; if a column is not present in an order array, it is omitted from rendering.
		 */
		columns?: TColumns[];
		/**
		 * Columns to hide.
		 */
		hidden?: TColumns[];
		/**
		 * Filter modal (action icon is rendered automatically).
		 */
		filter?: FC;
		/**
		 * Where to display pagination.
		 */
		pagination?: ("top" | "bottom")[];
		/**
		 * All the texts used in the table.
		 */
		text?: {
			pagination?: Pagination.Props<TQuerySchema>["text"];
			empty?: Empty.Props<TQuerySchema, TSchema>["text"];
		};
		/**
		 * Should fulltext get automatically focus?
		 */
		focus?: boolean;

		/**
		 * Double-click on a row
		 */
		onDoubleClick?(item: z.infer<TSchema>): void;
	}

	export type PropsEx<
		TColumns extends string,
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> = Omit<
		Props<TColumns, TQuerySchema, TSchema>,
		"withQueryStore" | "withSourceQuery" | "item"
	>;
}

export const Table = <
	TColumns extends string,
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>({
	withQueryStore,
	withSourceQuery,
	selectionStore,
	selection = "none",
	onDoubleClick,
	action,
	row,
	refresh,
	render,
	columns = Object.keys(render) as TColumns[],
	hidden = [],
	pagination = ["top", "bottom"],
	text,
	focus = false,
	filter: Filter,
	css,
}: Table.Props<TColumns, TQuerySchema, TSchema>) => {
	const $filter =
		Filter ?
			<Modal
				icon={FilterIcon}
				title={t()`Filter setup (title)`}
				outside
				target={
					<Action
						icon={{
							enabled: FilterIcon,
							disabled: FilterIcon,
						}}
						css={"text-sky-500"}
					/>
				}
				css={{
					root: "w-1/2",
				}}
			>
				<Filter />
			</Modal>
		:	null;

	return (
		<FloatingDelayGroup
			delay={{
				open: 1000,
				close: 200,
			}}
		>
			<div>
				<div className={cssOf("flex items-center justify-between")}>
					<Fulltext
						withQueryStore={withQueryStore}
						focus={focus}
					/>
					<div
						className={cssOf("flex flex-row items-center justify-center gap-2")}
					>
						{pagination?.includes("top") && (
							<Pagination
								withQueryStore={withQueryStore}
								withSourceQuery={withSourceQuery}
								css={["mb-1"]}
								text={text?.pagination}
							/>
						)}
						<Refresh
							withQueryStore={withQueryStore}
							withSourceQuery={withSourceQuery}
							refresh={refresh}
						/>
						{$filter}
						<RemoveFilter
							withQueryStore={withQueryStore}
							withSourceQuery={withSourceQuery}
						/>
					</div>
				</div>
				<QueryProgress
					withQueryStore={withQueryStore}
					withSourceQuery={withSourceQuery}
					refresh={refresh}
				/>
				<div className={cssOf("relative overflow-x-auto")}>
					<table
						className={cssOf(
							"text-sm text-left text-slate-500 min-w-full w-max",
							"table-fixed",
							css,
						)}
					>
						<Header
							withQueryStore={withQueryStore}
							action={action}
							row={row}
							render={render}
							columns={columns}
							hidden={hidden}
						/>
						<Body
							withSourceQuery={withSourceQuery}
							withQueryStore={withQueryStore}
							selectionStore={selectionStore}
							selection={selection}
							onDoubleClick={onDoubleClick}
							action={action}
							row={row}
							refresh={refresh}
							render={render}
							columns={columns}
							hidden={hidden}
						/>
					</table>
					<Empty
						withQueryStore={withQueryStore}
						withSourceQuery={withSourceQuery}
						refresh={refresh}
						text={text?.empty}
					/>
					<Loader
						withQueryStore={withQueryStore}
						withSourceQuery={withSourceQuery}
					/>
				</div>
				<div className={cssOf("flex flex-row items-center justify-end gap-2")}>
					{pagination?.includes("bottom") && (
						<Pagination
							withQueryStore={withQueryStore}
							withSourceQuery={withSourceQuery}
							css={["mt-1"]}
							text={text?.pagination}
						/>
					)}
					<Refresh
						withQueryStore={withQueryStore}
						withSourceQuery={withSourceQuery}
						refresh={refresh}
					/>
					{$filter}
					<RemoveFilter
						withQueryStore={withQueryStore}
						withSourceQuery={withSourceQuery}
					/>
				</div>
			</div>
		</FloatingDelayGroup>
	);
};
