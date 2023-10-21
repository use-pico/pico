import {
    type PicoSchema,
    withObject,
    withRecord
}                         from "@use-pico/schema";
import {RpcRequestSchema} from "./RpcRequestSchema";

export const RpcBulkRequestSchema = withObject({
    bulk: withRecord(RpcRequestSchema),
});
export type RpcBulkRequestSchema = typeof RpcBulkRequestSchema;
export namespace RpcBulkRequestSchema {
    export type Type = PicoSchema.Output<RpcBulkRequestSchema>;
}
