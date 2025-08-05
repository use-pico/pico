import type { SlotEx } from "../ex/SlotEx";
import type { ClsFn } from "../fn/ClsFn";
import type { SlotProps } from "../props/SlotProps";
import type { VariantProps } from "../props/VariantProps";
import type { Elements } from "./Elements";

/**
 * Maps each slot to a collection of element components.
 * TSlot represents the slot definition with slot names as keys.
 * TVariant represents the variant definition that all elements can work with.
 * TUse represents an extension that may provide additional slots and variants.
 * This creates an object where each slot name maps to a set of element components for that slot.
 */
export type ElementFn<
	TSlot extends SlotProps<any>,
	TVariant extends VariantProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> = {
	[K in keyof SlotEx<TSlot, TUse>]: Elements<TVariant, TUse>;
};
