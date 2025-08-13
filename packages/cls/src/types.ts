import type { MatchFn, MatchSlotFn } from "./match";

// ============================================================================
// CORE TYPE DEFINITIONS
// ============================================================================

export type ClassName = string[] | undefined | null;

export type SlotContract = readonly string[];

// Flat-only token contract: list of full token keys (e.g., "color.bg.default")
export type TokenContract = readonly string[];

export type VariantContract = Record<string, readonly string[]>;

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Generic list type utility for creating tuple types
 */
type ListOf<T> = [
	T,
	...T[],
];

/**
 * Converts string literal "bool" to boolean type, otherwise keeps the string
 */
type StringToBool<TValue extends string> = TValue extends "bool"
	? boolean
	: TValue;

/**
 * Merges two record types with array values, combining arrays for matching keys
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
 * Checks if a contract is derived from a base contract through inheritance chain
 */
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
	/** Token definitions as flat keys */
	tokens: TTokenContract;
	/** Available slots for the component */
	slot: TSlotContract;
	/** Available variants for the component */
	variant: TVariantContract;
	/** Parent contract for inheritance (internal use) */
	"~use"?: TUse;
	/**
	 * Just carry parent definition, if available; the type is not
	 * important as it's not used in inference; only to compute
	 * right inheritance chain
	 */
	"~definition"?: Definition<any>;
};

/**
 * Extended contract type that properly handles inheritance
 * This type ensures that extended contracts can inherit tokens from parent contracts
 * while allowing new token definitions and overrides
 */
export type ContractEx<
	TTokenContract extends TokenContract,
	TSlotContract extends SlotContract,
	TVariantContract extends VariantContract,
	TBaseContract extends Contract<any, any, any>,
> = {
	/** Token definitions as flat keys - inherits from parent */
	tokens: TTokenContract;
	/** Available slots for the component */
	slot: TSlotContract;
	/** Available variants for the component */
	variant: TVariantContract;
	/** Parent contract for inheritance (internal use) */
	"~use"?: TBaseContract;
	/**
	 * Just carry parent definition, if available; the type is not
	 * important as it's not used in inference; only to compute
	 * right inheritance chain
	 */
	"~definition"?: Definition<any>;
};

/**
 * Extended WhatUtil type that provides child-only token definitions
 */
export type WhatUtilEx<TChildContract extends Contract<any, any, any>> = Omit<
	WhatUtil<TChildContract>,
	"def"
> & {
	def: Omit<WhatUtil<TChildContract>["def"], "token"> & {
		token(
			token: TokenDefinitionRequired<TChildContract>,
		): TokenDefinitionRequired<TChildContract>;
	};
};

/**
 * Extended definition type that only requires child contract tokens
 * Inherited tokens are handled at runtime, not at the type level
 */
export type DefinitionEx<TChildContract extends Contract<any, any, any>> = {
	/** Token definitions with proper inheritance handling */
	token: TokenDefinitionRequired<TChildContract>;
	/** Rules for conditional styling based on variants */
	rules: RuleDefinition<TChildContract>[];
	/** Default values for variants */
	defaults: VariantValueMapping<TChildContract>;
};

// ============================================================================
// TOKEN SYSTEM (FLAT)
// ============================================================================

/**
 * Recursively collects all token keys from current and inherited contracts
 */
type TokensOf<TContract extends Contract<any, any, any>> = TContract extends {
	"~use"?: infer TUse;
}
	? TUse extends Contract<any, any, any>
		? TContract["tokens"][number] | TokensOf<TUse>
		: TContract["tokens"][number]
	: TContract["tokens"][number];

/**
 * Creates a tuple type for lists of TokensOf
 */
export type TokensOfList<TContract extends Contract<any, any, any>> = ListOf<
	TokensOf<TContract>
>;

type LocalTokens<TContract extends Contract<any, any, any>> =
	TContract["tokens"][number];

// Only flat keys are supported.

// ----------------------------------------------------------------------------
// Flat token definition shapes
// ----------------------------------------------------------------------------

/**
 * Flat required token definition for the current contract with optional inherited keys.
 */
export type TokenDefinitionRequired<TContract extends Contract<any, any, any>> =
	{
		[K in LocalTokens<TContract>]: ClassName;
	};

/**
 * Flat optional token definition for overrides (create/override paths).
 */
export type TokenDefinitionOptional<TContract extends Contract<any, any, any>> =
	Partial<Record<TokensOf<TContract>, string[]>>;

