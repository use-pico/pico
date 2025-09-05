import type { ClassName } from "./types/ClassName";
import type { Contract as CoolContract } from "./types/Contract";
import type { Slot as CoolSlot } from "./types/Slot";
import type { Token as CoolToken } from "./types/Token";
import type { Utility } from "./types/utility";
import type { Variant as CoolVariant } from "./types/Variant";

/**
 * Extended utility interface for CLS extension operations.
 *
 * This interface is identical to `WhatUtil` but is used specifically when extending
 * existing CLS instances via the `extend()` method. It provides the same styling
 * utilities but with types that are appropriate for extended components.
 *
 * @template T - The contract type that defines the structure (tokens, slots, variants)
 */
export interface WhatUtilEx<T extends CoolContract.Any>
	extends Omit<WhatUtil<T>, "def"> {
	def: Omit<WhatUtil<T>["def"], "token"> & {
		/**
		 * Creates token definitions that define the design system values.
		 *
		 * Use this to define the actual CSS values for your design tokens.
		 * These token definitions are used throughout the styling system
		 * and can be referenced by other tokens.
		 *
		 * @param token - Required token definitions for all declared tokens
		 * @returns Required token definitions for the design system
		 *
		 * @example
		 * ```typescript
		 * // Define all required tokens
		 * def.token({
		 *   "color.text.default": what.css(["text-gray-900"]),
		 *   "color.text.primary": what.css(["text-white"]),
		 *   "color.bg.default": what.css(["bg-gray-100"]),
		 *   "color.bg.primary": what.css(["bg-blue-600"]),
		 *   "spacing.padding.md": what.css(["px-4", "py-2"])
		 * })
		 * ```
		 */
		token(token: Token.DefinitionEx<T>): Token.DefinitionEx<T>;
	};
}

// ============================================================================
// SLOT SYSTEM
// ============================================================================

// Helper types for internal use
type SlotOf<T extends CoolContract.Any> = Slot.Of<T>;

/**
 * Namespace for CLS helper types
 */
namespace Cls {
	/**
	 * Helper type for cls function configuration
	 */
	export type ConfigFn<
		T extends CoolContract.Any,
		Sub extends CoolContract.Any,
	> = WhatUtil.Config.Fn<
		Utility.HasBaseInUseChain<Sub, T> extends true ? Sub : never
	>;
}

// ============================================================================
// Contract Namespace
// ============================================================================

/**
 * Namespace for Contract-related types
 */
export namespace Contract {
	// Token namespace moved to top-level Token namespace

	/**
	 * Namespace for rule-related types
	 */
	export namespace Rule {
		export interface Definition<T extends CoolContract.Any> {
			override?: boolean;
			match?: Partial<CoolVariant.VariantOf<T>>;
			slot: Slot.Mapping<T>;
		}

		export type MatchFn<TContract extends CoolContract.Any> = (
			match: Definition<TContract>["match"] | undefined,
			slot: Slot.Mapping<TContract>,
			override?: boolean,
		) => Definition<TContract>;

		export type MatchSlotFn<TContract extends CoolContract.Any> = (
			slot: Slot.Mapping<TContract>,
			override?: boolean,
		) => Definition<TContract>;
	}
}

// ============================================================================
// WhatUtil Namespace
// ============================================================================

/**
 * Namespace for WhatUtil-related types and styling values
 */
export namespace WhatUtil {
	/**
	 * Namespace for styling value types
	 */
	export namespace Value {
		export type Class = {
			class: ClassName;
		};

		export type Token<T extends CoolContract.Any> = {
			token: CoolToken.Extract<T>[];
		};

		export type Any<T extends CoolContract.Any> = Class | Token<T>;
	}

	/**
	 * Namespace for slot-related helper types
	 */
	export namespace Slot {
		export type Mapping<T extends CoolContract.Any> = {
			[K in SlotOf<T>]?: Value.Any<T>;
		};
	}

