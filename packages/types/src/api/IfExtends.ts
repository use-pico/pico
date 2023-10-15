/**
 * If the specified (TExtends) type is not void, merge those types together.
 */
export type IfExtends<TType, TExtends = void> = TExtends extends void ? TType : TType & TExtends;
