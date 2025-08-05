import type { ValuesDef } from "../definition/ValuesDef";
import type { VariantDef } from "../definition/VariantDef";

/**
 * Computes the extended default values by merging current defaults with defaults from extensions.
 * Current defaults are required, while extension defaults are marked as optional.
 * This ensures that base component defaults are always provided, while extensions can add optional defaults.
 */
export type DefaultsEx<
	TVariant extends VariantDef<any>,
	TUse extends
		| (() => {
				"~type": {
					variant?: VariantDef<any>;
				};
		  })
		| unknown = unknown,
> = Required<ValuesDef<TVariant>> &
	(TUse extends () => {
		"~type": {
			variant?: infer V;
		};
	}
		? ValuesDef<V>
		: {});
