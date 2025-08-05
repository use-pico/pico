import type { ClassName } from "../ClassName";
import type { ValuesDef } from "../definition/ValuesDef";
import type { VariantDef } from "../definition/VariantDef";
import type { VariantEx } from "../ex/VariantEx";
import type { ClsFn } from "./ClsFn";

/**
 * Defines a function that computes class names for a specific slot.
 * TVariant represents the variant definition that this slot function can work with.
 * TUse represents an extension that may provide additional variants.
 * The function takes optional variant values and an optional class name override.
 */
export type SlotFn<
	TVariant extends VariantDef<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> = (values?: ValuesDef<VariantEx<TVariant, TUse>>, cls?: ClassName) => string;
