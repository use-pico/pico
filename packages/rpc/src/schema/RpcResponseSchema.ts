import {
    ErrorSchema,
    type PicoSchema,
    schema
}                           from "@use-pico/schema";
import {DataResponseSchema} from "./DataResponseSchema";

export const RpcResponseSchema = schema(z => z.union([
    ErrorSchema,
    DataResponseSchema,
]));
export type RpcResponseSchema = typeof RpcResponseSchema;
export namespace RpcResponseSchema {
    export type Type = PicoSchema.Output<RpcResponseSchema>;
}
