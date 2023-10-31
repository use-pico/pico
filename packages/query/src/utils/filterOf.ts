import {
    merge,
    type ObjectSchema,
    schema
}                     from "@use-pico/schema";
import {FilterSchema} from "../schema/FilterSchema";

export namespace filterOf {
    export type Props<
        TFilterSchema extends ObjectSchema<any>,
    > = (factory: schema.Schema) => TFilterSchema;
}

export const filterOf = <
    TFilterSchema extends ObjectSchema<any>,
>(
    factory: filterOf.Props<TFilterSchema>,
) => {
    return merge([
        FilterSchema,
        schema(factory),
    ]);
};
