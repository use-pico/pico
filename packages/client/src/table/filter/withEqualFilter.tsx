import { type DeepKeys, type EntitySchema, pathOf } from "@use-pico/common";
import type { Table } from "../Table";
import { EqualFilter } from "./EqualFilter";

export namespace withEqualFilter {
	export interface Props<TData extends EntitySchema.Type, TFilter> {
		/**
		 * Filter path
		 */
		path: DeepKeys<TFilter>;
		/**
		 * Data path to get value from
		 *
		 * If not specific, path is used.
		 */
		from?: DeepKeys<TData>;
	}
}

export const withEqualFilter = <TData extends EntitySchema.Type, TFilter>({
	path,
	from,
}: withEqualFilter.Props<TData, TFilter>): Table.Filter.Props<
	TData,
	TFilter
> => {
	return {
		reset({ state }) {
			state.set({
				...state.value,
				[path]: undefined,
			});
		},
		is({ state }) {
			return pathOf(state.value || {}).get(path) !== undefined;
		},
		component({ data, state }) {
			const isFilter = pathOf(state.value || {}).get(path) === undefined;

			return isFilter ? (
				<EqualFilter<TData, TFilter>
					path={path}
					state={state}
					value={pathOf(data).get(from || path)}
				/>
			) : null;
		},
	};
};
