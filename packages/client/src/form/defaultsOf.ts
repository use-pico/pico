import {
    cleanOf,
    isCallable,
    ValuesSchema
}                     from "@use-pico2/common";
import {type z}       from "zod";
import {type useForm} from "./useForm";

export namespace defaultsOf {
    export interface Props<
        TValuesSchema extends ValuesSchema,
    > {
        defaults?: useForm.Defaults<TValuesSchema>;
        values?: useForm.Values<TValuesSchema>;
    }
}

export const defaultsOf = async <
    TValuesSchema extends ValuesSchema,
>(
    {
        defaults,
        values,
    }: defaultsOf.Props<TValuesSchema>,
): Promise<z.infer<TValuesSchema>> => {
    const $defaults = isCallable(defaults) ? await defaults() : defaults;
    const $values = isCallable(values) ? await values() : values;

    return {
        ...$defaults,
        ...cleanOf($values, {
            nullCleaner: true,
        })
    };
};
