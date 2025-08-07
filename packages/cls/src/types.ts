import type { ClassNameValue } from "tailwind-merge";

// ============================================================================
// BASIC TYPES
// ============================================================================

export type ClassName = ClassNameValue;
export type Slot = readonly string[];
export type Variant = readonly string[];
export type VariantRecord = Record<string, readonly string[]>;

/**
 * Token schema definition - enforces exact structure with generic values
 *
 * @example
 * ```typescript
 * tokens: {
 *   variant: ["default", "primary"],    // Required: token variants/themes
 *   group: {                            // Required: token groups
 *     spacing: ["sm", "md", "lg"],
 *     color: ["blue", "red", "green"]
 *   }
 * }
 * ```
 */
export interface TokenSchema<
	TVariants extends readonly string[],
	TGroups extends Record<string, readonly string[]>,
> {
	/** Array of token variant names (e.g., "default", "primary") */
	readonly variant: TVariants;
	/** Object mapping group names to their possible values */
	readonly group: TGroups;
}

/**
 * Core contract interface defining the structure of a cls component
 *
 * @template TSlot - Slot definition (which slots are available for components)
 * @template TVariant - Available variants and their values
 * @template TTokenVariants - Token variant names (e.g., "default", "primary")
 * @template TTokenGroups - Token group definitions (e.g., spacing, color)
 * @template TUse - Extension contract for inheritance (normally unused, used primarily for type inference)
 */
export interface Contract<
	TSlot extends Slot,
	TVariant extends VariantRecord,
	TTokenVariants extends readonly string[],
	TTokenGroups extends Record<string, readonly string[]>,
	TUse extends Contract<any, any, any, any, any> | unknown = unknown,
