import {
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema,
} from "@use-pico/common";
import { FilterRemoveIcon } from "../icon/FilterRemoveIcon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { useStore } from "../store/useStore";
import { Action } from "../ui/Action";
import type { IQueryStore } from "./IQueryStore";
import type { IWithSourceQuery } from "./IWithSourceQuery";
import { useSourceQuery } from "./useSourceQuery";

export namespace RemoveFilter {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> {
		/**
		 * Query store containing query data for the table.
		 */
		withQueryStore: IQueryStore.Store<TQuerySchema>;
		/**
		 * Query source to fetch data from.
		 */
		withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
	}
}

export const RemoveFilter = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>({
	withQueryStore,
	withSourceQuery,
}: RemoveFilter.Props<TQuerySchema, TSchema>) => {
	const result = useSourceQuery({
		store: withQueryStore,
		withSourceQuery,
	});
	const queryStore = useStore(withQueryStore, ({ clearFilter, isFilter }) => ({
		clearFilter,
		isFilter,
	}));

	return queryStore.isFilter() ?
			<Action
				icon={{
					enabled: FilterRemoveIcon,
					disabled: FilterRemoveIcon,
					loading: LoaderIcon,
				}}
				css={["text-amber-500"]}
				disabled={result.isFetching}
				onClick={() => queryStore.clearFilter()}
			/>
		:	null;
};
