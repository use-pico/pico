import type { DataType } from "./DataType";
import type { UseTable } from "./UseTable";

export namespace HeaderType {
	export namespace Header {
		export interface Props<TData extends DataType.Data> {
			table: UseTable<TData>;
		}
	}
}
