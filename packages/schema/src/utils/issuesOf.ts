import {type ErrorMessage} from "../api/ErrorMessage";
import {type Issue}        from "../api/Issue";
import {type PicoSchema}   from "../api/PicoSchema";
import {errorOf}           from "./errorOf";

export const issuesOf = (
    info: PicoSchema.Parse.Info | undefined,
    reason: Issue.Reason,
    validation: string,
    error: ErrorMessage,
    input: unknown,
    issues?: Issue.Issues
): {
    issues: Issue.Issues
} => ({
    issues: [
        {
            reason,
            validation,
            origin:         info?.origin || "value",
            message:        errorOf(error),
            input,
            issues,
            abortEarly:     info?.abortEarly,
            abortPipeEarly: info?.abortPipeEarly,
            skipPipe:       info?.skipPipe,
        },
    ],
});
