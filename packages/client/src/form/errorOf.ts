import {type ValuesSchema} from "@use-pico2/common";
import type {FieldErrors}  from "react-hook-form";
import {z}                 from "zod";

export const errorOf = <
    TValuesSchema extends ValuesSchema
>(
    errors: FieldErrors<z.infer<TValuesSchema>>,
    name: string,
) => {
    return errors[name]?.message as string;
};
