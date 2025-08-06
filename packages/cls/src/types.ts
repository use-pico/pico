import type { ClassNameValue } from "tailwind-merge";

export type ClassName = ClassNameValue;

export type Slot = readonly [
	string,
	...string[],
];
export type Variant = readonly [
	string,
	...string[],
];

export type TokenGroup = readonly string[];
export type TokenValue = readonly string[];

export interface TokenSchema {
	group: TokenGroup;
	value: TokenValue;
}

export interface Contract<
	TSlot extends Slot,
	TVariant extends Record<string, Variant>,
	TTokens extends TokenSchema = TokenSchema,
	TUse extends Contract<any, any, any> | unknown = unknown,
> {
	slot: TSlot;
	variant: TVariant;
	tokens: TTokens;
	use?: TUse;
}

export type HasBaseInUseChain<Sub, Base> = Sub extends Base
	? true
	: Sub extends {
				use?: infer U;
			}
		? HasBaseInUseChain<U, Base>
		: false;

// --- Slot Helpers ---

export type AllSlotKeys<T> = T extends {
	slot: infer S extends readonly string[];
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? [
				...AllSlotKeys<U>,
				...S,
			]
		: S
	: [];

export type OwnSlotKeys<T extends Contract<any, any, any>> = T["slot"][number];
export type InheritedSlotKeys<T extends Contract<any, any, any>> = Exclude<
	AllSlotKeys<T>[number],
	OwnSlotKeys<T>
>;
export type SlotKey<T extends Contract<any, any, any>> = AllSlotKeys<T>[number];

export type Slots<TContract extends Contract<any, any, any>> = Record<
	OwnSlotKeys<TContract>,
	ClassName
> &
	Partial<Record<InheritedSlotKeys<TContract>, ClassName>>;

// --- Variant Helpers ---

export type VariantRecord = Record<string, readonly string[]>;

export type MergeVariants<A extends VariantRecord, B extends VariantRecord> = {
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

export type VariantEx<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantRecord;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeVariants<VariantEx<U>, V>
		: V
	: {};

export type OwnVariantKeys<T extends Contract<any, any, any>> =
	keyof T["variant"];
export type InheritedVariantKeys<T extends Contract<any, any, any>> = Exclude<
	keyof VariantEx<T>,
	OwnVariantKeys<T>
>;
export type VariantKey<T extends Contract<any, any, any>> = keyof VariantEx<T>;

// --- Token Helpers ---

export type MergeTokens<A extends TokenSchema, B extends TokenSchema> = {
	group: [
		...A["group"],
		...B["group"],
	];
	value: [
		...A["value"],
		...B["value"],
	];
};

export type TokenEx<T extends Contract<any, any, any>> = T extends {
	tokens: infer TTokens extends TokenSchema;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeTokens<TokenEx<U>, TTokens>
		: TTokens
	: {
			group: [];
			value: [];
		};

export type AllTokenGroups<T extends Contract<any, any, any>> =
	TokenEx<T>["group"][number];
export type AllTokenValues<T extends Contract<any, any, any>> =
	TokenEx<T>["value"][number];

export type OwnTokenGroups<T extends Contract<any, any, any>> =
	T["tokens"]["group"][number];
export type OwnTokenValues<T extends Contract<any, any, any>> =
	T["tokens"]["value"][number];

export type InheritedTokenGroups<T extends Contract<any, any, any>> = Exclude<
	AllTokenGroups<T>,
	OwnTokenGroups<T>
>;

// --- Variants ---

export type Variants<TContract extends Contract<any, any, any>> = {
	[K in OwnVariantKeys<TContract>]: {
		[V in VariantEx<TContract>[K][number]]: Partial<
			Record<SlotKey<TContract>, ClassName>
		>;
	};
} & Partial<{
	[K in InheritedVariantKeys<TContract>]: {
		[V in VariantEx<TContract>[K][number]]: Partial<
			Record<SlotKey<TContract>, ClassName>
		>;
	};
}>;

// --- Match Rules ---

type MatchRule<TContract extends Contract<any, any, any>> = {
	if?: { [K in VariantKey<TContract>]?: VariantEx<TContract>[K][number] };
	do?: Partial<Record<SlotKey<TContract>, ClassName>>;
};

// --- Defaults ---

export type Defaults<TContract extends Contract<any, any, any>> = {
	[K in VariantKey<TContract>]: VariantEx<TContract>[K][number];
};

// --- Tokens ---

export type TokenDefinition<T extends Contract<any, any, any>> =
	// Own groups must define all values (both own and inherited)
	{
		[G in OwnTokenGroups<T>]: {
			[V in AllTokenValues<T>]: ClassName[];
		};
	} & (OwnTokenValues<T> extends never // Inherited groups only need to define new values if any exist
		? {}
		: {
				[G in InheritedTokenGroups<T>]?: {
					[V in OwnTokenValues<T>]: ClassName[];
				};
			});

// --- Definition ---

type VariantDefinition<T extends Contract<any, any, any>> = {
	[K in OwnVariantKeys<T>]: {
		[V in VariantEx<T>[K][number]]: Partial<Record<SlotKey<T>, ClassName>>;
	};
} & Partial<{
	[K in InheritedVariantKeys<T>]: {
		[V in VariantEx<T>[K][number]]: Partial<Record<SlotKey<T>, ClassName>>;
	};
}>;

export interface Definition<TContract extends Contract<any, any, any>> {
	slot: Slots<TContract>;
	variant: VariantDefinition<TContract>;
	tokens: TokenDefinition<TContract>;
	match?: MatchRule<TContract>[];
	defaults: Defaults<TContract>;
}

export interface Props<TContract extends Contract<any, any, any>> {
	contract: TContract;
	definition: Definition<TContract>;
}

export interface Cls<TContract extends Contract<any, any, any>> {
	create(): any;
	use<
		const TSlot extends Slot,
		const TVariant extends Record<string, Variant>,
		const TTokens extends TokenSchema,
	>(
		props: Props<Contract<TSlot, TVariant, TTokens, TContract>>,
	): Cls<Contract<TSlot, TVariant, TTokens, TContract>>;
	contract: TContract;
}
