import {
	type QueryKey,
	type UseQueryOptions,
	type UseQueryResult
}                          from "@tanstack/react-query";
import type {
	RequestSchema,
	ResponseSchema
}                          from "@use-pico/common";
import {type z}            from "zod";
import {type IInvalidator} from "./IInvalidator";

export namespace IWithQuery {
	export type QueryOptions<
		TResponseSchema extends ResponseSchema,
	> =
		Omit<
			UseQueryOptions<
				any,
				any,
				z.infer<TResponseSchema>
			>, "queryFn" | "queryKey"
		>
		& Partial<
		Pick<
			UseQueryOptions<
				any,
				any,
				z.infer<TResponseSchema>
			>,
			"queryKey"
		>
	>;

	export interface Options<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> {
		request: z.infer<TRequestSchema>;
		options?: QueryOptions<TResponseSchema>;
	}

	export type Result<
		TResponseSchema extends ResponseSchema,
	> = UseQueryResult<
		z.infer<TResponseSchema>,
		any
	>;
}

/**
 * This is a base object containing everything you need to use a query.
 *
 * @group query
 *
 * @template TRequestSchema Shape of the request schema.
 * @template TResponseSchema Shape of the response schema.
 */
export interface IWithQuery<
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
> extends IInvalidator {
	/**
	 * Query key used in React Query
	 */
	key: QueryKey;
	/**
	 * This is obvious, isn't it?
	 */
	schema: {
		request: TRequestSchema;
		response: TResponseSchema;
	};

	/**
	 * This is the actual query function.
	 */
	useCallback(): (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;
}
