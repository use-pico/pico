import {type Issue} from "../api/Issue";
import {type Parse} from "../api/Parse";

export const pipeInfoOf = (
    info: Parse.Info | undefined,
    reason: Issue.Reason,
) => ({
    reason,
    origin:         info?.origin,
    abortEarly:     info?.abortEarly,
    abortPipeEarly: info?.abortPipeEarly,
    skipPipe:       info?.skipPipe,
});
