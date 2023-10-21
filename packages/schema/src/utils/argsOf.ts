import {type ErrorMessage} from "../api/ErrorMessage";
import {type Pipe}         from "../api/Pipe";

export const argsOf = <TPipe extends Pipe<any>>(
    arg1: ErrorMessage | TPipe | undefined,
    arg2: TPipe | undefined,
): [ErrorMessage | undefined, TPipe | undefined] => Array.isArray(arg1) ? [undefined, arg1] : [arg1, arg2];
