import {type PicoSchema} from "@use-pico/schema";
import {jsonOf}          from "./jsonOf";

export const safeJsonOf = <
    const TSchema extends PicoSchema,
>(
    schema: TSchema,
    json: string | null | undefined
) => {
    try {
        return jsonOf(schema, json);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
};
