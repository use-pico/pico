import {z} from "zod";
import {RpcRequestSchema} from "./RpcRequestSchema";

export const RpcBulkRequestSchema = z.object({
	bulk: z.record(RpcRequestSchema),
});
export type RpcBulkRequestSchema = typeof RpcBulkRequestSchema;
export namespace RpcBulkRequestSchema {
	export type Type = z.infer<RpcBulkRequestSchema>;
}
