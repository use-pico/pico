import {
    parse$,
    type PicoSchema
} from "@use-pico/schema";

export const mapSchema = <
    TSchema extends PicoSchema,
>(
    items: PicoSchema.Output<TSchema>[],
    schema: TSchema,
) => {
    return items
        .map(item => parse$(schema, item))
        .filter((item): item is parse$.ResultSuccess<TSchema> => item.success)
        .map(item => item.data);
};
