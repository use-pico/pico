import {type MapPathItem}   from "./MapPathItem";
import {type ArraySchema}   from "./schema/ArraySchema";
import {type ObjectSchema}  from "./schema/ObjectSchema";
import {type RecordSchema}  from "./schema/RecordSchema";
import {type SetPathItem}   from "./SetPathItem";
import {type TuplePathItem} from "./TuplePathItem";

export type PathItem =
    | ObjectSchema.PathItem
    | RecordSchema.PathItem
    | TuplePathItem
    | MapPathItem
    | SetPathItem
    | ArraySchema.PathItem;
