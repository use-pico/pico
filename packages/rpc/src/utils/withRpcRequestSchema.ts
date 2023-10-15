import {z}                from "@pico/utils";
import {RpcRequestSchema} from "../schema/RpcRequestSchema";

export const withRpcRequestSchema = <
    TDataSchema extends z.ZodSchema,
>(schema: TDataSchema) => {
    return RpcRequestSchema.merge(z.object({
        data: schema,
    }));
};
export type withRpcRequestSchema<
    TDataSchema extends z.ZodSchema,
> = typeof withRpcRequestSchema<TDataSchema>;
