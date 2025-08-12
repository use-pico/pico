import type { ClassNameValue } from "tailwind-merge";
import type { MatchFn, MatchSlotFn } from "./match";

// ============================================================================
// CORE TYPE DEFINITIONS
// ============================================================================

export type ClassName = ClassNameValue;
/**
 * Defines the available slots for a component.
 * Slots are named parts of a component that can receive styles.
 *
 * @example
 * ```typescript
 * const slots: SlotContract = ["root", "icon", "label"];
 * ```
 */
export type SlotContract = readonly string[];

/**
 * Defines the token structure for a design system.
 * Tokens are organized in groups with variants.
 *
 * @example
 * ```typescript
 * const tokens: TokenContract = {
 *   "primary.textColor": ["default", "hover", "disabled"],
 *   "primary.bgColor": ["default", "hover", "disabled"],
 *   "secondary.textColor": ["default", "hover", "disabled"]
 * };
 * ```
 */
export type TokenContract = Record<string, readonly string[]>;

/**
 * Defines the available variants for a component.
 * Variants control the component's appearance and behavior.
 *
 * @example
 * ```typescript
 * const variants: VariantContract = {
 *   size: ["sm", "md", "lg"],
 *   variant: ["primary", "secondary"],
 *   disabled: ["bool"] // "bool" becomes boolean type
 * };
 * ```
 */
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
type HasBaseInUseChain<Sub, Base> = Sub extends Base
	? true
	: Sub extends {
				"~use"?: infer U;
			}
		? HasBaseInUseChain<U, Base>
		: false;

export type { HasBaseInUseChain };

// ============================================================================
// CONTRACT SYSTEM
// ============================================================================

export type Contract<
	TTokenContract extends TokenContract | ExtendableTokenContract<any>,
	TSlotContract extends SlotContract,
	TVariantContract extends VariantContract,
	TUse extends Contract<any, any, any> | unknown = unknown,
> = {
	/** Token definitions organized by group and variant */
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
	TTokenContract extends ExtendableTokenContract<TBaseContract>,
	TSlotContract extends SlotContract,
	TVariantContract extends VariantContract,
	TBaseContract extends Contract<any, any, any>,
> = {
	/** Token definitions organized by group and variant - inherits from parent */
	tokens: TTokenContract & TBaseContract["tokens"];
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
export type ExtendedWhatUtil<TChildContract extends Contract<any, any, any>> =
	Omit<WhatUtil<TChildContract>, "def"> & {
		def: Omit<WhatUtil<TChildContract>["def"], "token"> & {
			token(
				token: TokenDefinition<TChildContract>,
			): TokenDefinition<TChildContract>;
		};
	};

/**
 * Extended definition type that only requires child contract tokens
 * Inherited tokens are handled at runtime, not at the type level
 */
export type ExtendedDefinition<TChildContract extends Contract<any, any, any>> =
	{
		/** Token definitions with proper inheritance handling */
		token: TokenDefinition<TChildContract>;
		/** Rules for conditional styling based on variants */
		rules: RuleDefinition<TChildContract>[];
		/** Default values for variants */
		defaults: DefaultDefinition<TChildContract>;
	};

/**
 * Type that allows both inherited token overrides and new token definitions
 * Used in the extend method to provide flexible token extension
 */
type ExtendableTokenContract<TContract extends Contract<any, any, any>> =
	| {
			[K in InheritedTokenGroups<TContract>]?: TokenGroupVariants<
				TContract,
				K
			>;
	  }
	| {
			[key: string]: readonly string[];
	  };

// ============================================================================
// TOKEN SYSTEM
// ============================================================================

/**
 * Generates full dot-notation token keys (e.g., "primary.textColor.default").
 *
 * Previous implementation used an index access with a union of groups:
 *   TContract["tokens"][TokenGroups<TContract>][number]
 * which widens the variants to a union of all variants from all groups,
 * effectively producing a cartesian product between groups and variants.
 *
 * This mapped-type version preserves the pairing between each group and its
 * own variant list by first mapping group → `${group}.${variant}` and then
 * indexing back into the union of those mapped values.
 */
type TokenKey<TContract extends Contract<any, any, any>> = {
	[K in keyof TContract["tokens"] &
		string]: `${K}.${TContract["tokens"][K][number]}`;
}[keyof TContract["tokens"] & string];

// Note: The old TokenGroups helper became unnecessary after rewriting TokenKey
// to a mapped type that directly iterates over `keyof tokens`.

/**
 * Recursively collects all token keys from current and inherited contracts
 */
type TokensOf<TContract extends Contract<any, any, any>> = TContract extends {
	"~use"?: infer TUse;
}
	? TUse extends Contract<any, any, any>
		? TokenKey<TContract> | TokensOf<TUse>
		: TokenKey<TContract>
	: TokenKey<TContract>;

/**
 * Creates a tuple type for lists of TokensOf
 */
export type TokensOfList<TContract extends Contract<any, any, any>> = ListOf<
	TokensOf<TContract>
>;

/**
 * Extracts inherited token group names from the parent inheritance chain
 */
type InheritedTokenGroups<TContract extends Contract<any, any, any>> =
	TContract extends {
		"~use"?: infer TUse;
	}
		? TUse extends Contract<any, any, any>
			? keyof TUse["tokens"] | InheritedTokenGroups<TUse>
			: never
		: never;

/**
 * Recursively retrieves variants for a specific token group from the inheritance chain
 */
type TokenGroupVariants<
	TContract extends Contract<any, any, any>,
	TGroup extends string,
> = TContract extends {
	"~use"?: infer TUse;
}
	? TUse extends Contract<any, any, any>
		? TGroup extends keyof TUse["tokens"]
			? TUse["tokens"][TGroup]
			: TokenGroupVariants<TUse, TGroup>
		: never
	: never;

/**
 * Base token definition type with configurable variant requirement
 * Used to create both required and optional token definition types
 */
type BaseTokenDefinition<
	TContract extends Contract<any, any, any>,
	TRequired extends boolean = true,
> = {
	[K in InheritedTokenGroups<TContract>]?: {
		[V in TokenGroupVariants<TContract, K>[number]]?: ClassName;
	};
} & (TRequired extends true
	? {
			[K in keyof TContract["tokens"]]: {
				[V in TContract["tokens"][K][number]]: ClassName;
			};
		}
	: {
			[K in keyof TContract["tokens"]]?: {
				[V in TContract["tokens"][K][number]]?: ClassName;
			};
		});

/**
 * Token definition for cls instances - requires all current contract tokens
 */
export type TokenDefinition<TContract extends Contract<any, any, any>> =
	BaseTokenDefinition<TContract, true>;

/**
 * Optional token definition for create method overrides - all variants optional
 */
type OptionalTokenDefinition<TContract extends Contract<any, any, any>> =
	BaseTokenDefinition<TContract, false>;

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

export type ClsSlotFn<TContract extends Contract<any, any, any>> = (
	config?: (props: WhatUtil<TContract>) => Partial<CreateConfig<TContract>>,
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
type VariantValueMapping<T extends Contract<any, any, any>> = {
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
			variant: Partial<DefaultDefinition<TContract>>,
		): Partial<DefaultDefinition<TContract>>;
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
			token: Partial<OptionalTokenDefinition<TContract>>,
		): Partial<OptionalTokenDefinition<TContract>>;
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
		token(token: TokenDefinition<TContract>): TokenDefinition<TContract>;
		defaults(
			defaults: DefaultDefinition<TContract>,
		): DefaultDefinition<TContract>;
	};
}

