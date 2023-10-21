import {
    type PicoSchema,
    withObject,
    withRecord
}                          from "@use-pico/schema";
import {RpcResponseSchema} from "./RpcResponseSchema";

export const RpcBulkResponseSchema = withObject({
    bulk: withRecord(RpcResponseSchema),
});
export type RpcBulkResponseSchema = typeof RpcBulkResponseSchema;
export namespace RpcBulkResponseSchema {
    export type Type = PicoSchema.Output<RpcBulkResponseSchema>;
}
