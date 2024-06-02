import type {MutationKey}   from "@tanstack/react-query";
import type {
    RequestSchema,
    ResponseSchema
}                           from "@use-pico/common";
import {type z}             from "zod";
import type {IWithMutation} from "./IWithMutation";

/**
 * Utility method used to generate a mutation handler.
 *
 * @group query
 */
export namespace withMutation {
    /**
     * Just re-exported `MutationKey` from `@tanstack/react-query`.
     */
    export type Key = MutationKey;

    /**
     * Props for `withMutation` method.
     *
     * @template TRequestSchema Request schema.
     * @template TResponseSchema Response schema.
     */
	export interface Props<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> {
        /**
         * Query key used to cache the result.
         */
        key: Key;
        /**
         * Mutation schemas.
         */
		schema: {
            /**
             * Request schema.
             */
			request: TRequestSchema;
            /**
             * Response schema.
             */
			response: TResponseSchema;
		};

        /**
         * Callback used to execute the mutation.
         */
		useCallback(): (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;

        /**
         * Callback used to invalidate the query cache.
         */
		invalidator?: IWithMutation<TRequestSchema, TResponseSchema>["invalidator"];

        /**
         * Default options for the mutation.
         */
		defaultOptions?: IWithMutation.Options<TRequestSchema, TResponseSchema>;
	}
}

export const withMutation = <
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
>(
	{
		key,
		schema,
		useCallback,
		invalidator,
		defaultOptions,
	}: withMutation.Props<
		TRequestSchema,
		TResponseSchema
	>
): IWithMutation<TRequestSchema, TResponseSchema> => {
	return {
		key,
		schema,
		useCallback,
		invalidator,
		defaultOptions,
	};
};
