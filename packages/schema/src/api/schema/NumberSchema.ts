import {type PicoSchema} from "../PicoSchema";

export interface NumberSchema<TOutput = number> extends PicoSchema<number, TOutput> {
    schema: "number";
}
