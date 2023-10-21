import {
    merge,
    type PicoSchema,
    withObject
}                         from "@use-pico/schema";
import {RpcRequestSchema} from "../schema/RpcRequestSchema";

export const withRpcRequestSchema = <
    TDataSchema extends PicoSchema,
>(schema: TDataSchema) => {
    return merge([
        RpcRequestSchema,
        withObject({
            data: schema,
        }),
    ]);
};
export type withRpcRequestSchema<
    TDataSchema extends PicoSchema,
> = typeof withRpcRequestSchema<TDataSchema>;
