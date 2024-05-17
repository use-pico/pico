import {type z}    from "zod";
import {debug}     from "../toolbox/debug";
import {parseJson} from "./parseJson";

export const parseJson$ = <
    const TSchema extends z.ZodSchema
>(
    schema: TSchema,
    json: string | null | undefined,
) => {
    try {
        return parseJson(schema, json);
    } catch (e) {
        debug(e);
        return undefined;
    }
};