> {
	/** Extension contract for inheritance - normally unused (used primarily for type inference) */
	use?: TUse;
	/** Design token support - definition of which tokens are available to "cls" for dynamic values */
	tokens: TokenSchema<TTokenVariants, TTokenGroups>;
	/** Slot definition (which slots are available for components) */
	slot: TSlot;
	/** Available variants and their values */
	variant: TVariant;
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
	? U extends Contract<any, any, any, any, any>
		? [
				...SlotInheritance<U>,
				...S,
			]
		: S
	: [];

type VariantInheritance<T extends Contract<any, any, any, any, any>> =
	T extends {
		variant: infer V extends VariantRecord;
		use?: infer U;
	}
		? U extends Contract<any, any, any, any, any>
			? MergeRecords<VariantInheritance<U>, V>
			: V
		: {};

type TokenInheritance<T extends Contract<any, any, any, any, any>> = T extends {
	tokens: infer TTokens extends TokenSchema<any, any>;
	use?: infer U;
}
	? U extends Contract<any, any, any, any, any>
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
export type OwnSlotKeys<T extends Contract<any, any, any, any, any>> =
	ExtractKeys<T, "slot">;
export type InheritedSlotKeys<T extends Contract<any, any, any, any, any>> =
	Exclude<AllSlotKeys<T>[number], OwnSlotKeys<T>>;
export type SlotKey<T extends Contract<any, any, any, any, any>> =
	AllSlotKeys<T>[number];

// ============================================================================
// VARIANTS
// ============================================================================

export type VariantEx<T extends Contract<any, any, any, any, any>> =
	VariantInheritance<T>;
export type OwnVariantKeys<T extends Contract<any, any, any, any, any>> =
	ExtractKeys<T, "variant">;
export type InheritedVariantKeys<T extends Contract<any, any, any, any, any>> =
	Exclude<keyof VariantEx<T>, OwnVariantKeys<T>>;
export type VariantKey<T extends Contract<any, any, any, any, any>> =
	keyof VariantEx<T>;

// ============================================================================
// TOKENS
// ============================================================================

export type TokenEx<T extends Contract<any, any, any, any, any>> =
	TokenInheritance<T>;

// Token helpers (variants and groups)
export type AllTokenVariants<T extends Contract<any, any, any, any, any>> =
	TokenEx<T>["variant"][number];
export type OwnTokenVariants<T extends Contract<any, any, any, any, any>> =
	T["tokens"]["variant"][number];
export type InheritedTokenVariants<
	T extends Contract<any, any, any, any, any>,
> = Exclude<AllTokenVariants<T>, OwnTokenVariants<T>>;

export type AllTokenGroups<T extends Contract<any, any, any, any, any>> =
	keyof TokenEx<T>["group"];
export type OwnTokenGroups<T extends Contract<any, any, any, any, any>> =
	keyof T["tokens"]["group"];
export type InheritedTokenGroups<T extends Contract<any, any, any, any, any>> =
	Exclude<AllTokenGroups<T>, OwnTokenGroups<T>>;

type TokenValues<Group extends readonly string[]> =
	Group extends readonly (infer U extends string | number | symbol)[]
		? { [K in U]: ClassName[] }
		: never;

type OptionalTokenValues<Group extends readonly string[]> =
	Group extends readonly (infer U extends string | number | symbol)[]
		? { [K in U]?: ClassName[] }
		: never;

// Token references (dot notation: group.value)
export type AllTokenReferences<T extends Contract<any, any, any, any, any>> = {
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
type InheritedOnlyTokens<T extends Contract<any, any, any, any, any>> = {
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
	T extends Contract<any, any, any, any, any>,
	// biome-ignore lint: Used in mapped type
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
	T extends Contract<any, any, any, any, any>,
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
type OwnTokensWithInherited<T extends Contract<any, any, any, any, any>> = {
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
export type TokenDefinition<T extends Contract<any, any, any, any, any>> =
	AllTokenVariants<T> extends never
		? {}
		: OwnTokenVariants<T> extends never
			? InheritedOnlyTokens<T>
			: OwnTokensWithInherited<T>;

/**
 * Match rule structure
 */
type MatchRule<T extends Contract<any, any, any, any, any>> = {
	if?: { [K in VariantKey<T>]?: VariantEx<T>[K][number] };
	do?: Partial<Record<SlotKey<T>, ClassName>>;
};

/**
 * Defaults structure
 */
export type Defaults<T extends Contract<any, any, any, any, any>> = {
	[K in VariantKey<T>]: VariantEx<T>[K][number];
};

/**
 * Common slot value structure (used in both slots and variants)
 */
type SlotValue<T extends Contract<any, any, any, any, any>> = {
	class: ClassName[];
	token?: AllTokenReferences<T>[];
};

/**
 * Variant slot value (only supports {class, token} object format)
 */
export type VariantSlotValue<T extends Contract<any, any, any, any, any>> =
	Partial<SlotValue<T>>;

/**
 * Slot definition structure
 */
export type SlotDefinition<T extends Contract<any, any, any, any, any>> = {
	[K in SlotKey<T>]: SlotValue<T>;
};

/**
 * Variant definition with proper inheritance - own variants required, inherited completely optional
 */
export type VariantDefinition<T extends Contract<any, any, any, any, any>> = {
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

/**
 * Definition is direct mapping got from contract to ClassName values which are at the end used to compute final class name for a slot
 *
 * @template TContract - The contract type that defines the structure
 */
export interface Definition<
	TContract extends Contract<any, any, any, any, any>,
> {
	/** Slot definitions mapping slot names to their class configurations */
	slot: SlotDefinition<TContract>;
	/** Variant definitions mapping variant values to slot overrides */
	variant?: VariantDefinition<TContract>;
	/** Token definitions mapping token references to actual CSS classes */
	tokens?: TokenDefinition<TContract>;
	/** Match rules for conditional styling based on variant combinations */
	match?: MatchRule<TContract>[];
	/** Default variant values used when no specific variants are provided */
	defaults: Defaults<TContract>;
}

export interface CreateConfig<
	TContract extends Contract<any, any, any, any, any>,
> {
	/**
	 * Token used to select proper token group (e.g. a theme).
	 */
	token: AllTokenVariants<TContract>;
	/**
	 * Variant override from default ones
	 */
	variant?: Partial<{
		[K in VariantKey<TContract>]: VariantEx<TContract>[K][number];
	}>;
	/**
	 * Slot extensions (classes defined here will append ones already computed).
	 */
	slot?: {
		[K in SlotKey<TContract>]?: Partial<SlotValue<TContract>>;
	};
}

/**
 * Type for slots override configuration
 */
export type SlotsOverrideConfig = Record<
	string,
	{
		class?: string[];
		token?: string[];
	}
>;

/**
 * Type for resolved token definition structure
 */
export type ResolvedTokenDefinition = Record<
	string,
	Record<string, Record<string, ClassName[]>>
>;

/**
 * Type for resolved slot configuration
 */
export type ResolvedSlotConfig = Record<string, any>;

/**
 * Type for resolved variant configuration
 */
export type ResolvedVariantConfig = Record<string, any>;

/**
 * Type for the slots proxy object (maps slot names to class strings)
 */
export type SlotsProxy<TContract extends Contract<any, any, any, any, any>> = {
	[K in SlotKey<TContract>]: string;
};

/**
 * Type for the slots object returned by create()
 */
export type ClsSlots<TContract extends Contract<any, any, any, any, any>> = {
	slots: SlotsProxy<TContract>;
};

export type Component<TCls extends Cls<any>, P = unknown> = Partial<
	CreateConfig<TCls["contract"]>
> & {
	tva?: TCls;
} & P;

export interface Cls<TContract extends Contract<any, any, any, any, any>> {
	create(config: CreateConfig<TContract>): ClsSlots<TContract>;
	use<
		const TSlot extends Slot,
		const TVariant extends VariantRecord,
		const TTokenVariants extends readonly string[],
		const TTokenGroups extends Record<string, readonly string[]>,
	>(
		contract: Contract<
			TSlot,
			TVariant,
			TTokenVariants,
			TTokenGroups,
			TContract
		>,
		definition: Definition<
			Contract<TSlot, TVariant, TTokenVariants, TTokenGroups, TContract>
		>,
	): Cls<Contract<TSlot, TVariant, TTokenVariants, TTokenGroups, TContract>>;
	contract: TContract;
}
