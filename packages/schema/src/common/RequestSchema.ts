import {type PicoSchema}   from "../api/PicoSchema";
import {type ObjectSchema} from "../api/schema/ObjectSchema";

export type RequestSchema = ObjectSchema<ObjectSchema.Shape>;
export namespace RequestSchema {
    export type Type = PicoSchema.Output<RequestSchema>;
}
