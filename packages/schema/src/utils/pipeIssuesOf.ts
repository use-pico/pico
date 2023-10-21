import {type ErrorMessage} from "../api/ErrorMessage";
import {type Issue}        from "../api/Issue";
import {errorOf}           from "./errorOf";

export const pipeIssuesOf = (
    validation: string,
    error: ErrorMessage,
    input: unknown,
): {
    issues: Pick<Issue, "validation" | "message" | "input" | "path">[]
} => ({
    issues: [
        {
            validation,
            message: errorOf(error),
            input,
        }
    ],
});
