import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Issue}        from "../../api/Issue";
import {type PicoSchema}   from "../../api/PicoSchema";
import {type Pipe}         from "../../api/Pipe";
import {type ArraySchema}  from "../../api/schema/ArraySchema";
import {argsOf}            from "../../utils/argsOf";
import {issuesOf}          from "../../utils/issuesOf";
import {pipeOf}            from "../../utils/pipeOf";

export function withArray<
    TItem extends PicoSchema,
>(
    item: TItem,
    arg2?: ErrorMessage | Pipe<PicoSchema.Output<TItem>[]>,
    arg3?: Pipe<PicoSchema.Output<TItem>[]>,
): ArraySchema<TItem> {
    const [error, pipe] = argsOf(arg2, arg3);

    return {
        schema: "array",
        array:  {
            item,
        },
        _parse(input, info) {
            if (!Array.isArray(input)) {
                return issuesOf(
                    info,
                    "type",
                    "array",
                    error || "Given value is not an array",
                    input
                );
            }

            let issues: Issue.Issues | undefined;
            const output: any[] = [];

            for (let key = 0; key < input.length; key++) {
                const value = input[key];
                const result = item._parse(value, info);

                if (result.issues) {
                    const pathItem: ArraySchema.PathItem = {
                        schema: "array",
                        input,
                        key,
                        value,
                    };

                    for (const issue of result.issues) {
                        if (issue.path) {
                            issue.path.unshift(pathItem);
                        } else {
                            issue.path = [pathItem];
                        }
                        issues?.push(issue);
                    }

                    !issues && (issues = result.issues);

                    if (info?.abortEarly) {
                        break;
                    }
                    continue;
                }

                output.push(result.output);
            }

            return issues
                ? {issues}
                : pipeOf(output as PicoSchema.Output<TItem>[], pipe, info, "array");
        },
        async _parseAsync(input, info) {
            return this._parse(input, info);
        },
    };
}
