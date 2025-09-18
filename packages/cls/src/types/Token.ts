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
		"~use"?: infer TUse;
	}
		? TUse extends Contract.Any
			? TContract["tokens"][number] | Raw<TUse>
			: TContract["tokens"][number]
		: TContract["tokens"][number];

	/**
	 * Check local presence of tokens
	 */
	export type Has<TContract extends Contract.Any> =
		TContract["tokens"][number] extends never ? false : true;

	/**
	 * Check presence of tokens in the inheritance chain
	 */
	export type With<TContract extends Contract.Any> =
		Raw<TContract> extends never ? false : true;

	/**
	 * Extended token definitions that handle both required and optional tokens
	 */
	export type Required<TContract extends Contract.Any> =
		Has<TContract> extends false
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
