import {type ErrorMessage} from "../../api/ErrorMessage";
import {type Issue}        from "../../api/Issue";
import {type PicoSchema}   from "../../api/PicoSchema";
import {type UnionSchema}  from "../../api/schema/UnionSchema";
import {issuesOf}          from "../../utils/issuesOf";

export function withUnion<
    TOptions extends UnionSchema.Options,
>(
    union: TOptions,
    error?: ErrorMessage,
): UnionSchema<TOptions> {
    return {
        schema: "union",
        union,
        parse:  (input, info) => {
            let issues: Issue.Issues | undefined;
            let output: [PicoSchema.Output<TOptions[number]>] | undefined;

            for (const schema of union) {
                const result = schema.parse(input, info);

                if (result.issues) {
                    if (issues) {
                        for (const issue of result.issues) {
                            issues.push(issue);
                        }
                    } else {
                        issues = result.issues;
                    }

                    continue;
                }

                output = [result.output];
                break;
            }

            return output
                ? {output: output[0]}
                : issuesOf(
                    info,
                    "type",
                    "union",
                    error || "Given type is not an valid union",
                    input,
                    issues
                );
        },
    };
}
