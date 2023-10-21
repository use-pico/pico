import {type Issue} from "../api/Issue";
import {type Parse} from "../api/Parse";
import {type Pipe}  from "../api/Pipe";
import {issueOf}    from "./issueOf";
import {pipeInfoOf} from "./pipeInfoOf";

export const pipeOf = <TValue>(
    input: TValue,
    pipe: Pipe<TValue> | undefined,
    parseInfo: Parse.Info | undefined,
    reason: Issue.Reason,
): Parse.Result<TValue> => {
    if (!pipe || !pipe.length || parseInfo?.skipPipe) {
        return {output: input};
    }

    let pipeInfo: Pipe.Info | undefined;
    let issues: Issue.Issues | undefined;
    let output: TValue = input;

    for (const action of pipe) {
        const result = action(output);
        if (result.issues) {
            pipeInfo = pipeInfo || pipeInfoOf(parseInfo, reason);
            for (const issueInfo of result.issues) {
                const issue = issueOf(pipeInfo, issueInfo);
                issues ? issues.push(issue) : (issues = [issue]);
            }
            if (pipeInfo.abortEarly || pipeInfo.abortPipeEarly) {
                break;
            }
            continue;
        }
        output = result.output;
    }

    return issues ? {issues} : {output};
};
