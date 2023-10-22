import {type ErrorMessage} from "../../api/ErrorMessage";
import {type NanSchema}    from "../../api/schema/NanSchema";
import {issuesOf}          from "../../utils/issuesOf";

export function withNaN(error?: ErrorMessage): NanSchema {
    return {
        schema: "nan",
        parse(input, info) {
            if (!Number.isNaN(input)) {
                return issuesOf(
                    info,
                    "type",
                    "nan",
                    error || "Given value is not NaN",
                    input
                );
            }

            return {output: input as number};
        },
        async parseAsync(input, info) {
            return this.parse(input, info);
        }
    };
}
