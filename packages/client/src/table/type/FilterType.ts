import type { FC } from "react";
import type { DataType } from "./DataType";

export namespace FilterType {
	export interface Filter {
		value: Record<string, any>;
		is(): boolean;
		reset(): void;
		shallow(path: string, value: any): void;
		set(value: Record<string, any>): void;
	}

	export namespace Def {
		export namespace OnFilter {
			export interface Props<TData extends DataType.Data> {
				data: TData;
				filter: Filter;
			}
		}

		export type OnFilter<TData extends DataType.Data> = (
			props: OnFilter.Props<TData>,
		) => void;
	}

	export interface Def<TData extends DataType.Data> {
		clear(props: { filter: Filter }): void;
		component: FC<{ filter: Filter; data: TData }>;
		is(props: { value: Record<string, any> }): boolean;
	}
}
