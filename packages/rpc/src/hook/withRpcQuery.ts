import {type QuerySchema}      from "@use-pico/query";
import {
    type ArraySchema,
    type ResponseSchema
}                              from "@use-pico/schema";
import {type IRpcHandler}      from "../api/IRpcHandler";
import {type IRpcHandlerClass} from "../api/IRpcHandlerClass";
import {type WithQuery}        from "../api/WithQuery";
import {withQuery}             from "./withQuery";

export const withRpcQuery = <
    TRequestSchema extends QuerySchema<any, any>,
    TResponseSchema extends ArraySchema<ResponseSchema>,
    THandler extends IRpcHandler<TRequestSchema, TResponseSchema>,
>(
    handler: IRpcHandlerClass<TRequestSchema, TResponseSchema, THandler>,
): WithQuery<
    TRequestSchema,
    TResponseSchema
> => {
    return withQuery({
        service: handler.$key,
        schema:  {
            request:  handler.$requestSchema,
            response: handler.$responseSchema,
        },
    });
};
