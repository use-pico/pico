import type { Contract } from "./Contract";
import type { What } from "./What";

/**
 * Namespace for token-related types and utilities
 */
export namespace Token {
	/**
	 * Base token type - array of token names
	 */
	export type Type = readonly string[];

	/**
	 * Extracts all token names from a contract and its inheritance chain
	 */
	export type Raw<TContract extends Contract.Any> = TContract extends {
		"~use"?: infer TExt;
	}
		? TExt extends Contract.Any
			? TContract["tokens"][number] | Raw<TExt>
			: TContract["tokens"][number]
		: TContract["tokens"][number];

	/**
	 * Extended token definitions that handle both required and optional tokens
	 */
	export type Required<TContract extends Contract.Any> =
		TContract["tokens"][number] extends never
			? Optional<TContract>
			: Optional<TContract> & {
					[K in TContract["tokens"][number]]: What.Any<TContract>;
				};

	/**
	 * Optional token definitions for inherited tokens
	 */
	export type Optional<TContract extends Contract.Any> = Partial<{
		[K in Raw<TContract>]: What.Any<TContract>;
	}>;

	export type RequiredFn<TContract extends Contract.Any> = (
		token: Token.Required<TContract>,
	) => Token.Required<TContract>;

	export type OptionalFn<TContract extends Contract.Any> = (
		token: Token.Optional<TContract>,
	) => Token.Optional<TContract>;
}
