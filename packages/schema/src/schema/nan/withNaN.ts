import {type ErrorMessage} from "../../api/ErrorMessage";
import {type NanSchema}    from "../../api/schema/NanSchema";
import {issuesOf}          from "../../utils/issuesOf";

export function withNaN(error?: ErrorMessage): NanSchema {
    return {
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
        async _parseAsync(input, info) {
            return this._parse(input, info);
        }
    };
}