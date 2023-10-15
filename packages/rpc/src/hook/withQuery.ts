"use client";

import {
    QueryKey,
    useQuery,
    useQueryClient
}                       from "@tanstack/react-query";
import {
    type IInvalidator,
    type WithQuery as ICoolWithQuery
}                       from "@use-pico/query";
import {
    type RequestSchema,
    type ResponseSchema
}                       from "@use-pico/schema";
import {type z}         from "@use-pico/utils";
import {type WithQuery} from "../api/WithQuery";
import {RpcStore}       from "../store/RpcStore";
import {withBulk}       from "../utils/withBulk";

export namespace withQuery {
    export interface Props<
        TRequestSchema extends RequestSchema,
        TResponseSchema extends ResponseSchema,
    > {
        key?: string[];
        service: string;
        schema: {
            request: TRequestSchema;
            response: TResponseSchema;
        },
        invalidator?: IInvalidator.Invalidator;
    }
}

/**
 * Creates useQuery hook (basically same as the one in React Query).
 */
export const withQuery = <
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
    }: withQuery.Props<TRequestSchema, TResponseSchema>
): WithQuery<TRequestSchema, TResponseSchema> => {
    const queryKey: QueryKey = key || [service];

    const usePromise = () => {
        const store = RpcStore.use();
        return async (request: z.infer<TRequestSchema>) => {
            return withBulk<TRequestSchema, TResponseSchema>({
                service,
                request: requestSchema?.parse(request) ?? request,
                store,
                schema:  responseSchema,
            });
        };
    };

    return {
        key:    queryKey,
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
                    queryKey,
                });
            });
        },
        usePromise,
        useQuery:      ({
                            queryKey: $queryKey,
                            ...       options
                        } = {}) => {
            const promise = usePromise();
            return useQuery({
                queryKey: queryKey.concat($queryKey || []),
                queryFn:  async () => promise({}),
                ...options,
            });
        },
        useQueryEx:    (
                           {
                               options,
                               request,
                           }: ICoolWithQuery.Options<TRequestSchema, TResponseSchema>
                       ) => {
            const promise = usePromise();
            return useQuery({
                queryKey: queryKey.concat(request),
                queryFn:  async () => promise(request),
                ...options,
            });
        },
        useUpdateWith: () => {
            const queryClient = useQueryClient();
            return request => {
                queryClient.setQueryData(queryKey.concat(request ? [request] : []), request);
            };
        }
    };
};
