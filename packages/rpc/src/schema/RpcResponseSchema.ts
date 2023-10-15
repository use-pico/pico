import {ErrorResponseSchema}        from "@use-pico/query";
import {z}                          from "@use-pico/utils";
import {type withRpcResponseSchema} from "../utils/withRpcResponseSchema";
import {DataResponseSchema}         from "./DataResponseSchema";

export const RpcResponseSchema = z.union([
    ErrorResponseSchema,
    DataResponseSchema,
]);
export type RpcResponseSchema<TDataSchema extends z.ZodSchema> = ReturnType<withRpcResponseSchema<TDataSchema>>;
export namespace RpcResponseSchema {
    export type Type<TDataSchema extends z.ZodSchema> = z.infer<RpcResponseSchema<TDataSchema>>;
}
