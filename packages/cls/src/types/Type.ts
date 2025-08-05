import type { SlotEx } from "./ex/SlotEx";
import type { VariantEx } from "./ex/VariantEx";
import type { ClsFn } from "./fn/ClsFn";

/**
 * Type information used for inheritance and type checking.
 * TSlotEx represents the extended slots including extensions.
 * TVariantEx represents the extended variants including extensions.
 * TUse represents the extension function that provides additional slots and variants.
 * This type is used internally for type system manipulation and inheritance.
 */
export type Type<
	TSlotEx extends SlotEx<any, TUse>,
	TVariantEx extends VariantEx<any, TUse>,
	TUse extends ClsFn<any, any, any> | unknown,
> = {
	/**
	 * Extension type for this variant.
	 * This references the extension function that provides additional slots and variants.
	 */
	use?: TUse;
	/**
	 * Cumulated slots from all extensions.
	 * This contains all available slots from the base component and all extensions.
	 */
	slot?: TSlotEx;
	/**
	 * Cumulated variants from all extensions.
	 * This contains all available variants from the base component and all extensions.
	 */
	variant?: TVariantEx;
};
