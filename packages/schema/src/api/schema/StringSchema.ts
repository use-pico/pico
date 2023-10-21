import {type Schema} from "../Schema";

export interface StringSchema<TOutput = string> extends Schema<string, TOutput> {
    schema: "string";
}
