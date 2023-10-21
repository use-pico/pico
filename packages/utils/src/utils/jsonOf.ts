import {
    parse,
    type PicoSchema
} from "@use-pico/schema";

export const jsonOf = <
    const TSchema extends PicoSchema,
>(
    schema: TSchema,
    json: string | null | undefined,
) => {
    if (json === null) {
        return parse(schema, null);
    } else if (json === undefined) {
        return parse(schema, undefined);
    }
    return parse(schema, JSON.parse(json));
};
