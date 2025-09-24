import type { Contract } from "./Contract";
import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Variant } from "./Variant";

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
		/**
		 * When set to true, this tweak will override the previous tweak(s).
		 *
		 * From user's perspective this allows to brute force user's tweak.
		 */
		override?: boolean;
		/**
		 * Brute force - kills previous tweaks and set this as a new baseline.
		 */
		clear?: boolean;
		/** Optional variant modifications */
		variant?: Variant.Optional<TContract>;
		/** Optional slot modifications */
		slot?: Slot.Optional<TContract>;
		/** Optional token modifications */
		token?: Token.Optional<TContract>;
	};

	/**
	 * Tweaks are used as an input to make... a tweak
	 */
	export type Tweaks<TContract extends Contract.Any> =
		| (Tweak.Type<TContract> | Tweaks<TContract> | undefined)[]
		| Tweak.Type<TContract>
		| undefined;

	export type TweaksFn<TContract extends Contract.Any> = (
		...tweaks: Tweak.Tweaks<TContract>[]
	) => Tweak.Type<TContract>;
}
