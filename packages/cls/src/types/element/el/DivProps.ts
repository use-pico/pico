import type { HTMLAttributes } from "react";
import type { VariantDef } from "../../definition/VariantDef";
import type { ClsFn } from "../../fn/ClsFn";
import type { ElementProps } from "../ElementProps";

/**
 * Props for div elements with variant support.
 * Extends HTML div attributes but omits className to prevent conflicts.
 * TVariant and TUse work the same as in ElementProps.
 */
export interface DivProps<
	TVariant extends VariantDef<any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
> extends Omit<HTMLAttributes<HTMLDivElement>, "className">,
		ElementProps<TVariant, TUse> {
	//
}
