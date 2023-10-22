import {type PicoSchema} from "../PicoSchema";

export interface NanSchema<TOutput = number> extends PicoSchema<number, TOutput> {
    schema: "nan";
}
