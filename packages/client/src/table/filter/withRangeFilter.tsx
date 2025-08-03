import { type DeepKeys, type EntitySchema, pathOf } from "@use-pico/common";
import type { Table } from "../Table";
import { RangeFilter } from "./RangeFilter";

export namespace withRangeFilter {
	export interface Props<TData extends EntitySchema.Type, TFilter> {
		/**
		 * Path in data property to filter on.
		 */
		path: DeepKeys<TData>;
		lte: DeepKeys<TFilter>;
		gte: DeepKeys<TFilter>;
	}
}

export const withRangeFilter = <TData extends EntitySchema.Type, TFilter>({
	path,
	lte,
	gte,
}: withRangeFilter.Props<TData, TFilter>): Table.Filter.Props<
	TData,
	TFilter
> => {
	return {
		reset({ state }) {
			state.set({
				...state.value,
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
					state={state}
					value={pathOf(data).get(path)}
				/>
			);
		},
	};
};
