"use client";

import {
    type MutationKey,
    useMutation,
    useQueryClient
}                          from "@tanstack/react-query";
import {
    type IInvalidator,
    type WithMutation as ICoolWithMutation
}                          from "@use-pico/query";
import {
    parse,
    type RequestSchema,
    type ResponseSchema
}                          from "@use-pico/schema";
import {type WithMutation} from "../api/WithMutation";
import {RpcStore}          from "../store/RpcStore";
import {withBulk}          from "../utils/withBulk";

export namespace withMutation {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        key?: MutationKey;
        service: string;
        schema: {
            request: TRequestSchema,
            response: TResponseSchema,
        },
        /**
         * When a mutation is successful, run this query invalidator (basically could be anything); consider this method
         * as a specialized case of "onSuccess", but **do not** use it like it.
         */
        invalidator?: IInvalidator.Invalidator;
    }
}

/**
 * Creates useMutation hook (basically same as the one in React Query).
 */
export const withMutation = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
>(
    {
        key,
        service,
        schema: {
                    request:  requestSchema,
                    response: responseSchema,
                },
        invalidator,
    }: withMutation.Props<TRequestSchema, TResponseSchema>
): WithMutation<TRequestSchema, TResponseSchema> => {
    const mutationKey = (key || [service]);

    return {
        key:    mutationKey,
        service,
        schema: {
            request:  requestSchema,
            response: responseSchema,
        },
        useInvalidator() {
            const queryClient = useQueryClient();
            return invalidator ? (async () => {
                return invalidator({
                    queryClient,
                });
            }) : (async () => {
                return queryClient.invalidateQueries({
                    queryKey: mutationKey,
                });
            });
        },
        useMutation: (
                         {
                             mutationKey: $mutationKey,
                             onSuccess,
                             onError,
                             ...options
                         }: ICoolWithMutation.Options<TRequestSchema, TResponseSchema> = {}
                     ) => {
            const queryClient = useQueryClient();
            const store = RpcStore.use();

            return useMutation({
                mutationKey: mutationKey.concat($mutationKey || []),
                mutationFn:  async request => {
                    try {
                        return withBulk<TRequestSchema, TResponseSchema>({
                            service,
                            request: requestSchema ? parse(requestSchema, request) : request,
                            store,
                            schema:  responseSchema,
                        });
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                },
                onSuccess:   async (data, variables, context) => {
                    setTimeout(() => {
                        invalidator?.({
                            queryClient,
                        });
                    }, 0);
                    onSuccess?.(data, variables, context);
                },
                onError:     (error, variables, context) => {
                    onError?.(error, variables, context);
                },
                ...options,
            });
        },
    };
};
