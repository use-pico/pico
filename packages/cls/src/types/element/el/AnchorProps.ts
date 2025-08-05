import type { HTMLAttributes } from "react";
import type { ClsFn } from "../../fn/ClsFn";
import type { VariantProps } from "../../props/VariantProps";
import type { ElementProps } from "../ElementProps";

/**
 * Props for anchor elements with variant support.
 * Extends HTML anchor attributes but omits className to prevent conflicts.
 * TVariant and TUse work the same as in ElementProps.
 */
export interface AnchorProps<
	TVariant extends VariantProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> extends Omit<HTMLAttributes<HTMLAnchorElement>, "className">,
		ElementProps<TVariant, TUse> {
	//
}
