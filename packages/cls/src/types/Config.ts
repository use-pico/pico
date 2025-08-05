import type { VariantEx } from "./ex/VariantEx";
import type { ValuesProps } from "./props/ValuesProps";

/**
 * Internal configuration object that tracks the state of variant values.
 * TVariantEx represents the extended variant definition including extensions.
 * This object contains both the default values and the current computed values.
 */
export interface Config<TVariantEx extends VariantEx<any, any, any>> {
	/**
	 * Cumulated default values from all variants (including uses - extensions).
	 * These are the base values that are applied when no specific values are provided.
	 */
	defaults: ValuesProps<TVariantEx>;
	/**
	 * Combined cumulated defaults & current values provided to the cls function.
	 * This represents the final computed state of all variant values.
	 */
	values: ValuesProps<TVariantEx>;
}
