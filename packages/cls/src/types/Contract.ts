import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Variant } from "./Variant";

/**
 * Namespace for contract-related types and utilities
 */
export namespace Contract {
	/**
	 * Base contract type that defines the structure of a CLS contract
	 */
	export type Type<
		TToken extends Token.Type,
		TSlot extends Slot.Type,
		TVariant extends Variant.Type,
		TUse extends Any | unknown = unknown,
	> = {
		tokens: TToken;
		slot: TSlot;
		variant: TVariant;
		"~use"?: TUse;
		"~definition"?: any; // Will be properly typed when imported
	};

	/**
	 * Contract type with any generics for flexible usage
	 */
	export type Any = Type<any, any, any>;
}
