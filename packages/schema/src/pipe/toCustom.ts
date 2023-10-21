import {type Pipe} from "../api/Pipe";

export const toCustom = <
    TInput,
>(
    action: (input: TInput) => TInput,
) => {
    return (input: TInput): Pipe.Result<TInput> => ({output: action(input)});
};
