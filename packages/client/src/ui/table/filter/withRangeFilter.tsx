import type { EntitySchema, withQuerySchema } from "@use-pico/common/schema";
import type { DeepKeys } from "@use-pico/common/type";
import pathOf from "object-path";
import type { Table } from "../Table";
import { RangeFilter } from "./RangeFilter";

export namespace withRangeFilter {
	export interface Props<
		TData extends EntitySchema.Type,
		TFilter extends withQuerySchema.Query,
	> {
		/**
		 * Path in data property to filter on.
		 */
		path: DeepKeys<TData>;
		lte: DeepKeys<TFilter["filter"]>;
		gte: DeepKeys<TFilter["filter"]>;
	}
}

export const withRangeFilter = <
	TData extends EntitySchema.Type,
	TFilter extends withQuerySchema.Query,
>({
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
			const path = pathOf(value || {});

			return path.get(lte) !== undefined || path.get(gte) !== undefined;
		},
		component({ data, state }) {
			return (
				<RangeFilter<TFilter>
					lte={lte}
					gte={gte}
					state={state}
					value={pathOf(data).get(path)}
				/>
			);
		},
	};
};
