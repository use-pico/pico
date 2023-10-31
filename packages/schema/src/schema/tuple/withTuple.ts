import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Issue}        from "../../api/Issue";
import {type Pipe}         from "../../api/Pipe";
import {type TupleSchema}  from "../../api/schema/TupleSchema";
import {argsOf}            from "../../utils/argsOf";
import {issuesOf}          from "../../utils/issuesOf";
import {pipeOf}            from "../../utils/pipeOf";
import {withSchema}        from "../withSchema";

export function withTuple<
    TItems extends TupleSchema.Items,
>(
    items: TItems,
    arg1?: ErrorMessage | Pipe<TupleSchema.Output<TItems>>,
    arg2?: Pipe<TupleSchema.Output<TItems>>,
): TupleSchema<TItems> {
    const [error, pipe] = argsOf(arg1, arg2);

    return withSchema({
        schema: "tuple",
        items,
        _parse(input, info) {
            if (!Array.isArray(input)) {
                return issuesOf(
                    info,
                    "type",
                    "tuple",
                    error || "Tuple input is not an array",
                    input
                );
            } else if (items.length > input.length) {
                return issuesOf(
                    info,
                    "type",
                    "tuple",
                    error || "Number of input items is greater then number of tuples.",
                    input
                );
            }

            let issues: Issue.Issues | undefined;
            const output: any[] = [];

            for (let key = 0; key < items.length; key++) {
                const value = input[key];
                const result = items[key]?._parse(value, info);

                if (result?.issues) {
                    const pathItem: TupleSchema.PathItem = {
                        schema: "tuple",
                        input:  input as [any, ...any[]],
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
                output[key] = result?.output;
            }

            return issues
                ? {issues}
                : pipeOf(
                    output as TupleSchema.Output<TItems>,
                    pipe,
                    info,
                    "tuple"
                );
        },
    });
}
