import type { Contract } from "./Contract";
import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Variant } from "./Variant";

/**
 * Namespace for rule-related types and utilities
 */
export namespace Rule {
	export type Type<TContract extends Contract.Any> = {
		override?: boolean;
		match?: Variant.Optional<TContract>;
		slot?: Slot.Optional<TContract>;
		token?: Token.Optional<TContract>;
	};
}
