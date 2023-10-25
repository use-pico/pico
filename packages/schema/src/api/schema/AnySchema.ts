import {type PicoSchema}     from "../PicoSchema";
import {type NullishSchema}  from "./NullishSchema";
import {type OptionalSchema} from "./OptionalSchema";

export interface AnySchema<TOutput = any> extends PicoSchema<any, TOutput> {
    schema: "any";

    nullish(): NullishSchema<this>;

    optional(): OptionalSchema<this>;
}
