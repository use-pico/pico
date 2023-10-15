import {
    safeJsonOf,
    type z
}                  from "@use-pico/utils";
import {useParam$} from "./useParam$";

export const useJsonParam$ = <
    TSchema extends z.ZodSchema,
>(schema: TSchema, name: string): z.infer<TSchema> => {
    return safeJsonOf(schema, useParam$(name));
};
