import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Pipe}         from "../../api/Pipe";
import {type BoolSchema}   from "../../api/schema/BoolSchema";
import {argsOf}            from "../../utils/argsOf";
import {issuesOf}          from "../../utils/issuesOf";
import {pipeOf}            from "../../utils/pipeOf";
import {withNullish}       from "../nullish/withNullish";
import {withOptional}      from "../optional/withOptional";
import {withSchema}        from "../withSchema";

export function withBool(
    pipe?: Pipe<boolean>,
): BoolSchema;

export function withBool(
    error?: ErrorMessage,
    pipe?: Pipe<boolean>,
): BoolSchema

export function withBool(
    arg1?: ErrorMessage | Pipe<boolean>,
    arg2?: Pipe<boolean>
): BoolSchema {
    const [error, pipe] = argsOf(arg1, arg2);

    return withSchema({
        schema: "bool",
        _parse(input, info) {
            if (typeof input !== "boolean") {
                return issuesOf(
                    info,
                    "type",
                    "boolean",
                    error || "Given type is not a boolean",
                    input
                );
            }

            return pipeOf(input, pipe, info, "boolean");
        },
        nullish() {
            return withNullish(withBool(error, pipe));
        },
        optional() {
            return withOptional(withBool(error, pipe));
        },
    });
}
