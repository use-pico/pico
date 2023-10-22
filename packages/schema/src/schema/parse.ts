import {type PicoSchema} from "../api/PicoSchema";
import {ParseError}      from "./ParseError";

export const parse = <TSchema extends PicoSchema>(
    schema: TSchema,
    input: unknown,
    info?: Pick<PicoSchema.Parse.Info, "abortEarly" | "abortPipeEarly" | "skipPipe">
): PicoSchema.Output<TSchema> => {
    const result = schema._parse(input, info);
    if (result.issues) {
        throw new ParseError(result.issues);
    }
    return result.output;
};
