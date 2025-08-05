import type { VariantEx } from "./ex/VariantEx";
import type { ClsFn } from "./fn/ClsFn";
import type { SlotProps } from "./props/SlotProps";
import type { ValuesProps } from "./props/ValuesProps";
import type { VariantProps } from "./props/VariantProps";
import type { SlotCls } from "./SlotCls";

/**
 * Defines a matching rule for dynamic class application.
 * TSlot represents the slot definition that this rule can affect.
 * TVariant represents the variant definition that this rule can check.
 * TUse represents an extension that may provide additional slots and variants.
 * Matching rules allow applying specific classes when certain variant conditions are met.
 */
export interface Match<
	TSlot extends SlotProps<any>,
	TVariant extends VariantProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> {
	/**
	 * Conditions to match.
	 *
	 * All the provided values must match to apply the rule.
	 */
	if: ValuesProps<VariantEx<TVariant, TUse>>;
	/**
	 * Classes to apply when all conditions are met.
	 *
	 * Keys are slot names.
	 */
	do: SlotCls<TSlot, TUse>;
}
