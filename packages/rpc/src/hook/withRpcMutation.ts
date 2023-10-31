import {type WithMutation}     from "@use-pico/query";
import {
    type RequestSchema,
    type ResponseSchema
}                              from "@use-pico/schema";
import {type IRpcHandler}      from "../api/IRpcHandler";
import {type IRpcHandlerClass} from "../api/IRpcHandlerClass";
import {withMutation}          from "./withMutation";

export const withRpcMutation = <
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
    THandler extends IRpcHandler<TRequestSchema, TResponseSchema>,
>(
    handler: IRpcHandlerClass<TRequestSchema, TResponseSchema, THandler>,
): WithMutation<
    TRequestSchema,
    TResponseSchema
> => {
    return withMutation({
        service: handler.$key,
        schema:  {
            request:  handler.$requestSchema,
            response: handler.$responseSchema,
        },
    });
};
