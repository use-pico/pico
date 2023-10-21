import {type ArrayPathItem}  from "./ArrayPathItem";
import {type MapPathItem}    from "./MapPathItem";
import {type ObjectPathItem} from "./ObjectPathItem";
import {type RecordPathItem} from "./RecordPathItem";
import {type SetPathItem}    from "./SetPathItem";
import {type TuplePathItem}  from "./TuplePathItem";

export type PathItem =
    | ObjectPathItem
    | RecordPathItem
    | TuplePathItem
    | MapPathItem
    | SetPathItem
    | ArrayPathItem;