/**
 * Default values for variants
 */
type DefaultDefinition<TContract extends Contract<any, any, any>> =
	VariantValueMapping<TContract>;

// ============================================================================
// PUBLIC API TYPES
// ============================================================================

export type Definition<TContract extends Contract<any, any, any>> = {
	/** Token definitions mapping tokens to CSS classes */
	token: TokenDefinition<TContract>;
	/** Rules for conditional styling based on variants */
	rules: RuleDefinition<TContract>[];
	/** Default values for variants */
	defaults: DefaultDefinition<TContract>;
};

export type CreateConfig<TContract extends Contract<any, any, any>> = {
	/** Override variant values */
	variant?: Partial<DefaultDefinition<TContract>>;
	/** Override slot styling */
	slot?: SlotMapping<TContract>;
	/** Hard override slot styling (ignores rules) */
	override?: SlotMapping<TContract>;
	/** Override token definitions */
	token?: Partial<OptionalTokenDefinition<TContract>>;
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
		userConfigFn?: (
			props: WhatUtil<TContract>,
		) => Partial<CreateConfig<TContract>>,
		internalConfigFn?: (
			props: WhatUtil<TContract>,
		) => Partial<CreateConfig<TContract>>,
	): ClsSlots<TContract>;

	extend<
		const TTokenContract extends ExtendableTokenContract<TContract>,
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
			props: ExtendedWhatUtil<
				Contract<
					TTokenContract,
					TSlotContract,
					TVariantContract,
					TContract
				>
			>,
		) => ExtendedDefinition<
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
			hack: (
				props: WhatUtil<
					HasBaseInUseChain<Sub, TContract> extends true ? Sub : never
				>,
			) => Partial<
				CreateConfig<
					HasBaseInUseChain<Sub, TContract> extends true ? Sub : never
				>
			>;
		}["hack"],
		internalConfigFn?: {
			hack: (
				props: WhatUtil<
					HasBaseInUseChain<Sub, TContract> extends true ? Sub : never
				>,
			) => Partial<
				CreateConfig<
					HasBaseInUseChain<Sub, TContract> extends true ? Sub : never
				>
			>;
		}["hack"],
	):
		| ((props: WhatUtil<TContract>) => Partial<CreateConfig<TContract>>)
		| undefined;

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
