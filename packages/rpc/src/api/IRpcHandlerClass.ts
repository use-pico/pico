import {
    type RequestSchema,
    type ResponseSchema
}                         from "@use-pico/schema";
import {type IRpcHandler} from "./IRpcHandler";

export interface IRpcHandlerClass<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
    THandler extends IRpcHandler<TRequestSchema, TResponseSchema>,
> {
    new(...args: any): THandler;

    $key: string;
    $requestSchema: TRequestSchema;
    $responseSchema: TResponseSchema;
}
