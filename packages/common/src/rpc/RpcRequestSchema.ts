import {z} from "zod";

export const RpcRequestSchema = z.object({
    service: z.string(),
    data:    z.any().optional(),
});
export type RpcRequestSchema = typeof RpcRequestSchema;
export namespace RpcRequestSchema {
    export type Type = z.infer<RpcRequestSchema>;
}