	/**
	 * Namespace for configuration function types
	 */
	export namespace Config {
		export type Fn<T extends CoolContract.Any> = (
			props: WhatUtil<T>,
		) => Partial<CreateConfig<T>>;
	}

	/**
	 * Namespace for what function types
	 */
	export namespace What {
		export type CssFn = (classes: ClassName) => Value.Class;

		export type TokenFn<T extends CoolContract.Any> = (
			tokens: CoolToken.Extract<T>[],
		) => Value.Token<T>;

		export type BothFn<T extends CoolContract.Any> = (
			classes: ClassName,
			tokens: CoolToken.Extract<T>[],
		) => Value.Any<T>;

		export type SlotFn<T extends CoolContract.Any> = (
			slot: WhatUtil.Slot.Mapping<T>,
		) => WhatUtil.Slot.Mapping<T>;
	}

	/**
	 * Namespace for override function types
	 */
	export namespace Override {
		export type TokenFn<T extends CoolContract.Any> = (
			token: Token.DefinitionOptional<T>,
		) => Token.DefinitionOptional<T>;
	}
}

/**
 * Namespace for slot-related types and utilities
 */
export namespace Slot {
	/**
	 * Extracts all slot names from a contract and its inheritance chain
	 */
	export type Of<T extends CoolContract.Any> = T extends {
		"~use"?: infer U;
	}
		? U extends CoolContract.Any
			? T["slot"][number] | Of<U>
			: T["slot"][number]
		: T["slot"][number];

	/**
	 * Mapping type for slot styling configurations
	 */
	export type Mapping<T extends CoolContract.Any> = {
		[K in Of<T>]?: WhatUtil.Value.Any<T>;
	};

	/**
	 * Function type for individual slot functions that return CSS class strings
	 */
	export type Fn<T extends CoolContract.Any> = (
		config?: WhatUtil.Config.Fn<T>,
	) => string;

	/**
	 * Object type containing all slot functions for a contract
	 */
	export type Functions<T extends CoolContract.Any> = {
		[K in Of<T>]: Fn<T>;
	};

	/**
	 * Extracts the slot functions type from a CLS instance for use in component props
	 */
	export type Component<TCls extends Cls<any>> = Functions<TCls["contract"]>;
}

/**
 * Namespace for token-related types and utilities
 */
export namespace Token {
	/**
	 * Required token definitions for all declared tokens
	 */
	export type DefinitionRequired<T extends CoolContract.Any> =
		T["tokens"][number] extends never
			? Record<string, never>
			: { [K in T["tokens"][number]]: WhatUtil.Value.Any<T> };

	/**
	 * Optional token definitions for inherited tokens
	 */
	export type DefinitionOptional<T extends CoolContract.Any> = Partial<
		Record<CoolToken.Extract<T>, WhatUtil.Value.Any<T>>
	>;

	/**
	 * Extended token definitions that handle both required and optional tokens
	 */
	export type DefinitionEx<T extends CoolContract.Any> =
		T["tokens"][number] extends never
			? DefinitionOptional<T> // If no local tokens, only inherited tokens are allowed
			: DefinitionOptional<T> & DefinitionRequired<T>; // If local tokens exist, they are required

	/**
	 * Function type for creating token reference styling values
	 */
	export type Fn<T extends CoolContract.Any> = (
		tokens: CoolToken.Extract<T>[],
	) => WhatUtil.Value.Token<T>;

	/**
	 * Function type for creating token override definitions
	 */
	export type OverrideFn<T extends CoolContract.Any> = (
		token: DefinitionOptional<T>,
	) => DefinitionOptional<T>;

	/**
	 * Function type for creating token definitions
	 */
	export type DefinitionFn<T extends CoolContract.Any> = (
		token: DefinitionEx<T>,
	) => DefinitionEx<T>;
}

export interface RuleDefinition<T extends CoolContract.Any> {
	override?: boolean;
	match?: CoolVariant.Optional<T>;
	slot: Slot.Mapping<T>;
}

