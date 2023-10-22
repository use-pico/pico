import {type Pipe}      from "../../api/Pipe";
import {type AnySchema} from "../../api/schema/AnySchema";
import {pipeOf}         from "../../utils/pipeOf";

export function withAny(pipe: Pipe<any> = []): AnySchema {
    return {
        schema: "any",
        _parse(input, info) {
            return pipeOf(input, pipe, info, "any");
        },
        async _parseAsync(input, info) {
            return this._parse(input, info);
        },
    };
}
