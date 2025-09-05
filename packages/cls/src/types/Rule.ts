import type { Contract } from "./Contract";
import type { Slot } from "./Slot";
import type { Variant } from "./Variant";

/**
 * Namespace for rule-related types and utilities
 */
export namespace Rule {
	/**
	 * Defines a styling rule that can be applied to a CLS component.
	 *
	 * This type represents a single styling rule that contains:
	 * - Optional override flag to control rule precedence
	 * - Optional variant matching conditions
	 * - Required slot mapping that defines the actual styling values
	 *
	 * @template T - The contract type that defines the structure (tokens, slots, variants)
	 */
	export type Type<T extends Contract.Any> = {
		override?: boolean;
		match?: Variant.Optional<T>;
		slot: Slot.Mapping<T>;
	};
}
