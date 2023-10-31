import {
    parse$,
    type PicoSchema
}                          from "@use-pico/schema";
import {RpcResponseSchema} from "../schema/RpcResponseSchema";
import {isData}            from "./isData";

export namespace resultOf {
    export interface Props<
        TSchema extends PicoSchema,
    > {
        schema: TSchema;
        response: any;
    }
}

export const resultOf = <
    TSchema extends PicoSchema,
>(
    {
        schema,
        response,
    }: resultOf.Props<TSchema>
) => {
    const $response = parse$(RpcResponseSchema, response);
    if ($response.success && isData($response.data)) {
        const result = parse$(schema, $response.data.data);
        if (result.success) {
            return result.data;
        }
    }
    return null;
};
