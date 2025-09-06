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
	 * @template TContract - The contract type that defines the structure (tokens, slots, variants)
	 */
	export type Type<TContract extends Contract.Any> = {
		override?: boolean;
		match?: Variant.Optional<TContract>;
		slot: Slot.Optional<TContract>;
	};

	export namespace Match {
		export type RootFn<TContract extends Contract.Any> = (
			slot: Slot.Optional<TContract>,
			override?: boolean,
		) => Type<TContract>;

		export type RuleFn<TContract extends Contract.Any> = (
			match: Variant.Optional<TContract>,
			slot: Slot.Optional<TContract>,
			override?: boolean,
		) => Type<TContract>;
	}
}
