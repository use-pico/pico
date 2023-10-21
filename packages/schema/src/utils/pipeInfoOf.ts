import {type Issue}      from "../api/Issue";
import {type PicoSchema} from "../api/PicoSchema";

export const pipeInfoOf = (
    info: PicoSchema.Parse.Info | undefined,
    reason: Issue.Reason,
) => ({
    reason,
    origin:         info?.origin,
    abortEarly:     info?.abortEarly,
    abortPipeEarly: info?.abortPipeEarly,
    skipPipe:       info?.skipPipe,
});
