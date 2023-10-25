import {type ErrorMessage} from "../../api/ErrorMessage";
import {type NanSchema}    from "../../api/schema/NanSchema";
import {issuesOf}          from "../../utils/issuesOf";
import {withSchema}        from "../withSchema";

export function withNaN(error?: ErrorMessage): NanSchema {
    return withSchema({
        schema: "nan",
        _parse(input, info) {
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
    });
}
