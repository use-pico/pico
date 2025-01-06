import type { DeepKeys, DeepValue } from "@use-pico/common";
import type { FC } from "react";
import type { DataType } from "./DataType";
import type { FilterType } from "./FilterType";
import type { HeaderType } from "./HeaderType";
import type { UseTable } from "./UseTable";

export namespace ColumnType {
	export namespace Render {
		export interface Props<
			TData extends DataType.Data,
			TKey extends DeepKeys<TData>,
			TContext = any,
		> {
			table: UseTable<TData, TContext>;
			data: TData;
			value: DeepValue<TData, TKey>;
			context: TContext;
		}
	}

	export interface Def<
		TData extends DataType.Data,
		TKey extends DeepKeys<TData>,
		TContext = any,
	> {
		name: TKey;
		header?: FC<HeaderType.Header.Props<TData>>;
		render: FC<Render.Props<TData, TKey, TContext>>;
		size?: number;
		filter?: FilterType.Def<TData>;
	}

	export interface Column<
		TData extends DataType.Data,
		TKey extends DeepKeys<TData>,
		TContext = any,
	> {
		id: string;
		def: Def<TData, TKey, TContext>;
		filter?: FilterType.Filter;
	}
}
