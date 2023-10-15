import {ErrorResponseSchema} from "@use-pico/query";
import {z}                   from "@use-pico/utils";
import {DataResponseSchema}  from "../schema/DataResponseSchema";

export const withRpcResponseSchema = <
    TDataSchema extends z.ZodSchema,
>(schema: TDataSchema) => {
    return z.union([
        DataResponseSchema.merge(z.object({
            data: schema,
        })),
        ErrorResponseSchema,
    ]);
};
export type withRpcResponseSchema<
    TDataSchema extends z.ZodSchema,
> = typeof withRpcResponseSchema<TDataSchema>;
