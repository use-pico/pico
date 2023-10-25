import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Pipe}         from "../../api/Pipe";
import {type NumberSchema} from "../../api/schema/NumberSchema";
import {argsOf}            from "../../utils/argsOf";
import {issuesOf}          from "../../utils/issuesOf";
import {pipeOf}            from "../../utils/pipeOf";
import {withNullish}       from "../nullish/withNullish";
import {withOptional}      from "../optional/withOptional";
import {withSchema}        from "../withSchema";

export function withNumber(pipe?: Pipe<number>): NumberSchema;
export function withNumber(error?: ErrorMessage, pipe?: Pipe<number>): NumberSchema;

export function withNumber(
    arg1?: ErrorMessage | Pipe<number>,
    arg2?: Pipe<number>,
): NumberSchema {
    const [error, pipe] = argsOf(arg1, arg2);

    return withSchema({
        schema: "number",
        _parse(input, info) {
            if (typeof input !== "number" || isNaN(input)) {
                return issuesOf(
                    info,
                    "type",
                    "number",
                    error || "Given type is not a number.",
                    input
                );
            }

            return pipeOf(
                input,
                pipe,
                info,
                "number"
            );
        },
        nullish() {
            return withNullish(withNumber(error, pipe));
        },
        optional() {
            return withOptional(withNumber(error, pipe));
        },
    });
}
