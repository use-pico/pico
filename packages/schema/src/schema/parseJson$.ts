import {type PicoSchema} from "../api/PicoSchema";
import {parseJson}       from "./parseJson";

export const parseJson$ = <
    const TSchema extends PicoSchema,
>(
    schema: TSchema,
    json: string | null | undefined
) => {
    try {
        return parseJson(schema, json);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
};
