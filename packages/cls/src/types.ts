import type { ClassNameValue } from "tailwind-merge";

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Merge utility for record-based properties with array values
 */
export type MergeRecords<
	A extends Record<string, readonly any[]>,
	B extends Record<string, readonly any[]>,
> = {
	[K in keyof A | keyof B]: K extends keyof B
		? K extends keyof A
			? [
					...A[K],
					...B[K],
				]
			: B[K]
		: K extends keyof A
			? A[K]
			: never;
};

export type StringToBool<TValue extends string> = TValue extends "bool"
	? boolean
	: TValue;

export type HasBaseInUseChain<Sub, Base> = Sub extends Base
	? true
	: Sub extends {
				"~use"?: infer U;
			}
		? HasBaseInUseChain<U, Base>
		: false;

// ============================================================================
// BASIC TYPES
// ============================================================================

export type ClassName = ClassNameValue;
export type SlotContract = readonly string[];
export type TokenContract = Record<string, readonly string[]>;
export type VariantContract = Record<string, readonly string[]>;

export type Contract<
	TTokenContract extends TokenContract,
	TSlotContract extends SlotContract,
	TVariantContract extends VariantContract,
	TUse extends Contract<any, any, any> | unknown = unknown,
> = {
	/**
	 * Define tokens available in the contract. If you're overriding
	 * tokens from the parent, they'll reset so you're starting fresh
	 * with the tokens you've defined.
	 */
	tokens: TTokenContract;
	/**
	 * Slots available to style
	 */
	slot: TSlotContract;
	/**
	 * Available variants to style.
	 *
	 * When a value is "bool" automatically typed as boolean.
	 */
	variant: TVariantContract;
	/**
	 * This is publicly unused value, it's here only for
	 * inheritance support.
	 */
	"~use"?: TUse;
};

// ============================================================================
// TOKEN TYPES
// ============================================================================

export type TokenKey<TContract extends Contract<any, any, any>> =
	`${keyof TContract["tokens"] & string}.${TContract["tokens"][keyof TContract["tokens"]][number]}`;

export type TokensOf<TContract extends Contract<any, any, any>> =
	TContract extends {
		"~use"?: infer TUse;
	}
		? TUse extends Contract<any, any, any>
			? TokenKey<TContract> | TokensOf<TUse>
			: TokenKey<TContract>
		: TokenKey<TContract>;

export type TokensOfList<TContract extends Contract<any, any, any>> = [
	TokensOf<TContract>,
	...TokensOf<TContract>[],
];

export type InheritedTokens<TContract extends Contract<any, any, any>> =
	Exclude<TokensOf<TContract>, TokenKey<TContract>>;

export type TokenDefinition<TContract extends Contract<any, any, any>> = {
	// Support inherited tokens from parent (nested structure)
	[K in InheritedTokens<TContract>]?: {
		[V in TContract["tokens"][K][number]]?: ClassName;
	};
} & {
	// Support current contract tokens in nested structure
	[K in keyof TContract["tokens"]]?: {
		[V in TContract["tokens"][K][number]]: ClassName;
	};
};

// ============================================================================
// SLOT TYPES
// ============================================================================

export type Slot<TContract extends Contract<any, any, any>> =
	TContract["slot"][number];

export type SlotsOf<TContract extends Contract<any, any, any>> =
	TContract extends {
		"~use"?: infer TUse;
	}
		? TUse extends Contract<any, any, any>
			? Slot<TContract> | SlotsOf<TUse>
			: Slot<TContract>
		: Slot<TContract>;

export type SlotsOfList<TContract extends Contract<any, any, any>> = [
	SlotsOf<TContract>,
	...SlotsOf<TContract>[],
];

// ============================================================================
// VARIANT TYPES
// ============================================================================

export type Variants<T extends Contract<any, any, any, any>> = T extends {
	variant: infer V extends VariantContract;
	"~use"?: infer U;
}
	? U extends Contract<any, any, any, any>
		? MergeRecords<Variants<U>, V>
		: V
	: {};

