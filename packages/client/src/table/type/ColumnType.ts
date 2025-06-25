import type { DeepKeys, DeepValue } from "@use-pico/common";
import type { FC } from "react";
import type { DataType } from "./DataType";
import type { FilterType } from "./FilterType";
import type { HeaderType } from "./HeaderType";
import type { SortType } from "./SortType";

export namespace ColumnType {
	/**
	 * Types used for rendering a column.
	 */
	export namespace Render {
		/**
		 * Props passed to the render function.
		 */
		export interface Props<
			TData extends DataType.Data,
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
			/**
			 * Context, if provided to the table.
			 */
			context: TContext;
		}
	}

	export type Size = number | "auto";

	/**
	 * Column definition provided by the user.
	 */
	export interface Props<
		TData extends DataType.Data,
		TKey extends DeepKeys<TData>,
		TContext = any,
	> {
		/**
		 * Name of a column; it's also used to pickup the value from data to render component.
		 */
		name: TKey;
		/**
		 * Component used to render a table header.
		 */
		header?: FC<HeaderType.Header.Props>;
		/**
		 * Component used to render a table value.
		 */
		render: FC<Render.Props<TData, TKey, TContext>>;
		/**
		 * Size of the column.
		 */
		size: Size;
		/**
		 * Filter definition for the column.
		 */
		filter?: FilterType.Column<TData>;
		/**
		 * When provided, the column will be sortable by this value.
		 */
		sort?: SortType.Column;
	}
}
