import type { ClassNameValue } from "tailwind-merge";

// ============================================================================
// BASIC TYPES
// ============================================================================

export type ClassName = ClassNameValue;
export type Slot = readonly string[];
export type Variant = readonly string[];
export type VariantRecord = Record<string, readonly string[]>;

export type TokenSchema = {
	variant: readonly string[];
	group: Record<string, readonly string[]>;
};

export interface Contract<
	TSlot extends Slot,
	TVariant extends VariantRecord,
	TTokens extends TokenSchema = TokenSchema,
	TUse extends Contract<any, any, any> | unknown = unknown,
> {
	slot: TSlot;
	variant: TVariant;
	tokens: TTokens;
	use?: TUse;
}

// ============================================================================
// INHERITANCE UTILITIES
// ============================================================================

export type HasBaseInUseChain<Sub, Base> = Sub extends Base
	? true
	: Sub extends {
				use?: infer U;
			}
		? HasBaseInUseChain<U, Base>
		: false;

/**
 * Core inheritance pattern: Own + Inherited = All
 * Used consistently across slots, variants, and tokens
 */
type ExtractKeys<T, K extends keyof T> = T[K] extends readonly any[]
	? T[K][number]
	: T[K] extends Record<string, any>
		? keyof T[K]
		: never;

/**
 * Merge utility for record-based properties with array values
 */
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

/**
 * Unified inheritance pattern for specific known types
 */
