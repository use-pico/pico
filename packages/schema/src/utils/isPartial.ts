import {type ObjectSchema} from "../api/schema/ObjectSchema";

export const isPartial = <
    TSchema extends ObjectSchema<any>,
>(
    schema: TSchema,
    key: keyof TSchema["shape"],
): boolean | undefined => {
    if (schema && "shape" in schema && "partial" in schema.shape[key]) {
        return schema.shape[key].partial;
    }
    return undefined;
};
