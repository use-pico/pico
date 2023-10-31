import {type WithMutation as IWithCoolMutation,} from "@use-pico/query";
import {
    type RequestSchema,
    type ResponseSchema
}                                                from "@use-pico/schema";

export interface WithMutation<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
> extends IWithCoolMutation<
    TRequestSchema,
    TResponseSchema
> {
    service: string;
}
