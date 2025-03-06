import type { FC } from "react";
import type { DataType } from "./DataType";
import type { StateType } from "./StateType";

/**
 * Overall table filter configuration.
 */
export namespace FilterType {
	export type Value = Record<string, any>;
	export type State = StateType<Value | undefined>;

	/**
	 * Props defines on the whole table
	 */
	export interface Table {
		state: State;
	}

	export namespace Column {
		export namespace is {
			export interface Props {
				filter: FilterType.Filter;
			}

			export type Callback = (props: Props) => boolean;
		}

		export namespace reset {
			export interface Props {
				filter: FilterType.Filter;
			}

			export type Callback = (props: Props) => void;
		}

		export namespace Component {
			export interface Props<TData extends DataType.Data> {
				filter: FilterType.Filter;
				data: TData;
			}

			export type Callback<TData extends DataType.Data> = FC<Props<TData>>;
		}
	}

	/**
	 * Props defined on a column.
	 */
	export interface Column<TData extends DataType.Data> {
		is: Column.is.Callback;
		reset: Column.reset.Callback;
		component: Column.Component.Callback<TData>;
	}

	export namespace Filter {
		export namespace is {
			export type Callback = () => boolean;
		}

		export namespace shallow {
			export interface Props {
				path: string;
				value: any;
			}

			export type Callback = (props: Props) => void;
		}
	}

	/**
	 * Filter instance created by a table.
	 */
	export interface Filter extends Table {
		is: Filter.is.Callback;
		shallow: Filter.shallow.Callback;
		reset(): void;
	}
}