type SlotInheritance<T> = T extends {
	slot: infer S extends readonly string[];
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? [
				...SlotInheritance<U>,
				...S,
			]
		: S
	: [];

type VariantInheritance<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantRecord;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeRecords<VariantInheritance<U>, V>
		: V
	: {};

type TokenInheritance<T extends Contract<any, any, any>> = T extends {
	tokens: infer TTokens extends TokenSchema;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? {
				variant: [
					...TokenInheritance<U>["variant"],
					...TTokens["variant"],
				];
				group: MergeRecords<
					TokenInheritance<U>["group"],
					TTokens["group"]
				>;
			}
		: TTokens
	: {
			variant: [];
			group: {};
		};

// ============================================================================
// SLOTS
// ============================================================================

export type AllSlotKeys<T> = SlotInheritance<T>;
export type OwnSlotKeys<T extends Contract<any, any, any>> = ExtractKeys<
	T,
	"slot"
>;
export type InheritedSlotKeys<T extends Contract<any, any, any>> = Exclude<
	AllSlotKeys<T>[number],
	OwnSlotKeys<T>
>;
export type SlotKey<T extends Contract<any, any, any>> = AllSlotKeys<T>[number];

// ============================================================================
// VARIANTS
// ============================================================================

export type VariantEx<T extends Contract<any, any, any>> =
	VariantInheritance<T>;
export type OwnVariantKeys<T extends Contract<any, any, any>> = ExtractKeys<
	T,
	"variant"
>;
export type InheritedVariantKeys<T extends Contract<any, any, any>> = Exclude<
	keyof VariantEx<T>,
	OwnVariantKeys<T>
>;
export type VariantKey<T extends Contract<any, any, any>> = keyof VariantEx<T>;

// ============================================================================
// TOKENS
// ============================================================================

export type TokenEx<T extends Contract<any, any, any>> = TokenInheritance<T>;

// Token helpers (variants and groups)
export type AllTokenVariants<T extends Contract<any, any, any>> =
	TokenEx<T>["variant"][number];
export type OwnTokenVariants<T extends Contract<any, any, any>> =
	T["tokens"]["variant"][number];
export type InheritedTokenVariants<T extends Contract<any, any, any>> = Exclude<
	AllTokenVariants<T>,
	OwnTokenVariants<T>
>;

export type AllTokenGroups<T extends Contract<any, any, any>> =
	keyof TokenEx<T>["group"];
export type OwnTokenGroups<T extends Contract<any, any, any>> =
	keyof T["tokens"]["group"];
export type InheritedTokenGroups<T extends Contract<any, any, any>> = Exclude<
	AllTokenGroups<T>,
	OwnTokenGroups<T>
>;

type TokenValues<Group extends readonly string[]> =
	Group extends readonly (infer U extends string | number | symbol)[]
		? { [K in U]: ClassName[] }
		: never;

type OptionalTokenValues<Group extends readonly string[]> =
	Group extends readonly (infer U extends string | number | symbol)[]
		? { [K in U]?: ClassName[] }
		: never;

// Token references (dot notation: group.value)
export type AllTokenReferences<T extends Contract<any, any, any>> = {
	[K in keyof TokenEx<T>["group"]]: TokenEx<T>["group"][K] extends readonly (infer V)[]
		? `${string & K}.${string & V}`
		: never;
}[keyof TokenEx<T>["group"]];

// ============================================================================
// DEFINITION TYPES
// ============================================================================

/**
 * Token variant structures with proper inheritance intellisense
 */
type InheritedOnlyTokens<T extends Contract<any, any, any>> = {
	[V in InheritedTokenVariants<T>]?: {
		[G in InheritedTokenGroups<T>]?: OptionalTokenValues<
			TokenEx<T>["group"][G]
		>;
	};
};

/**
 * Step 1: Build the complete token structure for a variant
 */
type TokenVariantStructure<
	T extends Contract<any, any, any>,
	V extends string,
> = {
	[G in AllTokenGroups<T>]: {
		[K in TokenEx<T>["group"][G][number]]: ClassName[];
	};
};

/**
 * Step 2: Make specific properties optional based on inheritance rules
 */
type MakeInheritedOptional<
	T extends Contract<any, any, any>,
	Structure extends Record<string, Record<string, any>>,
> = {
	// Own groups: required, but with inherited values made optional
	[G in keyof Structure as G extends OwnTokenGroups<T> ? G : never]: {
		// Own values: required
		[K in keyof Structure[G] as K extends T["tokens"]["group"][G &
			keyof T["tokens"]["group"]][number]
			? K
			: never]: Structure[G][K];
	} & {
		// Inherited values: optional
		[K in keyof Structure[G] as K extends T["tokens"]["group"][G &
			keyof T["tokens"]["group"]][number]
			? never
			: K]?: Structure[G][K];
	};
} & {
	// Pure inherited groups: completely optional
	[G in keyof Structure as G extends OwnTokenGroups<T> ? never : G]?: {
		[K in keyof Structure[G]]?: Structure[G][K];
	};
};

/**
 * Step 3: Apply the utility to build the final type
 */
type OwnTokensWithInherited<T extends Contract<any, any, any>> = {
	[V in OwnTokenVariants<T>]: MakeInheritedOptional<
		T,
		TokenVariantStructure<T, V>
	>;
} & {
	// Inherited variants: only own groups required (if we define them at all)
	[V in InheritedTokenVariants<T>]?: {
		[G in OwnTokenGroups<T>]: TokenValues<TokenEx<T>["group"][G]>;
	};
};

/**
 * Clean token definition with smart inheritance
 */
export type TokenDefinition<T extends Contract<any, any, any>> =
	AllTokenVariants<T> extends never
		? {}
		: OwnTokenVariants<T> extends never
			? InheritedOnlyTokens<T>
			: OwnTokensWithInherited<T>;

/**
 * Match rule structure
 */
type MatchRule<T extends Contract<any, any, any>> = {
	if?: { [K in VariantKey<T>]?: VariantEx<T>[K][number] };
	do?: Partial<Record<SlotKey<T>, ClassName>>;
};

/**
 * Defaults structure
 */
export type Defaults<T extends Contract<any, any, any>> = {
	[K in VariantKey<T>]: VariantEx<T>[K][number];
};

/**
 * Common slot value structure (used in both slots and variants)
 */
type SlotValue<T extends Contract<any, any, any>> = {
	class: ClassName[];
	token?: AllTokenReferences<T>[];
};

/**
 * Variant slot value (supports both legacy string and new object format)
 */
export type VariantSlotValue<T extends Contract<any, any, any>> =
	| ClassName
	| Partial<SlotValue<T>>;

/**
 * Slot definition structure
 */
export type SlotDefinition<T extends Contract<any, any, any>> = {
	[K in SlotKey<T>]: SlotValue<T>;
};

/**
 * Variant definition with proper inheritance - own variants required, inherited completely optional
 */
export type VariantDefinition<T extends Contract<any, any, any>> = {
	[K in OwnVariantKeys<T>]: {
		[V in VariantEx<T>[K][number]]: Partial<
			Record<SlotKey<T>, VariantSlotValue<T>>
		>;
	};
} & {
	[K in InheritedVariantKeys<T>]?: Partial<{
		[V in VariantEx<T>[K][number]]: Partial<
			Record<SlotKey<T>, VariantSlotValue<T>>
		>;
	}>;
};

// ============================================================================
// MAIN INTERFACES
// ============================================================================

export interface Definition<T extends Contract<any, any, any>> {
	slot: SlotDefinition<T>;
	variant?: VariantDefinition<T>;
	tokens?: TokenDefinition<T>;
	match?: MatchRule<T>[];
	defaults: Defaults<T>;
}

export interface Props<T extends Contract<any, any, any>> {
	contract: T;
	definition: Definition<T>;
}

export interface Cls<T extends Contract<any, any, any>> {
	create(): any;
	create(variant: AllTokenVariants<T>): any;
	use<
		const TSlot extends Slot,
		const TVariant extends Record<string, Variant>,
		const TTokens extends TokenSchema,
	>(
		contract: Contract<TSlot, TVariant, TTokens>,
		definition: Definition<Contract<TSlot, TVariant, TTokens, T>>,
	): Cls<Contract<TSlot, TVariant, TTokens, T>>;
	contract: T;
}
