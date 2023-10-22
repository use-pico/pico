import {type PicoSchema} from "../api/PicoSchema";

export type RequestSchema = PicoSchema;
export namespace RequestSchema {
    export type Type = PicoSchema.Output<RequestSchema>;
}
