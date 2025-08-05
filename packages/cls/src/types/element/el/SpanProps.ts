import type { HTMLAttributes } from "react";
import type { ClsFn } from "../../fn/ClsFn";
import type { VariantProps } from "../../props/VariantProps";
import type { ElementProps } from "../ElementProps";

/**
 * Props for span elements with variant support.
 * Extends HTML span attributes but omits className to prevent conflicts.
 * TVariant and TUse work the same as in ElementProps.
 */
export interface SpanProps<
	TVariant extends VariantProps<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> extends Omit<HTMLAttributes<HTMLSpanElement>, "className">,
		ElementProps<TVariant, TUse> {
	//
}
