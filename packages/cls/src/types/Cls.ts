import type { Contract } from "./Contract";
import type { Definition } from "./Definition";
import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Tweak } from "./Tweak";
import type { Utils } from "./Utils";
import type { Variant } from "./Variant";

/**
 * Namespace for CLS helper types
 */
export namespace Cls {
	/**
	 * Various interesting things returned from the create method
	 */
	export interface Kit<TContract extends Contract.Any> {
		/**
		 * Slots for your component(s) to style
		 */
		slots: Slot.Kit<TContract>;
		/**
		 * Resolved variants - if you need to access them as a single source of truth,
		 * this is the way.
		 */
		variant: Variant.VariantOf<TContract>;
	}

	export interface Type<TContract extends Contract.Any> {
		create(tweak?: Tweak.Type<TContract>): Kit<TContract>;

		extend<
			const TToken extends Token.Type,
			const TSlot extends Slot.Type,
			const TVariant extends Variant.Type,
		>(
			contract: Contract.Type<TToken, TSlot, TVariant, TContract>,
			definition: Definition.Type<
				Contract.Type<TToken, TSlot, TVariant, TContract>
			>,
		): Type<Contract.Type<TToken, TSlot, TVariant, TContract>>;

		use<Sub extends Contract.Any>(
			sub: Type<Sub> & {
				contract: IsChildrenOf<Sub, TContract> extends true
					? unknown
					: [
							"❌ Not derived from Base contract",
							{
								sub: Sub;
								base: TContract;
							},
						];
			},
		): Type<TContract>;

		tweak<Sub extends Contract.Any = TContract>(
			tweak?: {
				hack: Tweak.Type<
					IsChildrenOf<Sub, TContract> extends true ? Sub : never
				>;
			}["hack"],
		): Tweak.Type<TContract> | undefined;

		contract: TContract;

		definition: Definition.Type<TContract>;
	}

	/**
	 * Checks if a contract type has a specific base type in its inheritance chain
	 * Used for validating contract inheritance relationships
	 *
	 * @template TChildren - The child contract to check
	 * @template TAncestor - The ancestor contract to look for
	 * @returns true if TChildren extends TAncestor, false otherwise
	 */
	export type IsChildrenOf<TChildren, TAncestor> = TChildren extends TAncestor
		? true
		: TChildren extends {
					"~use"?: infer U;
				}
			? IsChildrenOf<U, TAncestor>
			: false;

	// ===========================
	// Utility types
	// ===========================

	/**
	 * Extracts the slot functions type from a CLS instance for use in component props
	 */
	export type SlotsOf<TCls extends Type<any>> = Slot.Kit<TCls["contract"]>;

	export type VariantOf<
		TCls extends Type<any>,
		TVariant extends keyof Variant.Raw<TCls["contract"]>,
	> = Variant.Raw<
		TCls["contract"]
	>[TVariant] extends readonly (infer U extends string)[]
		? Utils.Value<U>
		: never;

	export type VariantsOf<TCls extends Type<any>> = Variant.Optional<
		TCls["contract"]
	>;

	/**
	 * Props are used in React components when an user wants to work with Cls.
	 *
	 * Provides a way to pass a Cls instance or tweak styles on an existing component.
	 * Combines Cls-specific props with additional component props while preventing conflicts.
	 *
	 * @template TCls - The CLS instance type
	 * @template P - Additional component props (defaults to unknown)
	 */
	export type Props<TCls extends Type<any>, P = unknown> = {
		/** Optional CLS instance to use for styling */
		cls?: TCls;
		/** Optional tweak function to modify styles on existing component */
		tweak?: Tweak.Type<TCls["contract"]>;
	} & Omit<P, "cls" | "tweak">;
}
