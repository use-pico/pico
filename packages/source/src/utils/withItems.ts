import {type PicoSchema} from "@use-pico/schema";
import {
    generateId,
    mapSchema
}                        from "@use-pico/utils";

/**
 * Take a plain array of Items and return map with generated IDs
 */
export const withItems = <
    TSchema extends PicoSchema,
>(
    items: PicoSchema.Output<TSchema>[],
    schema: TSchema,
) => {
    return new Map(mapSchema(items, schema).map(item => {
        const id = generateId();
        return [id, {
            id,
            item,
        }];
    }));
};
