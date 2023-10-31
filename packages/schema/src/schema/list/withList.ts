import {type ErrorMessage} from "../../api/ErrorMessage";
import {type ListSchema}   from "../../api/schema/ListSchema";
import {issuesOf}          from "../../utils/issuesOf";
import {withSchema}        from "../withSchema";

export function withList<
    TValue extends string,
    TValues extends ListSchema.Values<TValue>
>(
    values: TValues,
    error?: ErrorMessage
): ListSchema<TValues> {
    return withSchema({
        schema: "list",
        values,
        _parse(input, info) {
            if (!values.includes(input as any)) {
                return issuesOf(
                    info,
                    "type",
                    "list",
                    error || "Given value is not in the allowed list",
                    input
                );
            }

            return {
                output: input as TValues[number],
            };
        },
    });
}
