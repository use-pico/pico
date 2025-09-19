import type { Contract } from "./Contract";
import type { DefinitionBuilder } from "./DefinitionBuilder";
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
	 * State representing the accumulated contract data during building
	 */
	export interface State<
		TToken extends Token.Type,
		TSlot extends Slot.Type,
		TVariant extends Variant.Type,
		TUse extends Contract.Any | unknown = unknown,
	> {
		tokens: TToken;
		slot: TSlot;
		variant: TVariant;
		use?: TUse;
	}

	/**
	 * Contract builder interface with fluent methods
	 */
	export interface Builder<
		TToken extends Token.Type,
		TSlot extends Slot.Type,
		TVariant extends Variant.Type,
		TUse extends Contract.Any | unknown = unknown,
	> {
		/**
		 * Add multiple tokens (can be called multiple times, tokens accumulate with deduplication)
		 */
		tokens<const TNewTokens extends Token.Type>(
			tokens: TNewTokens,
		): Builder<
			readonly [
				...TToken,
				...TNewTokens,
			],
			TSlot,
			TVariant,
			TUse
		>;

		/**
		 * Add a single token (can be called multiple times, tokens accumulate with deduplication)
		 */
		token<const TNewToken extends string>(
			token: TNewToken,
		): Builder<
			readonly [
				...TToken,
				TNewToken,
			],
			TSlot,
			TVariant,
			TUse
		>;

		/**
		 * Add multiple slots (can be called multiple times, slots accumulate with deduplication)
		 */
		slots<const TNewSlots extends Slot.Type>(
			slots: TNewSlots,
		): Builder<
			TToken,
			readonly [
				...TSlot,
				...TNewSlots,
			],
			TVariant,
			TUse
		>;

		/**
		 * Add a single slot (can be called multiple times, slots accumulate with deduplication)
		 */
		slot<const TNewSlot extends string>(
			slot: TNewSlot,
		): Builder<
			TToken,
			readonly [
				...TSlot,
				TNewSlot,
			],
			TVariant,
			TUse
		>;

		/**
		 * Add multiple variants (can be called multiple times, variants merge)
		 */
		variants<const TNewVariants extends Variant.Type>(
			variants: TNewVariants,
		): Builder<TToken, TSlot, Utils.Merge<TVariant, TNewVariants>, TUse>;

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
			TToken,
			TSlot,
			Utils.Merge<TVariant, Record<TName, TValues>>,
			TUse
		>;

		bool<const TName extends string>(
			name: TName,
		): Builder<
			TToken,
			TSlot,
			Utils.Merge<
				TVariant,
				Record<
					TName,
					[
						"bool",
					]
				>
			>,
			TUse
		>;

		/**
		 * Build the final contract with accumulated types
		 */
		build(): Contract.Type<TToken, TSlot, TVariant, TUse>;

		/**
		 * Creates a definition builder for the contract
		 */
		def(): DefinitionBuilder.Builder<
			Contract.Type<TToken, TSlot, TVariant, TUse>,
			{}
		>;
	}
}
