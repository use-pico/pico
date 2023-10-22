import {type PicoSchema} from "../api/PicoSchema";
import {parse}           from "./parse";

export const parseJson = <
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
