import {type Schema} from "../Schema";

export interface AnySchema<TOutput = any> extends Schema<any, TOutput> {
    schema: "any";
}
