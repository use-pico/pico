import type {
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema
}                              from "@use-pico/common";
import {type FC}               from "react";
import type {IWithSourceQuery} from "./IWithSourceQuery";
import {QueryFetch}            from "./QueryFetch";

export namespace withCollection {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TResponseSchema extends WithIdentitySchema,
	> {
		withSourceQuery: IWithSourceQuery<TQuerySchema, TResponseSchema>;
	}

	export type Query<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TResponseSchema extends WithIdentitySchema,
	> = FC<
		Omit<
			QueryFetch.Props<TQuerySchema, TResponseSchema>,
			"withSourceQuery"
		>
	>;
}

export const withCollection = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TResponseSchema extends WithIdentitySchema,
>(
	{
		withSourceQuery,
	}: withCollection.Props<TQuerySchema, TResponseSchema>
): withCollection.Query<TQuerySchema, TResponseSchema> => {
	return props => <QueryFetch withSourceQuery={withSourceQuery} {...props}/>;
};
