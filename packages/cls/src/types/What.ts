import type { ClassName } from "./ClassName";
import type { Contract } from "./Contract";
import type { Token } from "./Token";

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
		token: Token.Raw<TContract>[];
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
	 * Union type for styling values with override support.
	 *
	 * Can be either CSS class-based or token-based styling with override behavior.
	 * This type is used for slot-level What values where override behavior is meaningful.
	 *
	 * @template TContract - The contract type for token-based styling
	 */
	export type AnyOverride<TContract extends Contract.Any> = (
		| Class
		| Token<TContract>
	) & {
		/**
		 * If specified, this What will override the previous value (regardless of
		 * What was set - class or token).
		 */
		override?: boolean;
	};
}