// ============================================================================
// MATCH TYPES
// ============================================================================

export type WhatClass = {
	class: ClassName;
};

export type WhatToken<TContract extends Contract<any, any, any>> = {
	token: TokensOfList<TContract>;
};

export type What<TContract extends Contract<any, any, any>> =
	| WhatClass
	| WhatToken<TContract>;

export type RuleDefinition<TContract extends Contract<any, any, any>> = {
	/**
	 * When override mode is active, this rule reset all classes already generated
	 * and starts over from scratch.
	 */
	override?: boolean;
	/**
	 * When those variants are matched (all must match), this rules applies it's styles.
	 *
	 * If variant is missing, this rules is applied without any conditions.
	 */
	match?: {
		[K in keyof Variants<TContract>]?: StringToBool<
			Variants<TContract>[K][number]
		>;
	};
	/**
	 * Each slot may get different styles based on this match.
	 */
	slot: {
		[k in SlotsOf<TContract>]?: What<TContract>;
	};
};

// ============================================================================
// DEFAULT TYPES
// ============================================================================

export type DefaultDefinition<TContract extends Contract<any, any, any>> = {
	[K in keyof Variants<TContract>]: StringToBool<
		Variants<TContract>[K][number]
	>;
};

// ============================================================================
// PUBLIC API TYPES
// ============================================================================

/**
 * Definition is direct mapping got from contract to ClassName values which are at the end used to compute final class name for a slot
 *
 * @template TContract - The contract type that defines the structure
 */
export type Definition<TContract extends Contract<any, any, any>> = {
	token: TokenDefinition<TContract>;
	rule: RuleDefinition<TContract>[];
	defaults: DefaultDefinition<TContract>;
};

export type CreateConfig<TContract extends Contract<any, any, any>> = {
	token?: string;
	variant?: Partial<DefaultDefinition<TContract>>;
	slot?: Record<
		string,
		{
			class?: ClassName;
			token?: string[];
		}
	>;
};

export type Component<TCls extends Cls<any>, P = unknown> = Partial<
	CreateConfig<TCls["contract"]>
> & {
	tva?: TCls;
} & P;

export interface Cls<TContract extends Contract<any, any, any>> {
	/**
	 * Factory method used in components to create a computed styles
	 * based on inputs (variants).
	 */
	create(config: CreateConfig<TContract>): any;
	/**
	 * Inheritance support - if you need to extend previously defined
	 * "cls", you can use this (ParentCls.extend({...})).
	 */
	extend<
		const TTokenContract extends TokenContract,
		const TSlotContract extends SlotContract,
		const TVariantContract extends VariantContract,
	>(
		contract: Contract<
			TTokenContract,
			TSlotContract,
			TVariantContract,
			TContract
		>,
		definition: Definition<
			Contract<TTokenContract, TSlotContract, TVariantContract, TContract>
		>,
	): Cls<
		Contract<TTokenContract, TSlotContract, TVariantContract, TContract>
	>;
	/**
	 * Because assigning compatible "cls"s between each other could be tricky,
	 * this helper method is used to do so.
	 *
	 * E.g. We've BaseButtonCls and ButtonCls = BaseButtonCls.extend({...})
	 *
	 * If you want assign ButtonCls to BaseButtonCls, you can do so with:
	 *
	 * BaseButtonCls.use(ButtonCls)
	 *
	 * This will return BaseButtonCls with all the styles from ButtonCls.
	 */
	use<Sub extends Contract<any, any, any>>(
		sub: Cls<Sub> & {
			contract: HasBaseInUseChain<Sub, TContract> extends true
				? unknown
				: [
						"❌ Not derived from Base contract",
						{
							sub: Sub;
							base: TContract;
						},
					];
		},
	): Cls<TContract>;
	/**
	 * Just contract.
	 */
	contract: TContract;
}
