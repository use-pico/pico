import { type EntitySchema, pathOf } from "@use-pico/common";
import type { Table } from "../Table";
import { RangeFilter } from "./RangeFilter";

export namespace withRangeFilter {
	export interface Props<TFilter extends Record<string, any>> {
		/**
		 * Path in data property to filter on.
		 */
		path: string;
		lte: keyof TFilter;
		gte: keyof TFilter;
	}
}

export const withRangeFilter = <
	TData extends EntitySchema.Type,
	TFilter extends Record<string, any>,
>({
	path,
	lte,
	gte,
}: withRangeFilter.Props<TFilter>): Table.Filter.Props<TData, TFilter> => {
	return {
		reset({ state }) {
			state.set({
				[lte]: undefined,
				[gte]: undefined,
			});
		},
		is({ state: { value } }) {
			return (
				pathOf(value || {}).get(lte) !== undefined ||
				pathOf(value || {}).get(gte) !== undefined
			);
		},
		component({ data, state }) {
			return (
				<RangeFilter
					lte={lte}
					gte={gte}
					filterInstance={filterInstance}
					value={pathOf(data).get(path)}
				/>
			);
		},
	};
};
