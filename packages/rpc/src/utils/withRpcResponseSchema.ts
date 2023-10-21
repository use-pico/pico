import {ErrorResponseSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    withObject,
    withUnion
}                            from "@use-pico/schema";
import {DataResponseSchema}  from "../schema/DataResponseSchema";

export const withRpcResponseSchema = <
    TDataSchema extends PicoSchema,
>(schema: TDataSchema) => {
    return withUnion([
        merge([
            DataResponseSchema,
            withObject({
                data: schema,
            }),
        ]),
        ErrorResponseSchema,
    ]);
};
export type withRpcResponseSchema<
    TDataSchema extends PicoSchema,
> = typeof withRpcResponseSchema<TDataSchema>;
