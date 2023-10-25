import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Pipe}         from "../../api/Pipe";
import {type StringSchema} from "../../api/schema/StringSchema";
import {argsOf}            from "../../utils/argsOf";
import {issuesOf}          from "../../utils/issuesOf";
import {pipeOf}            from "../../utils/pipeOf";
import {withNullish}       from "../nullish/withNullish";
import {withOptional}      from "../optional/withOptional";
import {withSchema}        from "../withSchema";

export function withString(pipe?: Pipe<string>): StringSchema;
export function withString(error?: ErrorMessage, pipe?: Pipe<string>): StringSchema;

export function withString(
    arg1?: ErrorMessage | Pipe<string>,
    arg2?: Pipe<string>,
): StringSchema {
    const [error, pipe] = argsOf(arg1, arg2);

    return withSchema({
        schema: "string",
        _parse(input, info) {
            if (typeof input !== "string") {
                return issuesOf(
                    info,
                    "type",
                    "string",
                    error || "Given type is not a string.",
                    input
                );
            }

            return pipeOf(
                input,
                pipe,
                info,
                "string"
            );
        },
        nullish() {
            return withNullish(withString(error, pipe));
        },
        optional() {
            return withOptional(withString(error, pipe));
        },
    });
}
