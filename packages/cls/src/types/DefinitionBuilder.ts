import type { Check } from "./Check";
import type { Cls } from "./Cls";
import type { Contract } from "./Contract";
import type { Rule } from "./Rule";
import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Variant } from "./Variant";

/**
 * Builder for creating definitions with a fluent API.
 * Allows chaining token(), rule(), root(), and defaults() calls.
 */
export namespace DefinitionBuilder {
	/**
	 * Utility type: keys of variants that are declared as boolean ("bool")
	 */
	type BoolKeys<TContract extends Contract.Any> = {
		[K in keyof Variant.Raw<TContract>]: "bool" extends Variant.Raw<TContract>[K][number]
			? K
			: never;
	}[keyof Variant.Raw<TContract>];
	/**
	 * Definition builder state that accumulates definition parts
	 */
	export interface State<
		TContract extends Contract.Any,
		TUse extends Contract.Any | unknown = unknown,
	> {
		contract: TContract;
		token?: Token.Required<TContract>;
		rules: Rule.Type<TContract>[];
		defaults?: Variant.VariantOf<TContract>;
		use?: TUse;
	}

	/**
	 * Type-level flags to track which required methods have been called
	 */
	export interface CompletionState {
		hasToken?: boolean;
		hasDefaults?: boolean;
	}

	/**
	 * Token method interface - only available when contract has tokens
	 */
	interface WithToken<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> {
		/**
		 * Set token definitions (overrides previous if called multiple times)
		 */
		token(token: Token.Required<TContract>): Builder<
			TContract,
			TState & {
				hasToken: true;
			}
		>;
	}

	/**
	 * Rule method interface - only available when contract has variants
	 */
	interface WithVariant<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> {
		/**
		 * Add a root rule (can be called multiple times, rules accumulate)
		 */
		root(
			slot: Slot.Optional<TContract>,
			override?: boolean,
		): Builder<TContract, TState>;

		/**
		 * Add a rule (can be called multiple times, rules accumulate)
		 */
		rule(
			match: Variant.Optional<TContract>,
			slot: Slot.Optional<TContract>,
			override?: boolean,
		): Builder<TContract, TState>;

		/**
		 * Match helper (switch-like) to add a rule for a specific variant key/value.
		 */
		match<
			const TKey extends keyof Variant.VariantOf<TContract>,
			const TValue extends Variant.VariantOf<TContract>[TKey],
		>(
			key: TKey,
			value: TValue,
			slot: Slot.Optional<TContract>,
			override?: boolean,
		): Builder<TContract, TState>;

		/**
		 * Convenience helper for boolean variants. Generates two rules:
		 * - when variant[key] is true -> applies `whenTrue` slot
		 * - when variant[key] is false -> applies `whenFalse` slot
		 */
		switch<K extends BoolKeys<TContract>>(
			key: K,
			whenTrue: Slot.Optional<TContract>,
			whenFalse: Slot.Optional<TContract>,
		): Builder<TContract, TState>;

		/**
		 * Set defaults (overrides previous if called multiple times)
		 */
		defaults(defaults: Variant.VariantOf<TContract>): Builder<
			TContract,
			TState & {
				hasDefaults: true;
			}
		>;
	}

	interface NoTokenCls {
		cls(error: "There are no tokens in the contract"): never;
	}

	/**
	 * Type to conditionally add token method based on contract capabilities
	 */
	type TokenBuilder<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> = Token.With<TContract> extends true
		? WithToken<TContract, TState>
		: {
				token(error: "There are no tokens in the contract"): NoTokenCls;
			};

	interface NoVariantCls {
		cls(error: "There are no variants in the contract"): never;
	}

	interface NoSlotCls {
		cls(error: "There are no slots in the contract"): never;
	}

	/**
	 * Type to conditionally add variant-related methods based on contract capabilities
	 */
	type VariantBuilder<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> = Variant.With<TContract> extends true
		? Slot.With<TContract> extends true
			? /**
				 * We've Variants AND Slots, so everything is available
				 */
				WithVariant<TContract, TState>
			: /**
				 * We've Variants, but there are not slots, so nothing is available
				 */
				{
					root(
						error: "There are no slots in the contract",
					): NoSlotCls;
					rule(
						error: "There are no slots in the contract",
					): NoSlotCls;
					match(
						error: "There are no slots in the contract",
					): NoSlotCls;
					switch(
						error: "There are no slots in the contract",
					): NoSlotCls;
					defaults: WithVariant<TContract, TState>["defaults"];
				}
		: Slot.With<TContract> extends true
			? /**
				 * We don't have variants, but we've slots, only "root" is available
				 */
				{
					root: WithVariant<TContract, TState>["root"];
					rule(
						error: "There are no variants in the contract",
					): NoVariantCls;
					match(
						error: "There are no variants in the contract",
					): NoVariantCls;
					switch(
						error: "There are no variants in the contract",
					): NoVariantCls;
					defaults(
						error: "There are no variants in the contract",
					): NoVariantCls;
				}
			: /**
				 * There are no slots nor variants, nothing is available
				 */
				{
					root(
						error: "There are no variants in the contract",
					): NoVariantCls;
					rule(
						error: "There are no variants in the contract",
					): NoVariantCls;
					match(
						error: "There are no variants in the contract",
					): NoVariantCls;
					switch(
						error: "There are no variants in the contract",
					): NoVariantCls;
					defaults(
						error: "There are no variants in the contract",
					): NoVariantCls;
				};

	/**
	 * Base builder type that combines all available methods based on contract capabilities
	 */
	type BaseBuilder<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> = TokenBuilder<TContract, TState> & VariantBuilder<TContract, TState>;

	/**
	 * Definition builder interface with fluent methods and type-level validation
	 */
	export type Builder<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> = BaseBuilder<TContract, TState> &
		(Check.If<Token.Has<TContract>, TState["hasToken"]> extends false
			? {
					cls(
						error: `Tokens are defined on a contract, but you've not called token() definition method`,
					): never;
				}
			: {}) &
		(Check.If<Variant.With<TContract>, TState["hasDefaults"]> extends false
			? {
					cls(
						error: `Variants are defined on a contract, but you've not called defaults() definition method`,
					): never;
				}
			: {}) &
		(Check.Each<
			[
				Check.If<Token.Has<TContract>, TState["hasToken"]>,
				Check.If<Variant.With<TContract>, TState["hasDefaults"]>,
			]
		> extends true
			? {
					/**
					 * Create the final CLS instance - only available when all required methods have been called
					 */
					cls(): Cls.Type<TContract>;
				}
			: {});
}
