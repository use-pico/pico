"use client";

import {useQuery as useCoolQuery} from "@tanstack/react-query";
import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema
}                                 from "@use-pico/common";
import {type z}                   from "zod";
import {IQueryStore}              from "./IQueryStore";
import {IWithQuery}               from "./IWithQuery";
import type {IWithSourceQuery}    from "./IWithSourceQuery";
import {usePromise}               from "./usePromise";
import {useQueryOf}               from "./useQueryOf";

export namespace useSourceQuery {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TResponseSchema extends WithIdentitySchema,
	> extends IWithQuery.QueryOptions<z.ZodArray<TResponseSchema>> {
		store: IQueryStore.Store<TQuerySchema>;
		withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
	}
}

export const useSourceQuery = <
	TQuerySchema extends QuerySchema<any, any>,
	TResponseSchema extends WithIdentitySchema,
>(
	{
		store,
		withSourceQuery,
		queryKey,
		...options
	}: useSourceQuery.Props<TQuerySchema, TResponseSchema>
): IWithSourceQuery.Result<TResponseSchema> => {
	const promise = usePromise({withQuery: withSourceQuery});
	const query = useQueryOf({store});

	return useCoolQuery({
		queryKey: withSourceQuery.key.concat(queryKey || []).concat(query),
		queryFn: async () => promise(query),
		...options,
	});
};
