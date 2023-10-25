import {type Pipe}      from "../../api/Pipe";
import {type AnySchema} from "../../api/schema/AnySchema";
import {pipeOf}         from "../../utils/pipeOf";
import {withSchema}     from "../withSchema";

export function withAny(pipe: Pipe<any> = []): AnySchema {
    return withSchema({
        schema: "any",
        _parse(input, info) {
            return pipeOf(input, pipe, info, "any");
        },
    });
}
