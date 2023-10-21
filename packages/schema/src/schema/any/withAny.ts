import {type Pipe}      from "../../api/Pipe";
import {type AnySchema} from "../../api/schema/AnySchema";
import {pipeOf}         from "../../utils/pipeOf";

export function withAny(pipe: Pipe<any> = []): AnySchema {
    return {
        schema: "any",

        parse(input, info) {
            return pipeOf(input, pipe, info, "any");
        },
        async parseAsync(input, info) {
            return this.parse(input, info);
        },
    };
}
