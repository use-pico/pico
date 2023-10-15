import {type PickOptional} from "./PickOptional";
import {type PickRequired} from "./PickRequired";
import {type Undefinable}  from "./Undefinable";

export type UndefinableWithOptional<T> =
    PickRequired<T>
    & Undefinable<PickOptional<T>>;
