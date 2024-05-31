"use client";

import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	ResponseSchema,
	WithIdentitySchema
}                              from "@use-pico/common";
import type {FC}               from "react";
import {type z}                from "zod";
import {Loader}                from "../ui/Loader";
import {IWithQuery}            from "./IWithQuery";
import type {IWithSourceQuery} from "./IWithSourceQuery";
import {QueryResult}           from "./QueryResult";
import {useQueryEx}            from "./useQueryEx";

export namespace QueryFetch {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TResponseSchema extends WithIdentitySchema,
	> {
		loader?: FC;
		/**
		 * Query to fetch entity
		 */
		withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
		query: z.infer<TQuerySchema>;

		/**
		 * Error renderer
		 */
		error?: FC<WithErrorProps>;

		/**
		 * Success renderer
		 */
		success: FC<WithSuccessProps<TResponseSchema>>;
		enabled?: boolean;
		options?: IWithQuery.QueryOptions<z.ZodArray<TResponseSchema>>;
	}

	export interface WithErrorProps {
		error: any;
	}

	export interface WithSuccessProps<TResponseSchema extends ResponseSchema> {
		entities: z.infer<TResponseSchema>[];
	}
}

export const QueryFetch = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TResponseSchema extends WithIdentitySchema,
>(
	{
		loader,
		withSourceQuery,
		query,
		error = () => null,
		success: Success,
		enabled = true,
		options,
	}: QueryFetch.Props<
		TQuerySchema,
		TResponseSchema
	>
) => {
	const result = useQueryEx({
		withQuery: withSourceQuery,
		request: query,
		options: {
			...options,
			enabled,
		},
	});
	return <QueryResult
		result={result}
		loader={loader || Loader}
		error={error}
		success={({entity}) => <Success entities={entity}/>}
	/>;
};
