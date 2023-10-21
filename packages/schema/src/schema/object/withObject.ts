import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Issue}        from "../../api/Issue";
import {type PicoSchema}   from "../../api/PicoSchema";
import {type Pipe}         from "../../api/Pipe";
import {type ObjectSchema} from "../../api/schema/ObjectSchema";
import {argsOf}            from "../../utils/argsOf";
import {issuesOf}          from "../../utils/issuesOf";
import {pipeOf}            from "../../utils/pipeOf";

export function withObject<
    TShape extends ObjectSchema.Shape,
>(
    shape: TShape,
    error?: ErrorMessage,
    pipe?: Pipe<ObjectSchema.Output<TShape>>
): ObjectSchema<TShape>;

export function withObject<
    TShape extends ObjectSchema.Shape,
>(
    shape: TShape,
    pipe?: Pipe<ObjectSchema.Output<TShape>>
): ObjectSchema<TShape>;

export function withObject<
    TShape extends ObjectSchema.Shape,
>(
    shape: TShape,
    arg2?:
        | Pipe<ObjectSchema.Output<TShape>>
        | ErrorMessage,
    arg3?: Pipe<ObjectSchema.Output<TShape>>
): ObjectSchema<TShape> {
    const [error, pipe] = argsOf(arg2, arg3);

    let cache: [string, PicoSchema<any>][];

    return {
        schema: "object",
        object: {
            shape,
        },
        parse:  (input, info) => {
            if (!input || typeof input !== "object") {
                return issuesOf(
                    info,
                    "type",
                    "object",
                    error || "Given type is not an object",
                    input
                );
            }

            cache = cache || Object.entries(shape);

            let issues: Issue.Issues | undefined;
            const output: Record<string, any> = {};

            for (const [key, schema] of cache) {
                /**
                 * Type cast is safe here as we already know an input is an object.
                 */
                const value = (input as Record<string, unknown>)[key];
                const result = schema.parse(value, info);

                if (result.issues) {
                    const pathItem: ObjectSchema.PathItem = {
                        schema: "object",
                        input,
                        key,
                        value,
                    };

                    for (const issue of result.issues) {
                        issue.path ? issue.path.unshift(pathItem) : (issue.path = [pathItem]);
                        issues?.push(issue);
                    }

                    /**
                     * This looks strange, but an idea is to collect issues from other schemas. If this were
                     * before the for loop, it would put issues into self, thus duplicating them.
                     */
                    !issues && (issues = result.issues);

                    if (info?.abortEarly) {
                        break;
                    }
                } else if (result.output !== undefined || key in input) {
                    output[key] = result.output;
                }
            }

            return issues ? {issues} : pipeOf(output as ObjectSchema.Output<TShape>, pipe, info, "object");
        },
    };
}
