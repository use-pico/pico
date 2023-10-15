import {z}                from "@pico/utils";
import {RpcRequestSchema} from "./RpcRequestSchema";

export const RpcBulkRequestSchema = z.object({
    bulk: z.record(RpcRequestSchema),
});
export namespace RpcBulkRequestSchema {
    export type Schema = typeof RpcBulkRequestSchema;
    export type Type = z.infer<Schema>;
}