// ============================================================================
// SLOT SYSTEM
// ============================================================================

/**
 * Extracts slot names from a contract
 */
type Slot<TContract extends Contract<any, any, any>> =
	TContract["slot"][number];

/**
 * Recursively collects all slot names from current and inherited contracts
 */
type SlotsOf<TContract extends Contract<any, any, any>> = TContract extends {
	"~use"?: infer TUse;
}
	? TUse extends Contract<any, any, any>
		? Slot<TContract> | SlotsOf<TUse>
		: Slot<TContract>
	: Slot<TContract>;

/**
 * Utility for mapping slots to their configurations
 */
export type SlotMapping<TContract extends Contract<any, any, any>> = {
	[K in SlotsOf<TContract>]?: What<TContract>;
};

export type WhatConfigFn<TContract extends Contract<any, any, any>> = (
	props: WhatUtil<TContract>,
) => Partial<CreateConfig<TContract>>;

export type ClsSlotFn<TContract extends Contract<any, any, any>> = (
	config?: WhatConfigFn<TContract>,
) => string;

/**
 * Resolved slot classes returned by create().
 * Keys are all slots from the contract (including inherited), values are class strings.
 */
export type ClsSlots<TContract extends Contract<any, any, any>> = {
	[K in SlotsOf<TContract>]: ClsSlotFn<TContract>;
};

// ============================================================================
// VARIANT SYSTEM
// ============================================================================

/**
 * Recursively merges variants from current and inherited contracts
 */
type Variants<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantContract;
	"~use"?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeRecords<Variants<U>, V>
		: V
	: {};

/**
 * Utility for mapping variant keys to their processed values
 */
export type VariantValueMapping<T extends Contract<any, any, any>> = {
	[K in keyof Variants<T>]: StringToBool<Variants<T>[K][number]>;
};

// ============================================================================
// STYLING CONFIGURATION TYPES
// ============================================================================

/**
 * Represents a direct class name assignment
 */
export type WhatClass = {
	class: ClassName;
};

/**
 * Represents a token reference for dynamic styling
 */
export type WhatToken<TContract extends Contract<any, any, any>> = {
	token: TokensOfList<TContract>;
};

/**
 * Union type for slot styling configurations
 */
export type What<TContract extends Contract<any, any, any>> =
	| WhatClass
	| WhatToken<TContract>;

/**
 * Rule definition for conditional styling based on variant combinations
 */
export interface RuleDefinition<TContract extends Contract<any, any, any>> {
	override?: boolean;
	match?: Partial<VariantValueMapping<TContract>>;
	slot: SlotMapping<TContract>;
}

/**
 * Helper utility to provide typed callbacks for "cls" system.
 */
export interface WhatUtil<TContract extends Contract<any, any, any>> {
	/**
	 * What to style - e.g. "class"/"token", both, originally used for "rules".
	 */
	what: {
		/**
		 * Helper for classes only
		 */
		css(classes: ClassName): WhatClass;
		/**
		 * What to apply - only tokens
		 */
		token(tokens: TokensOfList<TContract>): WhatToken<TContract>;
		/**
		 * What to apply - both classes and tokens
		 */
		both(
			classes: ClassName,
			tokens: TokensOfList<TContract>,
		): What<TContract>;
		/**
		 * Provides types for variant usage (e.g. {color: "primary"}).
		 */
		variant(
			variant: Partial<VariantValueMapping<TContract>>,
		): Partial<VariantValueMapping<TContract>>;

		slot(slot: SlotMapping<TContract>): SlotMapping<TContract>;
	};
	/**
	 * Semantic section used in overrides
	 */
	override: {
		/**
		 * Provides default slot match
		 */
		root: MatchSlotFn<TContract>;
		/**
		 * Provides type-checked matcher
		 */
		rule: MatchFn<TContract>;
		/**
		 * Support for type-safe token overrides.
		 */
		token(
			token: Partial<TokenDefinitionOptional<TContract>>,
		): Partial<TokenDefinitionOptional<TContract>>;
	};
	def: {
		/**
		 * Provides default slot match
		 */
		root: MatchSlotFn<TContract>;
		/**
		 * Provides type-checked matcher
		 */
		rule: MatchFn<TContract>;
		token(
			token: TokenDefinitionRequired<TContract>,
		): TokenDefinitionRequired<TContract>;
		defaults(
			defaults: VariantValueMapping<TContract>,
		): VariantValueMapping<TContract>;
	};
}

