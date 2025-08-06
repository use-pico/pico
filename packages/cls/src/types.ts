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

// ============================================================================
// SLOTS
// ============================================================================

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

/**
 * Merge variants using the generic record merger
 */
export type MergeVariants<
	A extends VariantRecord,
	B extends VariantRecord,
> = MergeRecords<A, B>;

/**
 * Get merged variant record for a contract
 */
export type VariantEx<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantRecord;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeVariants<VariantEx<U>, V>
		: V
	: {};

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

/**
 * Merge token schemas
 */
export type MergeTokens<A extends TokenSchema, B extends TokenSchema> = {
	variant: [
		...A["variant"],
		...B["variant"],
	];
	group: A["group"] & B["group"];
};

/**
 * Get merged token schema for a contract
 */
export type TokenEx<T extends Contract<any, any, any>> = T extends {
	tokens: infer TTokens extends TokenSchema;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeTokens<TokenEx<U>, TTokens>
		: TTokens
	: {
			variant: [];
			group: {};
		};

// Token variant helpers
export type AllTokenVariants<T extends Contract<any, any, any>> =
	TokenEx<T>["variant"][number];
export type OwnTokenVariants<T extends Contract<any, any, any>> =
	T["tokens"]["variant"][number];
export type InheritedTokenVariants<T extends Contract<any, any, any>> = Exclude<
	AllTokenVariants<T>,
	OwnTokenVariants<T>
>;

// Token group helpers
export type AllTokenGroups<T extends Contract<any, any, any>> =
	keyof TokenEx<T>["group"];
export type OwnTokenGroups<T extends Contract<any, any, any>> =
	keyof T["tokens"]["group"];
export type InheritedTokenGroups<T extends Contract<any, any, any>> = Exclude<
	AllTokenGroups<T>,
	OwnTokenGroups<T>
>;

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
 * Helper to build token value structure from group schema
 */
type TokenValueMap<Group extends readonly string[]> =
	Group extends readonly (infer U extends string | number | symbol)[]
		? { [K in U]: ClassName[] }
		: never;

/**
 * Helper to build optional token value structure
 */
type OptionalTokenValueMap<Group extends readonly string[]> =
	Group extends readonly (infer U extends string | number | symbol)[]
		? { [K in U]?: ClassName[] }
		: never;

/**
 * Token definition with smart inheritance
 */
export type TokenDefinition<T extends Contract<any, any, any>> =
	AllTokenVariants<T> extends never
		? {} // No tokens
		: OwnTokenVariants<T> extends never
			? {
					// Only inherited variants (all optional)
					[V in InheritedTokenVariants<T>]?: {
						[G in InheritedTokenGroups<T>]?: OptionalTokenValueMap<
							TokenEx<T>["group"][G]
						>;
					};
				}
			: {
					// Own variants (required with mixed groups)
					[V in OwnTokenVariants<T>]: {
						[G in OwnTokenGroups<T>]: TokenValueMap<
							TokenEx<T>["group"][G]
						>;
					} & {
						[G in InheritedTokenGroups<T>]?: TokenValueMap<
							TokenEx<T>["group"][G]
						>;
					};
				} & {
					// Inherited variants (optional, only new groups required)
					[V in InheritedTokenVariants<T>]?: {
						[G in OwnTokenGroups<T>]: TokenValueMap<
							TokenEx<T>["group"][G]
						>;
					};
				};

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
 * Variant slot value (supports both legacy string and new object format)
 */
export type VariantSlotValue<T extends Contract<any, any, any>> =
	| ClassName
	| {
			class?: ClassName[];
			token?: AllTokenReferences<T>[];
	  };

/**
 * Variant definition structure
 */
export type VariantDefinition<T extends Contract<any, any, any>> = {
	[K in OwnVariantKeys<T>]: {
		[V in VariantEx<T>[K][number]]: Partial<
			Record<SlotKey<T>, VariantSlotValue<T>>
		>;
	};
} & Partial<{
	[K in InheritedVariantKeys<T>]: {
		[V in VariantEx<T>[K][number]]: Partial<
			Record<SlotKey<T>, VariantSlotValue<T>>
		>;
	};
}>;

/**
 * Slot definition structure
 */
export type SlotDefinition<T extends Contract<any, any, any>> = {
	[K in SlotKey<T>]: {
		class: ClassName[];
		token?: AllTokenReferences<T>[];
	};
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
