"use client";

import type {
    EventSourceFilterSchema,
    EventSourceMutationSchema,
    EventSourceQuerySchema,
    EventSourceSchema
}                           from "@use-pico/common";
import {useEffect}          from "react";
import {z}                  from "zod";
import type {IWithMutation} from "../query/IWithMutation";
import {IWithQuery}         from "../query/IWithQuery";
import {useMutation}        from "../query/useMutation";
import {useQueryEx}         from "../query/useQueryEx";

export namespace useEventSource {
    export interface Handler<
        TSchema extends z.ZodSchema,
    > {
        /**
         * Event type to handle.
         */
        type: string;
        /**
         * Schema to match the event data.
         */
        schema: TSchema;

        /**
         * Handler to handle the event when schema is successfully parsed.
         */
        handler(data: z.infer<TSchema>): void;
    }

    export interface Props {
        /**
         * Event Source query to get the events.
         */
        withQuery: IWithQuery<EventSourceQuerySchema, z.ZodArray<EventSourceSchema>>;
        /**
         * Mutation used to commit received events.
         */
        withMutation: IWithMutation<EventSourceMutationSchema, EventSourceSchema>;
        /**
         * Optional filter used to filter out only some events.
         */
        filter?: EventSourceFilterSchema.Type;
        /**
         * Low-level query options, of needed.
         */
        options?: IWithQuery.Options<EventSourceQuerySchema, z.ZodArray<EventSourceSchema>>;
        /**
         * Handlers to handle the events; when schema matches the event data, handler is called.
         */
        handlers: Handler<z.ZodSchema>[];
        refetch?: number;
    }
}

/**
 * Reverse event source implementation; because EventSource itself is very unreliable as it could get killed any time on the wire,
 * this is a pulling-based version with basically the same API.
 */
export const useEventSource = (
    {
        withQuery,
        withMutation,
        filter,
        options,
        handlers,
        refetch = 1000,
    }: useEventSource.Props
) => {
    const result = useQueryEx({
        withQuery,
        request: {
            where: {
                ...filter,
                commit: false,
            },
        },
        options: {
            ...options,
            refetchInterval: refetch,
        },
    });
    const mutation = useMutation({
        withMutation,
    });

    useEffect(() => {
        if (!result.isSuccess) {
            return;
        }
        result.data.forEach(event => {
            for (const handler of handlers) {
                if (handler.type === event.event) {
                    const parsed = handler.schema.safeParse(event.payload);
                    if (parsed.success) {
                        handler.handler(parsed.data);
                        mutation.mutate({
                            patch: {
                                with:  {
                                    commit: true,
                                },
                                query: {
                                    where: {
                                        id: event.id,
                                    },
                                },
                            },
                        });
                    }
                }
            }
        });
    }, [result.isSuccess, result.data]);

    return result;
};
