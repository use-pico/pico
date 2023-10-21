import {ErrorResponseSchema}        from "@use-pico/query";
import {
    type PicoSchema,
    withUnion
}                                   from "@use-pico/schema";
import {type withRpcResponseSchema} from "../utils/withRpcResponseSchema";
import {DataResponseSchema}         from "./DataResponseSchema";

export const RpcResponseSchema = withUnion([
    ErrorResponseSchema,
    DataResponseSchema,
]);
export type RpcResponseSchema<TDataSchema extends PicoSchema> = ReturnType<withRpcResponseSchema<TDataSchema>>;
export namespace RpcResponseSchema {
    export type Type<TDataSchema extends PicoSchema> = PicoSchema.Output<RpcResponseSchema<TDataSchema>>;
}
