import {type Parse}      from "../api/Parse";
import {type PicoSchema} from "../api/PicoSchema";
import {ParseError}      from "./ParseError";

export const parse = <TSchema extends PicoSchema>(
    schema: TSchema,
    input: unknown,
    info?: Pick<Parse.Info, "abortEarly" | "abortPipeEarly" | "skipPipe">
): PicoSchema.Output<TSchema> => {
    const result = schema.parse(input, info);
    if (result.issues) {
        throw new ParseError(result.issues);
    }
    return result.output;
};
