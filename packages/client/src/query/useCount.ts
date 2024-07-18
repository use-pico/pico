import type {
	CountSchema,
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema,
} from "@use-pico/common";
import { useStore$ } from "../store/useStore$";
import { IQueryStore } from "./IQueryStore";
import { IWithQuery } from "./IWithQuery";
import type { IWithSourceQuery } from "./IWithSourceQuery";
import { useQueryEx } from "./useQueryEx";

export namespace useCount {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends IWithQuery.QueryOptions<CountSchema> {
		store: IQueryStore.Store<TQuerySchema>;
		withSourceQuery: IWithSourceQuery<TQuerySchema, TSchema>;
		query?(): QuerySchema.QueryType<TQuerySchema>;
	}
}

export const useCount = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>({
	store,
	withSourceQuery: { withCountQuery },
	query,
	...options
}: useCount.Props<TQuerySchema, TSchema>) => {
	const storeQuery =
		useStore$(store, ({ where, filter }) => ({
			where,
			filter,
			cursor: undefined,
			orderBy: undefined,
		})) || {};

	return useQueryEx({
		withQuery: withCountQuery,
		request: query ? query() : storeQuery,
		options,
	});
};
