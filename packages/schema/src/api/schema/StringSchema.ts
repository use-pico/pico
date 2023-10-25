import {type ErrorMessage}   from "../ErrorMessage";
import {type PicoSchema}     from "../PicoSchema";
import {type NullishSchema}  from "./NullishSchema";
import {type OptionalSchema} from "./OptionalSchema";

export interface StringSchema<TOutput = string> extends PicoSchema<string, TOutput> {
    schema: "string";

    nullish(): NullishSchema<this>;

    optional(): OptionalSchema<this>;

    nonEmpty(error?: ErrorMessage): this;
}
