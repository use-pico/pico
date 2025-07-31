import type { StateType } from "@use-pico/common";
import type { DataType } from "./DataType";

export namespace SelectionType {
	export type State = StateType<string[]>;

	/**
	 * Configuration props for selection, on a table.
	 */
	export interface Table {
		type: "single" | "multi";
		state: State;
	}

	export namespace Selection {
		export namespace isSelect {
			export interface Props<TData extends DataType.Data> {
				data: TData;
			}

			export type Callback<TData extends DataType.Data> = (
				props: Props<TData>,
			) => boolean;
		}

		export namespace Event {
			export namespace onSelect {
				export interface Props<TData extends DataType.Data> {
					data: TData;
				}

				export type Callback<TData extends DataType.Data> = (
					props: Props<TData>,
				) => void;
			}

			export namespace onSelectAll {
				export type Callback = () => void;
			}

			export interface Instance<TData extends DataType.Data> {
				onSelect: onSelect.Callback<TData>;
				onSelectAll: onSelectAll.Callback;
			}
		}
	}

	/**
	 * Internal instance of selection.
	 */
	export interface Selection extends Table {
		/**
		 * Are the all (visible) rows selected?
		 */
		isAll(): boolean;
		/**
		 * Are any (visible) rows selected?
		 */
		isAny(): boolean;
		/**
		 * Check if the given row is selected.
		 */
		isSelected: Selection.isSelect.Callback<DataType.Data>;
		event: Selection.Event.Instance<DataType.Data>;
	}
}
