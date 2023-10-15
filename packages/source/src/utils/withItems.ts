import {
    generateId,
    mapSchema,
    type z
} from "@pico/utils";

/**
 * Take a plain array of Items and return map with generated IDs
 */
export const withItems = <TSchema extends z.ZodSchema>(items: z.infer<TSchema>[], schema: TSchema) => {
    return new Map(mapSchema(items, schema).map(item => {
        const id = generateId();
        return [id, {
            id,
            item,
        }];
    }));
};
