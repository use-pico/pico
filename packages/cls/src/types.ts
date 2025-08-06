import type { ClassNameValue } from "tailwind-merge";

export type ClassName = ClassNameValue;

export type Slot = readonly string[];
export type Variant = readonly string[];

// New token system: variants (super-groups) + groups with specific values
export type TokenSchema = {
	variant: readonly string[]; // Token variants/themes (e.g., ["default", "extra"])
	group: Record<string, readonly string[]>; // Groups with their values (e.g., spacing: ["small", "medium"])
};

// Legacy types for backward compatibility during transition
export type TokenGroup = readonly string[];
export type TokenValue = readonly string[];

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

export type HasBaseInUseChain<Sub, Base> = Sub extends Base
	? true
	: Sub extends {
				use?: infer U;
			}
		? HasBaseInUseChain<U, Base>
		: false;

// === Generic Inheritance Utilities ===

/**
 * Generic utility for the Own/Inherited/All pattern used throughout the system
 * This eliminates repetition across slots, variants, and tokens
 */
type InheritanceKeys<T, K extends keyof T> = T[K] extends readonly any[]
	? T[K][number]
	: T[K] extends Record<string, any>
		? keyof T[K]
		: never;

/**
 * Note: DefinitionBuilder utility was considered but current patterns
 * are simpler for the specific use cases in this system
 */

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

export type OwnSlotKeys<T extends Contract<any, any, any>> = InheritanceKeys<
	T,
	"slot"
>;
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

/**
 * Generic merge utility for array-based records
 */
type MergeArrayRecords<
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

export type MergeVariants<
	A extends VariantRecord,
	B extends VariantRecord,
> = MergeArrayRecords<A, B>;

export type VariantEx<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantRecord;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeVariants<VariantEx<U>, V>
		: V
	: {};

export type OwnVariantKeys<T extends Contract<any, any, any>> = InheritanceKeys<
	T,
	"variant"
>;
export type InheritedVariantKeys<T extends Contract<any, any, any>> = Exclude<
	keyof VariantEx<T>,
	OwnVariantKeys<T>
>;
export type VariantKey<T extends Contract<any, any, any>> = keyof VariantEx<T>;

// --- Token Helpers ---

// New token system types - merge variants and groups
export type MergeTokens<A extends TokenSchema, B extends TokenSchema> = {
	variant: [
		...A["variant"],
		...B["variant"],
	];
	group: A["group"] & B["group"];
};

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

// Get all token variants from the merged schema
export type AllTokenVariants<T extends Contract<any, any, any>> =
	TokenEx<T>["variant"][number];

// Get all token group names from the merged token schema
export type AllTokenGroups<T extends Contract<any, any, any>> =
	keyof TokenEx<T>["group"];

// Get all possible dot-notation token references (group.value)
export type AllTokenReferences<T extends Contract<any, any, any>> = {
	[K in keyof TokenEx<T>["group"]]: TokenEx<T>["group"][K] extends readonly (infer V)[]
		? `${string & K}.${string & V}`
		: never;
}[keyof TokenEx<T>["group"]];

// Get own token variants (defined in this contract, not inherited)
export type OwnTokenVariants<T extends Contract<any, any, any>> =
	T["tokens"]["variant"][number];

// Get own token groups (defined in this contract, not inherited)
export type OwnTokenGroups<T extends Contract<any, any, any>> =
	keyof T["tokens"]["group"];

// Get inherited token variants
export type InheritedTokenVariants<T extends Contract<any, any, any>> = Exclude<
	AllTokenVariants<T>,
	OwnTokenVariants<T>
>;

// Get inherited token groups
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

// Token definition: smart inheritance with optional inherited items
export type TokenDefinition<T extends Contract<any, any, any>> = 
	// Check if there are any tokens defined (own or inherited)
	AllTokenVariants<T> extends never
		? {} // No tokens at all - empty object
		: OwnTokenVariants<T> extends never
			? {
				// No own variants, only inherited variants allowed (and they're optional)
				// All groups and their values within inherited variants should be optional
				[V in InheritedTokenVariants<T>]?: {
					[G in InheritedTokenGroups<T>]?: TokenEx<T>["group"][G] extends readonly (infer U extends
						| string
						| number
						| symbol)[]
						? { [K in U]?: ClassName[] } // Make individual token values optional too
						: never;
				};
			}
			: {
				// Own variants must implement all groups (inherited + own)
				[V in OwnTokenVariants<T>]: {
					// Own groups are required
					[G in OwnTokenGroups<T>]: TokenEx<T>["group"][G] extends readonly (infer U extends
						| string
						| number
						| symbol)[]
						? { [K in U]: ClassName[] }
						: never;
				} & {
					// Inherited groups are optional (can be extended/overridden)
					[G in InheritedTokenGroups<T>]?: TokenEx<T>["group"][G] extends readonly (infer U extends
						| string
						| number
						| symbol)[]
						? { [K in U]: ClassName[] }
						: never;
				};
			} & {
				// Inherited variants are optional but if defined, only need to implement new groups
				[V in InheritedTokenVariants<T>]?: {
					// Only new groups are required for inherited variants
					[G in OwnTokenGroups<T>]: TokenEx<T>["group"][G] extends readonly (infer U extends
						| string
						| number
						| symbol)[]
						? { [K in U]: ClassName[] }
						: never;
				};
			};

// --- Definition ---

// Variant value structure supporting both legacy string format and new object format
export type VariantSlotValue<T extends Contract<any, any, any>> =
	| ClassName
	| {
			class?: ClassName[];
			token?: AllTokenReferences<T>[]; // Now uses dot notation references
	  };

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

// New slot definition structure with class and token properties
export type SlotDefinition<T extends Contract<any, any, any>> = {
	[K in SlotKey<T>]: {
		class: ClassName[];
		token?: AllTokenReferences<T>[]; // Now uses dot notation references
	};
};

export interface Definition<TContract extends Contract<any, any, any>> {
	slot: SlotDefinition<TContract>;
	variant?: VariantDefinition<TContract>;
	tokens?: TokenDefinition<TContract>;
	match?: MatchRule<TContract>[];
	defaults: Defaults<TContract>;
}

export interface Props<TContract extends Contract<any, any, any>> {
	contract: TContract;
	definition: Definition<TContract>;
}

export interface Cls<TContract extends Contract<any, any, any>> {
	create(): any; // Always allow parameterless call
	create(variant: AllTokenVariants<TContract>): any; // Also allow with variant selection
	use<
		const TSlot extends Slot,
		const TVariant extends Record<string, Variant>,
		const TTokens extends TokenSchema,
	>(
		contract: Contract<TSlot, TVariant, TTokens>,
		definition: Definition<Contract<TSlot, TVariant, TTokens, TContract>>,
	): Cls<Contract<TSlot, TVariant, TTokens, TContract>>;
	contract: TContract;
}
