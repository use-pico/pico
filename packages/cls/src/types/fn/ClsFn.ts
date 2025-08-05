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
	TSlotProps extends SlotProps<any>,
	TVariantProps extends VariantProps<keyof TSlotProps & string, any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> = (
	variant?: ValuesProps<VariantEx<TSlotProps, TVariantProps, TUse>>,
	cls?: SlotCls<TSlotProps, TUse>,
) => {
	/**
	 * Individual slots for a component. Those slots are then
	 * used to compute individual class names.
	 */
	slots: Slots<TSlotProps, TVariantProps, TUse>;
	/**
	 * Access predefined slots as an elements (e.g. div, span, ...).
	 *
	 * This is shortcut for <div className={slots.base()} /> etc.
	 */
	el: ElementFn<TSlotProps, TVariantProps, TUse>;
	/**
	 * Configuration used internally.
	 *
	 * This property does not havy any practical use in runtime.
	 */
	"~config": Config<VariantEx<TSlotProps, TVariantProps, TUse>>;
	/**
	 * Used for inheritance and type checking.
	 *
	 * This property does not havy any practical use in runtime.
	 */
	"~type": Type<
		SlotEx<TSlotProps, TUse>,
		VariantEx<TSlotProps, TVariantProps, TUse>,
		TUse
	>;
};
