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
	// TODO Check if inheritance can be abstracted to a type
	export type Extract<T extends Contract.Any> = T extends {
		"~use"?: infer U;
	}
		? U extends Contract.Any
			? T["tokens"][number] | Extract<U>
			: T["tokens"][number]
		: T["tokens"][number];

	/**
	 * Required token definitions for all declared tokens
	 */
	export type Required<T extends Contract.Any> =
		T["tokens"][number] extends never
			? Record<string, never>
			: { [K in T["tokens"][number]]: What.Any<T> };

	export type RequiredFn<T extends Contract.Any> = (
		token: Token.Required<T>,
	) => Token.Required<T>;

	/**
	 * Optional token definitions for inherited tokens
	 */
	export type Optional<T extends Contract.Any> = Partial<
		T["tokens"][number] extends never
			? Record<string, never>
			: { [K in T["tokens"][number]]: What.Any<T> }
	>;

	export type OptionalFn<T extends Contract.Any> = (
		token: Token.Optional<T>,
	) => Token.Optional<T>;

	/**
	 * Extended token definitions that handle both required and optional tokens
	 */
	export type Ex<T extends Contract.Any> = T["tokens"][number] extends never
		? Optional<T>
		: Optional<T> & Required<T>;
}
