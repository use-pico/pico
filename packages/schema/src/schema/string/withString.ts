import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Pipe}         from "../../api/Pipe";
import {type StringSchema} from "../../api/schema/StringSchema";
import {argsOf}            from "../../utils/argsOf";
import {issuesOf}          from "../../utils/issuesOf";
import {pipeOf}            from "../../utils/pipeOf";

export function withString(pipe?: Pipe<string>): StringSchema;
export function withString(error?: ErrorMessage, pipe?: Pipe<string>): StringSchema;

export function withString(
    arg1?: ErrorMessage | Pipe<string>,
    arg2?: Pipe<string>,
): StringSchema {
    const [error, pipe] = argsOf(arg1, arg2);

    return {
        schema: "string",
        parse:  (input, info) => {
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
    };
}
