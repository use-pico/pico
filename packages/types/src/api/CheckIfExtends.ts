export type CheckIfExtends<TCheck, TExtends, TYes, TNo> = TCheck extends TExtends ? TYes : TNo;
