import {
    type PicoSchema,
    schema
}                          from "@use-pico/schema";
import {RpcResponseSchema} from "./RpcResponseSchema";

export const RpcBulkResponseSchema = schema(z => z.object({
    bulk: z.record(RpcResponseSchema),
}));
export type RpcBulkResponseSchema = typeof RpcBulkResponseSchema;
export namespace RpcBulkResponseSchema {
    export type Type = PicoSchema.Output<RpcBulkResponseSchema>;
}
