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

	/**
	 * Type to conditionally add token method based on contract capabilities
	 */
	type TokenBuilder<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> = Token.Raw<TContract> extends never
		? {
				token(error: "There are no tokens in the contract"): never;
			}
		: WithToken<TContract, TState>;

	/**
	 * Type to conditionally add variant-related methods based on contract capabilities
	 */
	type VariantBuilder<
		TContract extends Contract.Any,
		TState extends CompletionState = {},
	> = Variant.Has<TContract> extends true
		? WithVariant<TContract, TState>
		: {};

	/**
	 * Complete builder interface - only has .cls() when all requirements are met
	 */
	interface CompleteBuilder<TContract extends Contract.Any> {
		/**
		 * Create the final CLS instance - only available when all required methods have been called
		 */
		cls(): Cls.Type<TContract>;
	}

	/**
	 * Incomplete builder interface - .cls() method is missing or has error signature
	 */
	interface IncompleteBuilder {
		cls(
			error: `Builder is incomplete - check if you've called all the available relevant builder methods. Or maybe contract is empty.`,
		): never;
	}

	/**
	 * Clean, declarative type to determine if the builder is complete
	 */
	type IsComplete<
		TContract extends Contract.Any,
		TState extends CompletionState,
	> = Check.Each<
		[
			// If contract has tokens, token() must be called
			Check.If<Token.Has<TContract>, TState["hasToken"]>,
			// If contract has variants, defaults() must be called
			Check.If<Variant.Has<TContract>, TState["hasDefaults"]>,
		]
	>;

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
		(IsComplete<TContract, TState> extends true
			? CompleteBuilder<TContract>
			: IncompleteBuilder);
}
