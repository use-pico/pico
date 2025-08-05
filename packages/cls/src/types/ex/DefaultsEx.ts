import type { ValuesProps } from "../props/ValuesProps";
import type { VariantProps } from "../props/VariantProps";

/**
 * Computes the extended default values by merging current defaults with defaults from extensions.
 * Current defaults are required, while extension defaults are marked as optional.
 * This ensures that base component defaults are always provided, while extensions can add optional defaults.
 */
export type DefaultsEx<
	TVariant extends VariantProps<any>,
	TUse extends
		| (() => {
				"~type": {
					variant?: VariantProps<any>;
				};
		  })
		| unknown = unknown,
> = Required<ValuesProps<TVariant>> &
	(TUse extends () => {
		"~type": {
			variant?: infer V;
		};
	}
		? ValuesProps<V>
		: {});
