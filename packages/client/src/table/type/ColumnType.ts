import type { DeepKeys, DeepValue } from "@use-pico/common";
import type { FC } from "react";
import type { DataType } from "./DataType";
import type { FilterType } from "./FilterType";
import type { HeaderType } from "./HeaderType";
import type { UseTable } from "./UseTable";

export namespace ColumnType {
	export namespace Render {
		export interface Props<TData extends DataType.Data, TKey extends DeepKeys<TData>> {
			table: UseTable<TData>;
			data: TData;
			value: DeepValue<TData, TKey>;
		}
	}

	export interface Def<TData extends DataType.Data, TKey extends DeepKeys<TData>> {
		name: TKey;
		header?: FC<HeaderType.Header.Props<TData>>;
		render: FC<Render.Props<TData, TKey>>;
		size?: number;
		filter?: FilterType.Def<TData>;
	}

	export interface Column<TData extends DataType.Data, TKey extends DeepKeys<TData>> {
		id: string;
		def: Def<TData, TKey>;
		filter?: FilterType.Filter;
	}
}
