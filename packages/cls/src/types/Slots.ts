import type { SlotEx } from "./ex/SlotEx";
import type { ClsFn } from "./fn/ClsFn";
import type { SlotFn } from "./fn/SlotFn";
import type { SlotProps } from "./props/SlotProps";
import type { VariantProps } from "./props/VariantProps";

/**
 * Maps each slot to its corresponding slot function.
 * TSlot represents the slot definition with slot names as keys.
 * TVariant represents the variant definition that all slot functions can work with.
 * TUse represents an extension that may provide additional slots and variants.
 * This creates an object where each slot name maps to a function that computes classes for that slot.
 */
export type Slots<
	TSlot extends SlotProps<any>,
	TVariant extends VariantProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> = {
	[K in keyof SlotEx<TSlot, TUse>]: SlotFn<TVariant, TUse>;
};
