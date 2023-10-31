import {type ArraySchema}  from "./schema/ArraySchema";
import {type ObjectSchema} from "./schema/ObjectSchema";
import {type RecordSchema} from "./schema/RecordSchema";
import {type TupleSchema}  from "./schema/TupleSchema";

export type PathItem =
    | ObjectSchema.PathItem
    | RecordSchema.PathItem
    | TupleSchema.PathItem
    | ArraySchema.PathItem;
