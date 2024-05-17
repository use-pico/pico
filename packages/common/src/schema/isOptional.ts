import {z}                from "zod";
import {isObjectSchema}   from "./isObjectSchema";
import {isOptionalSchema} from "./isOptionalSchema";

export const isOptional = <
    TSchema extends z.ZodType,
>(
    schema: TSchema,
    key: string | string[],
): boolean | undefined => {
    const $key = Array.isArray(key) ? key : key.split(".");
    const current = $key.shift();

    if (current && $key.length) {
        return isObjectSchema(schema) ? isOptional(schema.shape[current], $key) : undefined;
    } else if (current && isOptionalSchema(schema)) {
        const unwrapped = schema.unwrap();
        return isObjectSchema(unwrapped) ? isOptional(unwrapped.shape[current], $key) : unwrapped.isOptional();
    }
    return schema.isOptional();
};
