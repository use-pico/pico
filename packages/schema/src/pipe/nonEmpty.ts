import {type ErrorMessage} from "../api/ErrorMessage";
import {type Pipe}         from "../api/Pipe";
import {pipeIssuesOf}      from "../utils/pipeIssuesOf";

export const nonEmpty = <
    TInput extends string,
>(
    error?: ErrorMessage,
) => (input: TInput): Pipe.Result<TInput> => {
    const $input = input.trim();
    return !$input || $input.length === 0 ? pipeIssuesOf("minLength", error || "Non empty rule violation", input) : {output: input};
};
