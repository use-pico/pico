import {type Parse}  from "../api/Parse";
import {type Schema} from "../api/Schema";
import {ParseError}  from "./ParseError";

export const parse = <TSchema extends Schema>(
    schema: TSchema,
    input: unknown,
    info?: Pick<Parse.Info, "abortEarly" | "abortPipeEarly" | "skipPipe">
): Schema.Infer<TSchema> => {
    const result = schema.parse(input, info);
    if (result.issues) {
        throw new ParseError(result.issues);
    }
    return result.output;
};
