import type { ButtonHTMLAttributes } from "react";
import type { ClsFn } from "../../fn/ClsFn";
import type { SlotProps } from "../../props/SlotProps";
import type { VariantProps } from "../../props/VariantProps";
import type { ElementProps } from "../ElementProps";

/**
 * Props for button elements with variant support.
 * Extends HTML button attributes but omits className to prevent conflicts.
 * TVariant and TUse work the same as in ElementProps.
 */
export interface ButtonProps<
	TSlotProps extends SlotProps<any>,
	TVariantProps extends VariantProps<keyof TSlotProps & string, any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">,
		ElementProps<TSlotProps, TVariantProps, TUse> {
	//
}
