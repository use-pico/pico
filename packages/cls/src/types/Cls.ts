import type { Contract } from "./Contract";
import type { Definition } from "./Definition";
import type { Slot } from "./Slot";
import type { Token } from "./Token";
import type { Tweak } from "./Tweak";
import type { Utility } from "./Utility";
import type { Variant } from "./Variant";

/**
 * Namespace for CLS helper types
 */
export namespace Cls {
	export interface Type<TContract extends Contract.Any> {
		create(
			userTweakFn?: Tweak.Fn<TContract>,
			internalTweakFn?: Tweak.Fn<TContract>,
		): Slot.Kit<TContract>;

		extend<
			const TToken extends Token.Type,
			const TSlot extends Slot.Type,
			const TVariant extends Variant.Type,
		>(
			contract: Contract.Type<TToken, TSlot, TVariant, TContract>,
			definition: Definition.Factory.Fn<
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

		cls<Sub extends Contract.Any = TContract>(
			userTweakFn?: {
				hack: Tweak.Fn<
					IsChildrenOf<Sub, TContract> extends true ? Sub : never
				>;
			}["hack"],
			internalTweakFn?: {
				hack: Tweak.Fn<
					IsChildrenOf<Sub, TContract> extends true ? Sub : never
				>;
			}["hack"],
		):
			| Tweak.Fn<IsChildrenOf<Sub, TContract> extends true ? Sub : never>
			| undefined;

		contract: TContract;

		definition: Definition.Type<TContract>;
	}

	/**
	 * Checks if a contract type has a specific base type in its inheritance chain
	 * Used for validating contract inheritance relationships
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
		TVariant extends keyof Variant.Extract<TCls["contract"]>,
	> = Variant.Extract<
		TCls["contract"]
	>[TVariant] extends readonly (infer U extends string)[]
		? Utility.Value<U>
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
		tva?: TCls;
		/** Optional tweak function to modify styles on existing component */
		cls?: Tweak.Fn<TCls["contract"]>;
	} & Omit<P, "tva" | "cls">;
}
