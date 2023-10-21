import {type PicoSchema} from "../PicoSchema";

export interface StringSchema<TOutput = string> extends PicoSchema<string, TOutput> {
    schema: "string";
}
