import type { ClassName } from "../ClassName";
import type { VariantEx } from "../ex/VariantEx";
import type { ClsFn } from "../fn/ClsFn";
import type { SlotProps } from "../props/SlotProps";
import type { ValuesProps } from "../props/ValuesProps";
import type { VariantProps } from "../props/VariantProps";

/**
 * Base interface for all element props.
 * TVariant represents the variant definition that this element can work with.
 * TUse represents an extension that may provide additional variants.
 * All elements can accept variant values and class name overrides.
 */
export interface ElementProps<
	TSlotProps extends SlotProps<any>,
	TVariant extends VariantProps<keyof TSlotProps & string, any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> {
	variant?: ValuesProps<VariantEx<TSlotProps, TVariant, TUse>>;
	cls?: ClassName;
}
