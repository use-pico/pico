import {type ErrorMessage} from "../api/ErrorMessage";
import {type Pipe}         from "../api/Pipe";
import {pipeIssuesOf}      from "../utils/pipeIssuesOf";

export function minValue<
    TInput extends string | number | bigint | Date,
    TRequirement extends TInput,
>(
    value: TRequirement,
    error?: ErrorMessage
) {
    return (input: TInput): Pipe.Result<TInput> =>
        input < value
            ? pipeIssuesOf("minValue", error || "Minimum value rule violation", input)
            : {output: input};
}
