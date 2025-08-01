import type { OrderSchema, StateType } from "@use-pico/common";

export namespace SortType {
	/**
	 * Available order values.
	 */
	export type Order = OrderSchema.Type;
	export type State = StateType<Record<string, Order>>;

	/**
	 * Sort props defined on a table.
	 */
	export type Table = State;

	/**
	 * Sort API available in "runtime" for each column.
	 */
	export interface Column {
		/**
		 * Get the order path from the state.
		 */
		path: string;
		/**
		 * Exclusive sorting replaces whole state only with this column.
		 */
		exclusive?: boolean;
	}

	export namespace Sort {
		export namespace order {
			export interface Props {
				/**
				 * Sort column definition.
				 */
				column: Column;
			}

			export type Callback = (props: Props) => Order;
		}

		export namespace toggle {
			export interface Props {
				/**
				 * Sort column definition.
				 */
				column: Column;
			}

			export type Callback = (props: Props) => void;
		}
	}

	export interface Sort extends Table {
		/**
		 * Get order value for the column.
		 */
		order: Sort.order.Callback;
		/**
		 * Toggle (round) the sort:
		 * - undefined -> asc
		 * -> asc -> desc
		 * -> desc -> undefined
		 */
		toggle: Sort.toggle.Callback;
	}
}