// ============================================================================
// PUBLIC API TYPES
// ============================================================================

export type Definition<TContract extends Contract<any, any, any>> = {
	/** Token definitions mapping tokens to CSS classes */
	token: TokenDefinitionRequired<TContract>;
	/** Rules for conditional styling based on variants */
	rules: RuleDefinition<TContract>[];
	/** Default values for variants */
	defaults: VariantValueMapping<TContract>;
};

export type CreateConfig<TContract extends Contract<any, any, any>> = {
	/** Override variant values */
	variant?: Partial<VariantValueMapping<TContract>>;
	/** Override slot styling */
	slot?: SlotMapping<TContract>;
	/** Hard override slot styling (ignores rules) */
	override?: SlotMapping<TContract>;
	/** Override token definitions */
	token?: Partial<TokenDefinitionOptional<TContract>>;
};

export type Component<TCls extends Cls<any>, P = unknown> = {
	/** The cls instance for styling */
	tva?: TCls;
	/**
	 * User-land config override.
	 *
	 * There is a helper function "what" that you can use to typecheck your config and
	 * make changes a bit more readable (e.g. changing slot "root" you may write `slot: what.css(['bla'])`)
	 */
	cls?: (
		props: WhatUtil<TCls["contract"]>,
	) => Partial<CreateConfig<TCls["contract"]>>;
} & Omit<P, "tva" | "cls">;

export type ComponentSlots<TCls extends Cls<any>> = ClsSlots<TCls["contract"]>;

export interface Cls<TContract extends Contract<any, any, any>> {
	create(
		userConfigFn?: WhatConfigFn<TContract>,
		internalConfigFn?: WhatConfigFn<TContract>,
	): ClsSlots<TContract>;

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
		definition: (
			props: WhatUtilEx<
				Contract<
					TTokenContract,
					TSlotContract,
					TVariantContract,
					TContract
				>
			>,
		) => DefinitionEx<
			Contract<TTokenContract, TSlotContract, TVariantContract, TContract>
		>,
	): Cls<
		ContractEx<TTokenContract, TSlotContract, TVariantContract, TContract>
	>;

	/**
	 * Type-safe assignment of compatible cls instances.
	 * This method allows you to assign a cls instance that is derived from
	 * the current one, ensuring type safety through the inheritance chain.
	 *
	 * @template Sub - The cls instance to assign (must be derived from current)
	 * @param sub - The cls instance to assign
	 * @returns The current cls instance for chaining
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
	 * Type‑safe cls merger for props.
	 *
	 * Produces a parent‑compatible `cls` callback from child (or same) contract callbacks,
	 * intended for inheritance chains where a child needs to assign its `cls` to a parent.
	 * Internally uses `merge()` from `merge.ts` to shallow‑merge field values with
	 * user config taking precedence over internal config.
	 *
	 * @template Sub Extends the current contract in the `~use` chain. When `Sub` is a
	 *           descendant of `TContract`, the provided callbacks are typed to `Sub` and the
	 *           returned function is typed to `TContract` so it can be passed to the parent.
	 * @param userConfigFn Optional user config producer for the child/derived contract.
	 * @param internalConfigFn Optional internal config producer for the child/derived contract.
	 * @returns A `cls` function compatible with the current (parent) contract, or `undefined`
	 *          when no callbacks are provided.
	 *
	 * @example
	 * // Child assigns its `cls` to Parent in an inheritance chain
	 * const parentCls = Parent.cls<Child>((what) => ({
	 *   slot: { root: what.what.css(["text-sm"]) },
	 * }));
	 * // `parentCls` can now be used wherever Parent expects a `cls` callback
	 */
	cls<Sub extends Contract<any, any, any> = TContract>(
		userConfigFn?: {
			hack: WhatConfigFn<
				HasBaseInUseChain<Sub, TContract> extends true ? Sub : never
			>;
		}["hack"],
		internalConfigFn?: {
			hack: WhatConfigFn<
				HasBaseInUseChain<Sub, TContract> extends true ? Sub : never
			>;
		}["hack"],
	): WhatConfigFn<TContract> | undefined;

	/**
	 * The contract that defines this cls instance.
	 * This property provides access to the contract structure, including
	 * tokens, slots, and variants, for introspection and type inference.
	 */
	contract: TContract;
	/**
	 * Definition this Cls was created with
	 */
	definition: Definition<TContract>;
}
