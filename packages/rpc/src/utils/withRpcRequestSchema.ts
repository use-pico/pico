import {
    merge,
    type PicoSchema,
    s
}                         from "@use-pico/schema";
import {RpcRequestSchema} from "../schema/RpcRequestSchema";

export const withRpcRequestSchema = <
    TDataSchema extends PicoSchema,
>(
    schema: TDataSchema
) => {
    return merge([
        RpcRequestSchema,
        s(z => z.object({
            data: schema,
        })),
    ]);
};

export type withRpcRequestSchema<
    TDataSchema extends PicoSchema,
> = typeof withRpcRequestSchema<TDataSchema>;
