import {type ErrorMessage} from "../api/ErrorMessage";
import {type Pipe}         from "../api/Pipe";
import {pipeIssuesOf}      from "../utils/pipeIssuesOf";

export const minLength = <
    TInput extends string | any[],
>(
    length: number,
    error?: ErrorMessage,
) => (input: TInput): Pipe.Result<TInput> => input.length < length ? pipeIssuesOf("minLength", error || "Minimum length rule violation", input) : {output: input};
