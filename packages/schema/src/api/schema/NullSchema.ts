import {type PicoSchema} from "../PicoSchema";

export interface NullSchema<TOutput = null> extends PicoSchema<null, TOutput> {
    schema: "null";
}
