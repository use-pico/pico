import {
    cleanOf,
    type z
}                          from "@use-pico/utils";
import {type ValuesSchema} from "../schema/ValuesSchema";

export const defaultsOf = <
    TValuesSchema extends ValuesSchema,
>(
    input: Partial<z.infer<TValuesSchema>> | null | undefined,
    defaults: z.infer<TValuesSchema>,
): z.infer<TValuesSchema> => {
    return {
        ...defaults,
        ...cleanOf(input, {
            nullCleaner: true,
        })
    };
};
