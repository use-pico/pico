import {
    type PicoSchema,
    withAny,
    withNullish,
    withObject,
    withString
}                                  from "@use-pico/schema";
import {type withRpcRequestSchema} from "../utils/withRpcRequestSchema";

export const RpcRequestSchema = withObject({
    service: withString(),
    data: withNullish(withAny()),
});
export type RpcRequestSchema<TDataSchema extends PicoSchema> = ReturnType<withRpcRequestSchema<TDataSchema>>;
export namespace RpcRequestSchema {
    export type Type<TDataSchema extends PicoSchema> = PicoSchema.Output<RpcRequestSchema<TDataSchema>>;
}
