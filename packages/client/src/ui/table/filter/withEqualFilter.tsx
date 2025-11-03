import type { EntitySchema, withQuerySchema } from "@use-pico/common/schema";
import type { DeepKeys } from "@use-pico/common/type";
import pathOf from "object-path";
import type { Table } from "../Table";
import { EqualFilter } from "./EqualFilter";

export namespace withEqualFilter {
	export interface Props<
		TData extends EntitySchema.Type,
		TFilter extends withQuerySchema.Query,
	> {
		/**
		 * Which filter value we're about to filter by
		 */
		value: DeepKeys<TFilter["filter"]>;
		/**
		 * Data path to get value from
		 */
		from: DeepKeys<TData>;
	}
}

export const withEqualFilter = <
	TData extends EntitySchema.Type,
	TFilter extends withQuerySchema.Query,
>({
	value,
	from,
}: withEqualFilter.Props<TData, TFilter>): Table.Filter.Props<
	TData,
	TFilter
> => {
	return {
		reset({ state }) {
			state.set({
				...state.value,
				[value]: undefined,
			});
		},
		is({ state }) {
			const path = pathOf(state.value || {});
			return path.get(value) !== undefined;
		},
		component({ data, state }) {
			const isFilter = pathOf(state.value || {}).get(value) === undefined;

			return isFilter ? (
				<EqualFilter<TData, TFilter>
					path={value}
					state={state}
					value={pathOf(data).get(from)}
				/>
			) : null;
		},
	};
};
