import {type PicoSchema} from "@use-pico/schema";
import {safeJsonOf}      from "@use-pico/utils";
import {useParam$}       from "./useParam$";

export const useJsonParam$ = <
    TSchema extends PicoSchema,
>(schema: TSchema, name: string): PicoSchema.Output<TSchema> => {
    return safeJsonOf(schema, useParam$(name));
};
