import type { ClassName } from "../ClassName";
import type { ValuesDef } from "../definition/ValuesDef";
import type { VariantDef } from "../definition/VariantDef";
import type { VariantEx } from "../ex/VariantEx";
import type { ClsFn } from "../fn/ClsFn";

/**
 * Base interface for all element props.
 * TVariant represents the variant definition that this element can work with.
 * TUse represents an extension that may provide additional variants.
 * All elements can accept variant values and class name overrides.
 */
export interface ElementProps<
	TVariant extends VariantDef<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> {
	variant?: ValuesDef<VariantEx<TVariant, TUse>>;
	cls?: ClassName;
}
