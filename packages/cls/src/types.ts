import type { ClassNameValue } from "tailwind-merge";

// ============================================================================
// CORE TYPE DEFINITIONS
// ============================================================================

export type ClassName = ClassNameValue;
export type SlotContract = readonly string[];
export type TokenContract = readonly string[];
export type VariantContract = Record<string, readonly string[]>;

// ============================================================================
// UTILITY TYPES
// ============================================================================

type ListOf<T> = [
	T,
	...T[],
];

type StringToBool<T extends string> = T extends "bool" ? boolean : T;

type MergeRecords<
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

export type HasBaseInUseChain<Sub, Base> = Sub extends Base
	? true
	: Sub extends {
				"~use"?: infer U;
			}
		? HasBaseInUseChain<U, Base>
		: false;

// ============================================================================
// CONTRACT SYSTEM
// ============================================================================

export type Contract<
	TTokenContract extends TokenContract,
	TSlotContract extends SlotContract,
	TVariantContract extends VariantContract,
	TUse extends Contract<any, any, any> | unknown = unknown,
> = {
	tokens: TTokenContract;
	slot: TSlotContract;
	variant: TVariantContract;
	"~use"?: TUse;
	"~definition"?: Definition<any>;
};

export type ContractEx<
	TTokenContract extends TokenContract,
	TSlotContract extends SlotContract,
	TVariantContract extends VariantContract,
	TBaseContract extends Contract<any, any, any>,
> = {
	tokens: TTokenContract;
	slot: TSlotContract;
	variant: TVariantContract;
	"~use"?: TBaseContract;
	"~definition"?: Definition<any>;
};

// ============================================================================
// TOKEN SYSTEM
// ============================================================================

type TokensOf<T extends Contract<any, any, any>> = T extends {
	"~use"?: infer U;
}
	? U extends Contract<any, any, any>
		? T["tokens"][number] | TokensOf<U>
		: T["tokens"][number]
	: T["tokens"][number];

export type TokensOfList<T extends Contract<any, any, any>> = ListOf<
	TokensOf<T>
>;

// Updated: Token definitions now support What<T> objects (CSS classes + token references)
export type TokenDefinitionRequired<T extends Contract<any, any, any>> = {
	[K in T["tokens"][number]]: What<T>;
};

export type TokenDefinitionOptional<T extends Contract<any, any, any>> =
	Partial<Record<TokensOf<T>, What<T>>>;

// ============================================================================
// SLOT SYSTEM
// ============================================================================

type SlotsOf<T extends Contract<any, any, any>> = T extends {
	"~use"?: infer U;
}
	? U extends Contract<any, any, any>
		? T["slot"][number] | SlotsOf<U>
		: T["slot"][number]
	: T["slot"][number];

export type SlotMapping<T extends Contract<any, any, any>> = {
	[K in SlotsOf<T>]?: What<T>;
};

export type WhatConfigFn<T extends Contract<any, any, any>> = (
	props: WhatUtil<T>,
) => Partial<CreateConfig<T>>;

export type ClsSlotFn<T extends Contract<any, any, any>> = (
	config?: WhatConfigFn<T>,
) => string;

export type ClsSlots<T extends Contract<any, any, any>> = {
	[K in SlotsOf<T>]: ClsSlotFn<T>;
};

// ============================================================================
// VARIANT SYSTEM
// ============================================================================

type Variants<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantContract;
	"~use"?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeRecords<Variants<U>, V>
		: V
	: {};

export type VariantValueMapping<T extends Contract<any, any, any>> = {
	[K in keyof Variants<T>]: StringToBool<Variants<T>[K][number]>;
};

// ============================================================================
// STYLING CONFIGURATION TYPES
// ============================================================================

export type WhatClass = {
	class: ClassName;
};
export type WhatToken<T extends Contract<any, any, any>> = {
	token: TokensOfList<T>;
};
export type What<T extends Contract<any, any, any>> = WhatClass | WhatToken<T>;

export interface RuleDefinition<T extends Contract<any, any, any>> {
	override?: boolean;
	match?: Partial<VariantValueMapping<T>>;
	slot: SlotMapping<T>;
}

