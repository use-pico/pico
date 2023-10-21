import {type Schema} from "../Schema";

export interface NullSchema<TOutput = null> extends Schema<null, TOutput> {
    schema: "null";
}
