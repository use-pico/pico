import {type z} from "zod";
import {jsonOf} from "./jsonOf";

export const safeJsonOf = <const TSchema extends z.ZodType>(schema: TSchema, json: string | null | undefined) => {
    try {
        return jsonOf(schema, json);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
};
