import {type PicoSchema} from "../api/PicoSchema";

export type ResponseSchema = PicoSchema;
export namespace ResponseSchema {
    export type Type = PicoSchema.Output<ResponseSchema>;
}
