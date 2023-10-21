import {type ArrayPathItem}  from "./ArrayPathItem";
import {type MapPathItem}    from "./MapPathItem";
import {type RecordPathItem} from "./RecordPathItem";
import {type ObjectSchema}   from "./schema/ObjectSchema";
import {type SetPathItem}    from "./SetPathItem";
import {type TuplePathItem}  from "./TuplePathItem";

export type PathItem =
    | ObjectSchema.PathItem
    | RecordPathItem
    | TuplePathItem
    | MapPathItem
    | SetPathItem
    | ArrayPathItem;
