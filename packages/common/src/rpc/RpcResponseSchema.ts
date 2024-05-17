import {z}                  from "zod";
import {ErrorSchema}        from "../schema/ErrorSchema";
import {DataResponseSchema} from "./DataResponseSchema";

export const RpcResponseSchema = z.union([
    ErrorSchema,
    DataResponseSchema
]);
export type RpcResponseSchema = typeof RpcResponseSchema;
export namespace RpcResponseSchema {
    export type Type = z.infer<RpcResponseSchema>;
}
