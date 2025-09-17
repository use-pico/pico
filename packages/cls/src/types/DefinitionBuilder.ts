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
	export interface State<TContract extends Contract.Any> {
		contract: TContract;
		token?: Token.Required<TContract>;
		rules: Rule.Type<TContract>[];
		defaults?: Variant.VariantOf<TContract>;
	}

	/**
	 * Definition builder interface with fluent methods
	 */
	export interface Builder<TContract extends Contract.Any> {
		/**
		 * Set token definitions (overrides previous if called multiple times)
		 */
		token(token: Token.Required<TContract>): Builder<TContract>;

		/**
		 * Add a rule (can be called multiple times, rules accumulate)
		 */
		rule(
			match: Variant.Optional<TContract>,
			slot: Slot.Optional<TContract>,
			override?: boolean,
		): Builder<TContract>;

		/**
		 * Add a root rule (can be called multiple times, rules accumulate)
		 */
		root(
			slot: Slot.Optional<TContract>,
			override?: boolean,
		): Builder<TContract>;

		/**
		 * Set defaults (overrides previous if called multiple times)
		 */
		defaults(defaults: Variant.VariantOf<TContract>): Builder<TContract>;

		/**
		 * Create the final CLS instance with validation
		 */
		cls(): Cls.Type<TContract>;
	}
}
