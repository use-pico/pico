import {type PicoSchema} from "../api/PicoSchema";
import {ParseError}      from "./ParseError";

export const parseAsync = async <TSchema extends PicoSchema>(
    schema: TSchema,
    input: unknown,
    info?: Pick<PicoSchema.Parse.Info, "abortEarly" | "abortPipeEarly" | "skipPipe">
): Promise<PicoSchema.Output<TSchema>> => {
    const result = await schema.parseAsync(input, info);
    if (result.issues) {
        throw new ParseError(result.issues);
    }
    return result.output;
};
