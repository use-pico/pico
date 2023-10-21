import {type Issue} from "../api/Issue";
import {type Pipe}  from "../api/Pipe";

export const issueOf = (
    info: Pipe.Info,
    issue: Pick<Issue, "validation" | "message" | "input" | "path">,
) => ({
    reason:         info?.reason,
    validation:     issue.validation,
    origin:         info?.origin || "value",
    message:        issue.message,
    input:          issue.input,
    path:           issue.path,
    abortEarly:     info?.abortEarly,
    abortPipeEarly: info?.abortPipeEarly,
    skipPipe:       info?.skipPipe,
});
