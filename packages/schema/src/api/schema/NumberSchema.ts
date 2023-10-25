import {type PicoSchema}     from "../PicoSchema";
import {type NullishSchema}  from "./NullishSchema";
import {type OptionalSchema} from "./OptionalSchema";

export interface NumberSchema<TOutput = number> extends PicoSchema<number, TOutput> {
    schema: "number";

    nullish(): NullishSchema<this>;

    optional(): OptionalSchema<this>;
}