export type MatchFn<TContract extends Contract<any, any, any>> = (
	match: RuleDefinition<TContract>["match"] | undefined,
	slot: SlotMapping<TContract>,
	override?: boolean,
) => RuleDefinition<TContract>;

export type MatchSlotFn<TContract extends Contract<any, any, any>> = (
	slot: SlotMapping<TContract>,
	override?: boolean,
) => RuleDefinition<TContract>;

export interface WhatUtil<T extends Contract<any, any, any>> {
	what: {
		css(classes: ClassName): WhatClass;
		token(tokens: TokensOfList<T>): WhatToken<T>;
		both(classes: ClassName, tokens: TokensOfList<T>): What<T>;
		variant(
			variant: Partial<VariantValueMapping<T>>,
		): Partial<VariantValueMapping<T>>;
		slot(slot: SlotMapping<T>): SlotMapping<T>;
	};
	override: {
		root: MatchSlotFn<T>;
		rule: MatchFn<T>;
		token(
			token: Partial<TokenDefinitionOptional<T>>,
		): Partial<TokenDefinitionOptional<T>>;
	};
	def: {
		root: MatchSlotFn<T>;
		rule: MatchFn<T>;
		token(token: TokenDefinitionRequired<T>): TokenDefinitionRequired<T>;
		defaults(defaults: VariantValueMapping<T>): VariantValueMapping<T>;
	};
}

export type WhatUtilEx<T extends Contract<any, any, any>> = Omit<
	WhatUtil<T>,
	"def"
> & {
	def: Omit<WhatUtil<T>["def"], "token"> & {
		token(token: TokenDefinitionRequired<T>): TokenDefinitionRequired<T>;
	};
};

export type DefinitionEx<T extends Contract<any, any, any>> = {
	token: TokenDefinitionRequired<T>;
	rules: RuleDefinition<T>[];
	defaults: VariantValueMapping<T>;
};

// ============================================================================
// PUBLIC API TYPES
// ============================================================================

export type Definition<T extends Contract<any, any, any>> = {
	token: TokenDefinitionRequired<T>;
	rules: RuleDefinition<T>[];
	defaults: VariantValueMapping<T>;
};

export type CreateConfig<T extends Contract<any, any, any>> = {
	variant?: Partial<VariantValueMapping<T>>;
	slot?: SlotMapping<T>;
	override?: SlotMapping<T>;
	token?: Partial<TokenDefinitionOptional<T>>;
};

export type Component<TCls extends Cls<any>, P = unknown> = {
	tva?: TCls;
	cls?: (
		props: WhatUtil<TCls["contract"]>,
	) => Partial<CreateConfig<TCls["contract"]>>;
} & Omit<P, "tva" | "cls">;

export type ComponentSlots<TCls extends Cls<any>> = ClsSlots<TCls["contract"]>;

export interface Cls<T extends Contract<any, any, any>> {
	create(
		userConfigFn?: WhatConfigFn<T>,
		internalConfigFn?: WhatConfigFn<T>,
	): ClsSlots<T>;

	extend<
		const TTokenContract extends TokenContract,
		const TSlotContract extends SlotContract,
		const TVariantContract extends VariantContract,
	>(
		contract: Contract<TTokenContract, TSlotContract, TVariantContract, T>,
		definition: (
			props: WhatUtilEx<
				Contract<TTokenContract, TSlotContract, TVariantContract, T>
			>,
		) => DefinitionEx<
			Contract<TTokenContract, TSlotContract, TVariantContract, T>
		>,
	): Cls<ContractEx<TTokenContract, TSlotContract, TVariantContract, T>>;

	use<Sub extends Contract<any, any, any>>(
		sub: Cls<Sub> & {
			contract: HasBaseInUseChain<Sub, T> extends true
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

	cls<Sub extends Contract<any, any, any> = T>(
		userConfigFn?: {
			hack: WhatConfigFn<
				HasBaseInUseChain<Sub, T> extends true ? Sub : never
			>;
		}["hack"],
		internalConfigFn?: {
			hack: WhatConfigFn<
				HasBaseInUseChain<Sub, T> extends true ? Sub : never
			>;
		}["hack"],
	): WhatConfigFn<T> | undefined;

	contract: T;
	definition: Definition<T>;
}
