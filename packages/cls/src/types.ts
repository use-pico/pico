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

// ============================================================================
// BASIC TYPES
// ============================================================================

export type ClassName = ClassNameValue;
export type SlotContract = readonly string[];
export type TokenContract = readonly string[];
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

export type Token<TContract extends Contract<any, any, any>> =
	TContract["tokens"][number];

export type TokensOf<TContract extends Contract<any, any, any>> =
	TContract extends {
		"~use"?: infer TUse;
	}
		? TUse extends Contract<any, any, any>
			? Token<TContract> | TokensOf<TUse>
			: Token<TContract>
		: Token<TContract>;

export type TokensOfList<TContract extends Contract<any, any, any>> = [
	TokensOf<TContract>,
	...TokensOf<TContract>[],
];

export type InheritedTokens<TContract extends Contract<any, any, any>> =
	Exclude<TokensOf<TContract>, Token<TContract>>;

export type TokenDefinition<TContract extends Contract<any, any, any>> = {
	[K in InheritedTokens<TContract>]?: ClassName;
} & {
	[K in Token<TContract>]: ClassName;
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

export type MatchDefinition<TContract extends Contract<any, any, any>> = {
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
	variant?: {
		[K in keyof Variants<TContract>]?: Variants<TContract>[K][number];
	};
	/**
	 * Which slots are being affected by this rule.
	 */
	slot: SlotsOfList<TContract>;
	/**
	 * What to apply - it may be class, tokens or both.
	 */
	what: What<TContract>;
};

// ============================================================================
// DEFAULT TYPES
// ============================================================================

export type DefaultDefinition<TContract extends Contract<any, any, any>> = {
	[K in keyof Variants<TContract>]: Variants<TContract>[K][number];
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
	match: MatchDefinition<TContract>[];
	defaults: DefaultDefinition<TContract>;
};

export type CreateConfig<TContract extends Contract<any, any, any>> = {};

export type Component<TCls extends Cls<any>, P = unknown> = Partial<
	CreateConfig<TCls["contract"]>
> & {
	tva?: TCls;
} & P;

export interface Cls<TContract extends Contract<any, any, any>> {
	create(config: CreateConfig<TContract>): any;
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
	contract: TContract;
}
