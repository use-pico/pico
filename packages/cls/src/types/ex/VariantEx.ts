import type { VariantProps } from "../props/VariantProps";

/**
 * Computes the extended variants by merging current variants with variants from extensions (uses).
 * TVariant represents the current component's variant definition.
 * TUse represents an extension function that may provide additional variants.
 * This type ensures that when a component extends another, all variants from both are available.
 */
export type VariantEx<
	TVariant extends VariantProps<any>,
	TUse extends
		| (() => {
				"~type": {
					variant?: VariantProps<any>;
				};
		  })
		| unknown = unknown,
> = TUse extends () => {
	"~type": {
		variant?: infer V;
	};
}
	? TVariant & V
	: TVariant;
