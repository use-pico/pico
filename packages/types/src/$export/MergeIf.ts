import {type CheckIfExtends} from "./CheckIfExtends";

export type MergeIf<TBase, TCheck, TExtends, TYes, TNo> =
    TBase
    & CheckIfExtends<TCheck, TExtends, TYes, TNo>;
