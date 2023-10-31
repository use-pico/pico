import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const RpcRequestSchema = schema(z => z.object({
    service: z.string,
    data:    z.any$,
}));
export type RpcRequestSchema = typeof RpcRequestSchema;
export namespace RpcRequestSchema {
    export type Type = PicoSchema.Output<RpcRequestSchema>;
}
