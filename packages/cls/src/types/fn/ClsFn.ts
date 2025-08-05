import type { Config } from "../Config";
import type { ElementFn } from "../element/ElementFn";
import type { SlotEx } from "../ex/SlotEx";
import type { VariantEx } from "../ex/VariantEx";
import type { SlotProps } from "../props/SlotProps";
import type { ValuesProps } from "../props/ValuesProps";
import type { VariantProps } from "../props/VariantProps";
import type { SlotCls } from "../SlotCls";
import type { Slots } from "../Slots";
import type { Type } from "../Type";

/**
 * The main factory function type that creates the cls system.
 * TSlot represents the slot definition with slot names as keys.
 * TVariant represents the variant definition with variant categories as keys.
 * TUse represents an extension function that may provide additional slots and variants.
 * This function takes variant values and slot class overrides, returning an object with slots, elements, and internal metadata.
 */
export type ClsFn<
	TSlot extends SlotProps<any>,
	TVariant extends VariantProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> = (
	variant?: ValuesProps<VariantEx<TVariant, TUse>>,
	cls?: SlotCls<TSlot, TUse>,
) => {
	/**
	 * Individual slots for a component. Those slots are then
	 * used to compute individual class names.
	 */
	slots: Slots<TSlot, TVariant, TUse>;
	/**
	 * Access predefined slots as an elements (e.g. div, span, ...).
	 *
	 * This is shortcut for <div className={slots.base()} /> etc.
	 */
	el: ElementFn<TSlot, TVariant, TUse>;
	/**
	 * Configuration used internally.
	 *
	 * This property does not havy any practical use in runtime.
	 */
	"~config": Config<VariantEx<TVariant, TUse>>;
	/**
	 * Used for inheritance and type checking.
	 *
	 * This property does not havy any practical use in runtime.
	 */
	"~type": Type<SlotEx<TSlot, TUse>, VariantEx<TVariant, TUse>, TUse>;
};
