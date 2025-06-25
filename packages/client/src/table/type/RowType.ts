import type { cls } from "@use-pico/common";
import type { CellType } from "./CellType";
import type { DataType } from "./DataType";

export namespace RowType {
	export interface Row<TData extends DataType.Data, TContext = any> {
		id: string;
		data: TData;
		cells: CellType.Cell<TData, any, TContext>[];
	}

	export namespace Css {
		export interface Props<TData extends DataType.Data> {
			data: TData;
		}

		export type Callback<TData extends DataType.Data> = (
			props: Props<TData>,
		) => cls.Class;
	}

	export namespace Event {
		export namespace OnDoubleClick {
			export interface Props<TData extends DataType.Data> {
				row: RowType.Row<TData>;
				data: TData;
			}

			export type Callback<TData extends DataType.Data> = (
				props: Props<TData>,
			) => void;
		}
	}

	export interface Props<TData extends DataType.Data> {
		/**
		 * Callback used to modify styles of the row.
		 */
		css?: Css.Callback<TData>;
		/**
		 * If you need to do something when a row is double-clicked.
		 */
		onDoubleClick?: Event.OnDoubleClick.Callback<TData>;
	}
}
