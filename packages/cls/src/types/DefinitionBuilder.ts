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

	/**
	 * Type to conditionally add variant-related methods based on contract capabilities
	 */
	type VariantBuilder<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> = Variant.With<TContract> extends true
		? WithVariant<TContract, TState>
		: {
				root(
					error: "There are no variants in the contract",
				): NoVariantCls;
				rule(
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
		(Check.If<Variant.Has<TContract>, TState["hasDefaults"]> extends false
			? {
					cls(
						error: `Variants are defined on a contract, but you've not called defaults() definition method`,
					): never;
				}
			: {}) &
		(Check.Each<
			[
				Check.If<Token.Has<TContract>, TState["hasToken"]>,
				Check.If<Variant.Has<TContract>, TState["hasDefaults"]>,
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
