import type { ClassName } from "./ClassName";
import type { Contract } from "./Contract";
import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Variant } from "./Variant";

/**
 * What namespace - creates typesafe way to tell "what" we're using to style.
 *
 * This namespace is used to create typesafe way how to tell "what" we're using to style
 * (e.g. css or tokens). Provides utilities for specifying styling approaches and values.
 */
export namespace What {
	/**
	 * CSS class-based styling value.
	 *
	 * Represents styling using traditional CSS class names.
	 */
	export interface Class {
		/** CSS class name for styling */
		class: ClassName;
	}

	/**
	 * Token-based styling value.
	 *
	 * Represents styling using design tokens from the contract.
	 *
	 * @template TContract - The contract type containing the tokens
	 */
	export type Token<TContract extends Contract.Any> = {
		/** Array of optional tokens for styling */
		token: Token.Extract<TContract>[];
	};

	/**
	 * Union type for any styling value.
	 *
	 * Can be either CSS class-based or token-based styling.
	 *
	 * @template TContract - The contract type for token-based styling
	 */
	export type Any<TContract extends Contract.Any> = Class | Token<TContract>;

	/**
	 * Function for creating CSS class-based styling values.
	 *
	 * Takes CSS class names and returns a Class value object.
	 */
	export type CssFn = (classes: ClassName) => Class;

	/**
	 * Function for creating token-based styling values.
	 *
	 * Takes extracted tokens and returns a Token value object.
	 *
	 * @template TContract - The contract type containing the tokens
	 */
	export type TokenFn<TContract extends Contract.Any> = (
		tokens: Token.Extract<TContract>[],
	) => Token<TContract>;

	/**
	 * Function for creating combined styling values.
	 *
	 * Takes both CSS classes and tokens, returns either type of value.
	 *
	 * @template TContract - The contract type containing the tokens
	 */
	export type BothFn<TContract extends Contract.Any> = (
		classes: ClassName,
		tokens: Token.Extract<TContract>[],
	) => Any<TContract>;

	/**
	 * Main What utility type providing styling specification methods.
	 *
	 * Contains all the functions needed to specify what styling approach
	 * and values to use for a given contract.
	 *
	 * @template TContract - The contract type being styled
	 */
	export interface Type<TContract extends Contract.Any> {
		/** Function for CSS class-based styling */
		css: CssFn;
		/** Function for token-based styling */
		token: TokenFn<TContract>;
		/** Function for combined styling approaches */
		both: BothFn<TContract>;
		/** Function for variant specification */
		variant: Variant.OptionalFn<TContract>;
		/** Function for slot specification */
		slot: Slot.OptionalFn<TContract>;
	}
}