export interface WhatUtil<T extends CoolContract.Any> {
	what: {
		css: WhatUtil.What.CssFn;
		token: WhatUtil.What.TokenFn<T>;
		both: WhatUtil.What.BothFn<T>;
		variant: CoolVariant.OptionalFn<T>;
		slot: WhatUtil.What.SlotFn<T>;
	};

	override: {
		root: Contract.Rule.MatchSlotFn<T>;
		rule: Contract.Rule.MatchFn<T>;
		token: WhatUtil.Override.TokenFn<T>;
	};

	def: {
		root: Contract.Rule.MatchSlotFn<T>;
		rule: Contract.Rule.MatchFn<T>;

		token(token: Token.DefinitionRequired<T>): Token.DefinitionRequired<T>;

		defaults: CoolVariant.RequiredFn<T>;
	};
}

export type DefinitionEx<T extends CoolContract.Any> = {
	token: Token.DefinitionEx<T>;
	rules: RuleDefinition<T>[];
	defaults: CoolVariant.VariantOf<T>;
};

export type Definition<T extends CoolContract.Any> = {
	token: Token.DefinitionRequired<T>;
	rules: RuleDefinition<T>[];
	defaults: CoolVariant.VariantOf<T>;
};

export type DefinitionFn<TContract extends CoolContract.Any> = (
	props: WhatUtil<TContract>,
) => Definition<TContract>;

export type CreateConfig<T extends CoolContract.Any> = {
	variant?: Partial<CoolVariant.VariantOf<T>>;
	slot?: Slot.Mapping<T>;
	override?: Slot.Mapping<T>;
	token?: Token.DefinitionOptional<T>;
};

export type Component<TCls extends Cls<any>, P = unknown> = {
	tva?: TCls;

	cls?: (
		props: WhatUtil<TCls["contract"]>,
	) => Partial<CreateConfig<TCls["contract"]>>;
} & Omit<P, "tva" | "cls">;

export type ComponentSlots<TCls extends Cls<any>> = Slot.Component<TCls>;

export type VariantOf<
	TCls extends Cls<any>,
	TVariant extends keyof CoolVariant.Extract<TCls["contract"]>,
> = CoolVariant.Extract<
	TCls["contract"]
>[TVariant] extends readonly (infer U extends string)[]
	? Utility.Value<U>
	: never;

export type VariantsOf<TCls extends Cls<any>> = Partial<
	CoolVariant.VariantOf<TCls["contract"]>
>;

export interface Cls<T extends CoolContract.Any> {
	create(
		userConfigFn?: WhatUtil.Config.Fn<T>,
		internalConfigFn?: WhatUtil.Config.Fn<T>,
	): Slot.Functions<T>;

	extend<
		const TTokenContract extends CoolToken.Type,
		const TSlotContract extends CoolSlot.Type,
		const TVariantContract extends CoolVariant.Type,
	>(
		contract: CoolContract.Type<
			TTokenContract,
			TSlotContract,
			TVariantContract,
			T
		>,
		definition: (
			props: WhatUtilEx<
				CoolContract.Type<
					TTokenContract,
					TSlotContract,
					TVariantContract,
					T
				>
			>,
		) => DefinitionEx<
			CoolContract.Type<
				TTokenContract,
				TSlotContract,
				TVariantContract,
				T
			>
		>,
	): Cls<
		CoolContract.Type<TTokenContract, TSlotContract, TVariantContract, T>
	>;

	use<Sub extends CoolContract.Any>(
		sub: Cls<Sub> & {
			contract: Utility.HasBaseInUseChain<Sub, T> extends true
				? unknown
				: [
						"❌ Not derived from Base contract",
						{
							sub: Sub;
							base: T;
						},
					];
		},
	): Cls<T>;

	cls<Sub extends CoolContract.Any = T>(
		userConfigFn?: {
			hack: Cls.ConfigFn<T, Sub>;
		}["hack"],
		internalConfigFn?: {
			hack: Cls.ConfigFn<T, Sub>;
		}["hack"],
	): WhatUtil.Config.Fn<T> | undefined;

	contract: T;

	definition: Definition<T>;
}
