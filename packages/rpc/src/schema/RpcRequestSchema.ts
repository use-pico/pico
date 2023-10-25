import {
    type PicoSchema,
    schema
}                                  from "@use-pico/schema";
import {type withRpcRequestSchema} from "../utils/withRpcRequestSchema";

export const RpcRequestSchema = schema(z => z.object({
    service: z.string(),
    data:    z.any().nullish(),
}));
export type RpcRequestSchema<TDataSchema extends PicoSchema> = ReturnType<withRpcRequestSchema<TDataSchema>>;
export namespace RpcRequestSchema {
    export type Type<TDataSchema extends PicoSchema> = PicoSchema.Output<RpcRequestSchema<TDataSchema>>;
}
