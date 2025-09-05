import type { Contract } from "./Contract";

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
	export type Extract<T extends Contract.Any> = T extends {
		"~use"?: infer U;
	}
		? U extends Contract.Any
			? T["tokens"][number] | Extract<U>
			: T["tokens"][number]
		: T["tokens"][number];
}
