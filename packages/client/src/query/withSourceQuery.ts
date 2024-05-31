import type {
	CountSchema,
	FilterSchema,
	OrderBySchema,
	QuerySchema,
	WithIdentitySchema
}                              from "@use-pico/common";
import {z}                     from "zod";
import type {IWithQuery}       from "./IWithQuery";
import type {IWithSourceQuery} from "./IWithSourceQuery";
import {withQuery}             from "./withQuery";

export namespace withSourceQuery {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Omit<
		withQuery.Props<TQuerySchema, z.ZodArray<TSchema>>,
		"schema"
	> {
		schema: {
			query: TQuerySchema;
			response: TSchema;
		};
		withCountQuery: IWithQuery<TQuerySchema, CountSchema>;
	}
}

export const withSourceQuery = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>(
	{
		withCountQuery,
		schema: {
					query,
					response,
				},
		invalidator,
		...props
	}: withSourceQuery.Props<
		TQuerySchema,
		TSchema
	>
): IWithSourceQuery<
	TQuerySchema,
	TSchema
> => {
	const $response = z.array(response);
	const $withQuery = withQuery({
		...props,
		schema: {
			request: query,
			response: $response,
		},
	});

	return {
		...$withQuery,
		schema: {
			request: query,
			response: $response,
		},
		async invalidator($props) {
			await invalidator?.($props);
			await withCountQuery?.invalidator?.($props);
			return [
				props.key,
				withCountQuery.key,
			];
		},
		withCountQuery,
	};
};
