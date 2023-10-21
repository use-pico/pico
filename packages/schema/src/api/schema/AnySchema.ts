import {type PicoSchema} from "../PicoSchema";

export interface AnySchema<TOutput = any> extends PicoSchema<any, TOutput> {
    schema: "any";
}
