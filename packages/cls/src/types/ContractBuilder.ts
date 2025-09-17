import type { Contract } from "./Contract";
import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Utils } from "./Utils";
import type { Variant } from "./Variant";

/**
 * Builder for creating contracts with a fluent API.
 * Allows chaining token(), slot(), and variant() calls with proper type accumulation.
 */
export namespace ContractBuilder {
	/**
	 * Contract builder state that accumulates tokens, slots, and variants
	 */
	export interface State<
		TTokens extends Token.Type = Token.Type,
		TSlots extends Slot.Type = Slot.Type,
		TVariants extends Variant.Type = Variant.Type,
	> {
		tokens: TTokens;
		slots: TSlots;
		variants: TVariants;
	}

	/**
	 * Contract builder interface with fluent methods
	 */
	export interface Builder<
		TTokens extends Token.Type = Token.Type,
		TSlots extends Slot.Type = Slot.Type,
		TVariants extends Variant.Type = Variant.Type,
	> {
		/**
		 * Add multiple tokens (can be called multiple times, tokens accumulate)
		 */
		tokens<const TNewTokens extends Token.Type>(
			tokens: TNewTokens,
		): Builder<
			readonly [
				...TTokens,
				...TNewTokens,
			],
			TSlots,
			TVariants
		>;

		/**
		 * Add a single token (can be called multiple times, tokens accumulate)
		 */
		token<const TNewToken extends string>(
			token: TNewToken,
		): Builder<
			readonly [
				...TTokens,
				TNewToken,
			],
			TSlots,
			TVariants
		>;

		/**
		 * Add multiple slots (can be called multiple times, slots accumulate)
		 */
		slots<const TNewSlots extends Slot.Type>(
			slots: TNewSlots,
		): Builder<
			TTokens,
			readonly [
				...TSlots,
				...TNewSlots,
			],
			TVariants
		>;

		/**
		 * Add a single slot (can be called multiple times, slots accumulate)
		 */
		slot<const TNewSlot extends string>(
			slot: TNewSlot,
		): Builder<
			TTokens,
			readonly [
				...TSlots,
				TNewSlot,
			],
			TVariants
		>;

		/**
		 * Add multiple variants (can be called multiple times, variants merge)
		 */
		variants<const TNewVariants extends Variant.Type>(
			variants: TNewVariants,
		): Builder<TTokens, TSlots, Utils.Merge<TVariants, TNewVariants>>;

		/**
		 * Add a single variant (can be called multiple times, variants merge)
		 */
		variant<
			const TName extends string,
			const TValues extends readonly string[],
		>(
			name: TName,
			values: TValues,
		): Builder<
			TTokens,
			TSlots,
			Utils.Merge<TVariants, Record<TName, TValues>>
		>;

		/**
		 * Build the final contract with accumulated types
		 */
		build(): Contract.Type<TTokens, TSlots, TVariants>;
	}
}
