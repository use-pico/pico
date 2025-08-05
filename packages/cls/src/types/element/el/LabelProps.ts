import type { LabelHTMLAttributes } from "react";
import type { ClsFn } from "../../fn/ClsFn";
import type { VariantProps } from "../../props/VariantProps";
import type { ElementProps } from "../ElementProps";

/**
 * Props for label elements with variant support.
 * Extends HTML label attributes but omits className to prevent conflicts.
 * TVariant and TUse work the same as in ElementProps.
 */
export interface LabelProps<
	TVariant extends VariantProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">,
		ElementProps<TVariant, TUse> {
	//
}
