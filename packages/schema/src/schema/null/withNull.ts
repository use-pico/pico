import {type ErrorMessage} from "../../api/ErrorMessage";
import {type NullSchema}   from "../../api/schema/NullSchema";
import {issuesOf}          from "../../utils/issuesOf";

export function withNull(
    error?: ErrorMessage,
): NullSchema {
    return {
        schema: "null",
        _parse(input, info) {
            if (input !== null) {
                return issuesOf(
                    info,
                    "type",
                    "null",
                    error || "Input is not null value.",
                    input
                );
            }

            return {output: input};
        },
        async _parseAsync(input, info) {
            return this._parse(input, info);
        },
    };
}
