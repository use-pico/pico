import {type z}            from "@pico/utils";
import {RpcResponseSchema} from "../schema/RpcResponseSchema";
import {isData}            from "./isData";

export namespace resultOf {
    export interface Props<
        TSchema extends z.ZodSchema,
    > {
        schema: TSchema;
        response: any;
    }
}

export const resultOf = <
    TSchema extends z.ZodSchema,
>(
    {
        schema,
        response,
    }: resultOf.Props<TSchema>
) => {
    const $response = RpcResponseSchema.safeParse(response);
    if ($response.success && isData($response.data)) {
        const result = schema.safeParse($response.data.data);
        if (result.success) {
            return result.data;
        }
    }
    return null;
};
