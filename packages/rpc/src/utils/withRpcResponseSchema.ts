import {ErrorResponseSchema} from "@use-pico/query";
import {
    merge,
    type PicoSchema,
    s
}                            from "@use-pico/schema";
import {DataResponseSchema}  from "../schema/DataResponseSchema";

export const withRpcResponseSchema = <
    TDataSchema extends PicoSchema,
>(schema: TDataSchema) => {
    return s(z => z.union([
        merge([
            DataResponseSchema,
            z.object({
                data: schema,
            }),
        ]),
        ErrorResponseSchema,
    ]));
};
export type withRpcResponseSchema<
    TDataSchema extends PicoSchema,
> = typeof withRpcResponseSchema<TDataSchema>;
