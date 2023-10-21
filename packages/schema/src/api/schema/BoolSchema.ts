import {type PicoSchema} from "../PicoSchema";

export interface BoolSchema<TOutput = boolean> extends PicoSchema<boolean, TOutput> {
    schema: "bool";
}
