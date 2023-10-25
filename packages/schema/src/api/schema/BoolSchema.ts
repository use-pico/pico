import {type PicoSchema}     from "../PicoSchema";
import {type NullishSchema}  from "./NullishSchema";
import {type OptionalSchema} from "./OptionalSchema";

export interface BoolSchema<TOutput = boolean> extends PicoSchema<boolean, TOutput> {
    schema: "bool";

    nullish(): NullishSchema<this>;

    optional(): OptionalSchema<this>;
}
