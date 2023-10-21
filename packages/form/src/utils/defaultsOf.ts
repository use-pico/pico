import {type PicoSchema}   from "@use-pico/schema";
import {cleanOf}           from "@use-pico/utils";
import {type ValuesSchema} from "../schema/ValuesSchema";

export const defaultsOf = <
    TValuesSchema extends ValuesSchema,
>(
    input: Partial<PicoSchema.Output<TValuesSchema>> | null | undefined,
    defaults: PicoSchema.Output<TValuesSchema>,
): PicoSchema.Output<TValuesSchema> => {
    return {
        ...defaults,
        ...cleanOf(input, {
            nullCleaner: true,
        })
    };
};
