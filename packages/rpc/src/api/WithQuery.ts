import {type WithQuery as WithCoolQuery} from "@use-pico/query";
import {
    type RequestSchema,
    type ResponseSchema
}                                        from "@use-pico/schema";

/**
 * This is a base object containing everything you need to use an RPC query.
 */
export interface WithQuery<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> extends WithCoolQuery<
    TRequestSchema,
    TResponseSchema
> {
    /**
     * Target service being called
     */
    service: string;
}
