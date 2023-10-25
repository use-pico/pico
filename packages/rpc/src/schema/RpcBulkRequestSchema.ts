import {
    type PicoSchema,
    schema
}                         from "@use-pico/schema";
import {RpcRequestSchema} from "./RpcRequestSchema";

export const RpcBulkRequestSchema = schema(z => z.object({
    bulk: z.record(RpcRequestSchema),
}));
export type RpcBulkRequestSchema = typeof RpcBulkRequestSchema;
export namespace RpcBulkRequestSchema {
    export type Type = PicoSchema.Output<RpcBulkRequestSchema>;
}
