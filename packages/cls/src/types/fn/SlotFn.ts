import type { ClassName } from "../ClassName";
import type { VariantEx } from "../ex/VariantEx";
import type { ValuesProps } from "../props/ValuesProps";
import type { VariantProps } from "../props/VariantProps";
import type { ClsFn } from "./ClsFn";

/**
 * Defines a function that computes class names for a specific slot.
 * TVariant represents the variant definition that this slot function can work with.
 * TUse represents an extension that may provide additional variants.
 * The function takes optional variant values and an optional class name override.
 */
export type SlotFn<
	TVariant extends VariantProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> = (
	values?: ValuesProps<VariantEx<TVariant, TUse>>,
	cls?: ClassName,
) => string;
