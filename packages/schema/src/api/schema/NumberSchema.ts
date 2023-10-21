import {type Schema} from "../Schema";

export interface NumberSchema<TOutput = number> extends Schema<number, TOutput> {
    schema: "number";
}
