import {z}                         from "@use-pico/utils";
import {type withRpcRequestSchema} from "../utils/withRpcRequestSchema";

export const RpcRequestSchema = z.object({
    service: z.string(),
    data:    z.any(),
});
export namespace RpcRequestSchema {
    export type Schema<TDataSchema extends z.ZodSchema> = ReturnType<withRpcRequestSchema<TDataSchema>>;
    export type Type<TDataSchema extends z.ZodSchema> = z.infer<Schema<TDataSchema>>;
}
