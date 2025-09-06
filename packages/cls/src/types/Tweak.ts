import type { Contract } from "./Contract";
import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Variant } from "./Variant";
import type { What } from "./What";

/**
 * Tweak - Overall tool to adjust already existing "cls" instance.
 *
 * Provides a way to modify cls instances during creation or on slot usage.
 * Allows fine-tuning of variants, slots, overrides, and tokens in a type-safe manner.
 */
export namespace Tweak {
	/**
	 * The tweak type itself holding stuff user can tweak (change).
	 *
	 * Defines the structure of modifications that can be applied to a cls instance.
	 * All properties are optional, allowing partial modifications.
	 *
	 * @template TContract - The contract type to tweak
	 */
	export type Type<TContract extends Contract.Any> = {
		/** Optional variant modifications */
		variant?: Variant.Optional<TContract>;
		/** Optional slot modifications */
		slot?: Slot.Optional<TContract>;
		/** Optional slot overrides */
		override?: Slot.Optional<TContract>;
		/** Optional token modifications */
		token?: Token.Optional<TContract>;
	};

	export namespace Override {
		export interface Type<TContract extends Contract.Any> {
			token: Token.OptionalFn<TContract>;
		}
	}

	export interface Props<TContract extends Contract.Any> {
		what: What.Type<TContract>;
		override: Override.Type<TContract>;
	}

	/**
	 * This is a config function used to provide typesafe way to tweaks.
	 *
	 * A function that receives the current cls properties and returns tweak modifications.
	 * Enables dynamic, context-aware adjustments based on the current state.
	 *
	 * @template TContract - The contract type being tweaked
	 * @param props - Current cls properties to base tweaks on
	 * @returns Tweak modifications to apply
	 */
	export type Fn<TContract extends Contract.Any> = (
		props: Props<TContract>,
	) => Type<TContract>;
}
