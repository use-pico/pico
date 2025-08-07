import type { ClassNameValue } from "tailwind-merge";

// ============================================================================
// CORE TYPE DEFINITIONS
// ============================================================================

/**
 * Represents a CSS class name value.
 * This is an alias for Tailwind's ClassNameValue type, which can be a string
 * or an array of strings representing CSS classes.
 *
 * @example
 * ```typescript
 * // Single class
 * const singleClass: ClassName = "text-blue-500";
 *
 * // Multiple classes
 * const multipleClasses: ClassName = "text-blue-500 bg-white rounded-lg";
 *
 * // Array of classes
 * const classArray: ClassName = ["text-blue-500", "bg-white", "rounded-lg"];
 *
 * // Mixed usage
 * const mixed: ClassName = ["text-blue-500", "bg-white rounded-lg"];
 * ```
 */
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

// ============================================================================
// CONTRACT SYSTEM
// ============================================================================

/**
 * Main contract type that defines the structure of a cls instance.
 * A contract describes what tokens, slots, and variants are available,
 * and optionally inherits from another contract.
 *
 * @template TTokenContract - Token definitions (nested structure)
 * @template TSlotContract - Available slots for the component
 * @template TVariantContract - Available variants for the component
 * @template TUse - Parent contract for inheritance (optional)
 *
 * @example
 * ```typescript
 * // Basic contract without inheritance
 * const buttonContract: Contract<
 *   TokenContract,
 *   ["root", "icon", "label"],
 *   { size: ["sm", "md", "lg"] }
 * > = {
 *   tokens: {
 *     "primary.textColor": ["default", "hover", "disabled"],
 *     "primary.bgColor": ["default", "hover", "disabled"]
 *   },
 *   slot: ["root", "icon", "label"],
 *   variant: { size: ["sm", "md", "lg"] }
 * };
 *
 * // Contract with inheritance
 * const extendedButtonContract: Contract<
 *   TokenContract,
 *   ["root", "icon", "label"],
 *   { size: ["sm", "md", "lg"] },
 *   typeof buttonContract
 * > = {
 *   tokens: {
 *     "secondary.textColor": ["default", "hover", "disabled"]
 *   },
 *   slot: ["root", "icon", "label"],
 *   variant: { size: ["sm", "md", "lg"] },
 *   "~use": buttonContract
 * };
 * ```
 */
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
 * Generates full dot-notation token keys (e.g., "primary.textColor.default")
 */
type TokenKey<TContract extends Contract<any, any, any>> =
	`${TokenGroups<TContract>}.${TContract["tokens"][TokenGroups<TContract>][number]}`;

/**
 * Extracts just the token group names (e.g., "primary.bgColor")
 */
type TokenGroups<TContract extends Contract<any, any, any>> =
	keyof TContract["tokens"] & string;

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
type TokensOfList<TContract extends Contract<any, any, any>> = ListOf<
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
type TokenDefinition<TContract extends Contract<any, any, any>> =
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
type SlotMapping<T extends Contract<any, any, any>> = {
	[K in SlotsOf<T>]?: What<T>;
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
type WhatClass = {
	class: ClassName;
};

/**
 * Represents a token reference for dynamic styling
 */
type WhatToken<TContract extends Contract<any, any, any>> = {
	token: TokensOfList<TContract>;
};

/**
 * Union type for slot styling configurations
 */
type What<TContract extends Contract<any, any, any>> =
	| WhatClass
	| WhatToken<TContract>;

/**
 * Rule definition for conditional styling based on variant combinations
 */
type RuleDefinition<TContract extends Contract<any, any, any>> = {
	override?: boolean;
	match?: Partial<VariantValueMapping<TContract>>;
	slot: SlotMapping<TContract>;
};

/**
 * Default values for variants
 */
type DefaultDefinition<TContract extends Contract<any, any, any>> =
	VariantValueMapping<TContract>;

// ============================================================================
// PUBLIC API TYPES
// ============================================================================

/**
 * Complete definition for a cls instance.
 * Maps contract structure to concrete styling values.
 *
 * @template TContract - The contract that defines the structure
 *
 * @example
 * ```typescript
 * const buttonDefinition: Definition<typeof buttonContract> = {
 *   token: {
 *     "primary.textColor": {
 *       default: ["text-white"],
 *       hover: ["text-blue-100"],
 *       disabled: ["text-gray-400"]
 *     },
 *     "primary.bgColor": {
 *       default: ["bg-blue-500"],
 *       hover: ["bg-blue-600"],
 *       disabled: ["bg-gray-300"]
 *     }
 *   },
 *   rule: [
 *     {
 *       match: { variant: "primary" },
 *       slot: {
 *         root: { token: ["primary.bgColor.default"] },
 *         label: { token: ["primary.textColor.default"] }
 *       }
 *     }
 *   ],
 *   defaults: {
 *     size: "md",
 *     variant: "primary"
 *   }
 * };
 * ```
 */
type Definition<TContract extends Contract<any, any, any>> = {
	/** Token definitions mapping tokens to CSS classes */
	token: TokenDefinition<TContract>;
	/** Rules for conditional styling based on variants */
	rule: RuleDefinition<TContract>[];
	/** Default values for variants */
	defaults: DefaultDefinition<TContract>;
};

/**
 * Configuration for the create method.
 * Allows overriding variants, slots, and tokens.
 *
 * @template TContract - The contract that defines the structure
 *
 * @example
 * ```typescript
 * // Basic usage
 * const config: CreateConfig<typeof ButtonCls.contract> = {
 *   variant: "primary",
 *   size: "lg"
 * };
 *
 * // With slot overrides
 * const config: CreateConfig<typeof ButtonCls.contract> = {
 *   variant: "primary",
 *   slot: {
 *     icon: { class: ["mr-2", "animate-spin"] },
 *     label: { token: ["primary.textColor.hover"] }
 *   }
 * };
 *
 * // With token overrides
 * const config: CreateConfig<typeof ButtonCls.contract> = {
 *   variant: "primary",
 *   token: {
 *     "primary.bgColor": {
 *       default: ["bg-red-500"] // Override the default background
 *     }
 *   }
 * };
 *
 * // With hard overrides (ignores rules)
 * const config: CreateConfig<typeof ButtonCls.contract> = {
 *   variant: "primary",
 *   override: {
 *     root: { class: ["bg-red-500", "text-white"] }
 *   }
 * };
 * ```
 */
type CreateConfig<TContract extends Contract<any, any, any>> = {
	/** Override variant values */
	variant?: Partial<DefaultDefinition<TContract>>;
	/** Override slot styling */
	slot?: SlotMapping<TContract>;
	/** Hard override slot styling (ignores rules) */
	override?: SlotMapping<TContract>;
	/** Override token definitions */
	token?: Partial<OptionalTokenDefinition<TContract>>;
};

/**
 * Component type for React integration.
 * This type combines cls configuration with additional props for React components.
 * It allows you to use cls styling in React components with full type safety.
 *
 * @template TCls - The cls instance type
 * @template P - Additional props for the component
 *
 * @example
 * ```typescript
 * // Basic component with cls styling
 * const Button: React.FC<Component<typeof ButtonCls>> = ({
 *   variant,
 *   size,
 *   children,
 *   ...props
 * }) => {
 *   const classes = ButtonCls.create({ variant, size });
 *   return <button className={classes.root} {...props}>{children}</button>;
 * };
 *
 * // Component with additional props
 * const CustomButton: React.FC<Component<typeof ButtonCls, {
 *   loading?: boolean;
 *   icon?: React.ReactNode;
 * }>> = ({
 *   variant,
 *   size,
 *   loading,
 *   icon,
 *   children,
 *   ...props
 * }) => {
 *   const classes = ButtonCls.create({
 *     variant,
 *     size,
 *     slot: {
 *       icon: loading ? { class: ["animate-spin"] } : undefined
 *     }
 *   });
 *
 *   return (
 *     <button className={classes.root} {...props}>
 *       {icon && <span className={classes.icon}>{icon}</span>}
 *       <span className={classes.label}>{children}</span>
 *     </button>
 *   );
 * };
 * ```
 */
export type Component<TCls extends Cls<any>, P = unknown> = Partial<
	CreateConfig<TCls["contract"]>
> & {
	/** The cls instance for styling */
	tva?: TCls;
} & P;

/**
 * Main cls interface that provides the public API for styling components.
 * A cls instance represents a styled component with tokens, slots, and variants.
 * It provides methods for creating styled instances, extending the design system,
 * and type-safe assignment of compatible cls instances.
 *
 * @template TContract - The contract that defines this cls instance
 *
 * @example
 * ```typescript
 * // Creating a basic cls instance
 * const ButtonCls = cls(
 *   {
 *     tokens: {
 *       "primary.textColor": ["default", "hover", "disabled"],
 *       "primary.bgColor": ["default", "hover", "disabled"]
 *     },
 *     slot: ["root", "icon", "label"],
 *     variant: {
 *       size: ["sm", "md", "lg"],
 *       variant: ["primary", "secondary"]
 *     }
 *   },
 *   {
 *     token: {
 *       "primary.textColor": {
 *         default: ["text-white"],
 *         hover: ["text-blue-100"],
 *         disabled: ["text-gray-400"]
 *       },
 *       "primary.bgColor": {
 *         default: ["bg-blue-500"],
 *         hover: ["bg-blue-600"],
 *         disabled: ["bg-gray-300"]
 *       }
 *     },
 *     rule: [
 *       {
 *         match: { variant: "primary" },
 *         slot: {
 *           root: { token: ["primary.bgColor.default"] },
 *           label: { token: ["primary.textColor.default"] }
 *         }
 *       }
 *     ],
 *     defaults: {
 *       size: "md",
 *       variant: "primary"
 *     }
 *   }
 * );
 *
 * // Using the cls instance
 * const buttonClasses = ButtonCls.create({
 *   variant: "primary",
 *   size: "lg",
 *   slot: {
 *     icon: { class: ["mr-2"] }
 *   }
 * });
 *
 * // Extending the cls instance
 * const ExtendedButtonCls = ButtonCls.extend(
 *   {
 *     tokens: {
 *       "secondary.textColor": ["default", "hover"],
 *       "secondary.bgColor": ["default", "hover"]
 *     },
 *     slot: ["root", "icon", "label"],
 *     variant: {
 *       size: ["sm", "md", "lg", "xl"]
 *     }
 *   },
 *   {
 *     token: {
 *       "secondary.textColor": {
 *         default: ["text-gray-800"],
 *         hover: ["text-gray-900"]
 *       },
 *       "secondary.bgColor": {
 *         default: ["bg-gray-200"],
 *         hover: ["bg-gray-300"]
 *       }
 *     },
 *     rule: [
 *       {
 *         match: { variant: "secondary" },
 *         slot: {
 *           root: { token: ["secondary.bgColor.default"] },
 *           label: { token: ["secondary.textColor.default"] }
 *         }
 *       }
 *     ],
 *     defaults: {
 *       size: "md",
 *       variant: "secondary"
 *     }
 *   }
 * );
 * ```
 */
export interface Cls<TContract extends Contract<any, any, any>> {
	/**
	 * Creates a styled instance with optional overrides.
	 * This method generates CSS classes based on the current variant values
	 * and any provided overrides for variants, slots, or tokens.
	 *
	 * @param config - Configuration object for creating the styled instance
	 * @returns An object with slot names as keys and generated CSS classes as values
	 *
	 * @example
	 * ```typescript
	 * // Basic usage with variants
	 * const classes = ButtonCls.create({
	 *   variant: "primary",
	 *   size: "lg"
	 * });
	 * // Result: { root: "bg-blue-500 text-white px-6 py-3", ... }
	 *
	 * // With slot overrides
	 * const classes = ButtonCls.create({
	 *   variant: "primary",
	 *   slot: {
	 *     icon: { class: ["mr-2", "animate-spin"] },
	 *     label: { token: ["primary.textColor.hover"] }
	 *   }
	 * });
	 *
	 * // With token overrides
	 * const classes = ButtonCls.create({
	 *   variant: "primary",
	 *   token: {
	 *     "primary.bgColor": {
	 *       default: ["bg-red-500"] // Override the default background
	 *     }
	 *   }
	 * });
	 *
	 * // With hard overrides (ignores rules)
	 * const classes = ButtonCls.create({
	 *   variant: "primary",
	 *   override: {
	 *     root: { class: ["bg-red-500", "text-white"] }
	 *   }
	 * });
	 * ```
	 */
	create(config: CreateConfig<TContract>): any;

	/**
	 * Extends the current cls with new tokens, slots, and variants.
	 * This method creates a new cls instance that inherits from the current one,
	 * allowing you to add new design tokens, slots, or variants while maintaining
	 * type safety and inheritance.
	 *
	 * @template TTokenContract - New token definitions (can override inherited or add new)
	 * @template TSlotContract - New slot definitions
	 * @template TVariantContract - New variant definitions
	 * @param contract - Contract defining the new structure
	 * @param definition - Definition providing the styling values
	 * @returns A new cls instance with the extended functionality
	 *
	 * @example
	 * ```typescript
	 * // Extending with new variants
	 * const LargeButtonCls = ButtonCls.extend(
	 *   {
	 *     tokens: {}, // No new tokens
	 *     slot: ["root", "icon", "label"], // Same slots
	 *     variant: {
	 *       size: ["sm", "md", "lg", "xl"] // Added "xl" size
	 *     }
	 *   },
	 *   {
	 *     token: {}, // No new token definitions
	 *     rule: [
	 *       {
	 *         match: { size: "xl" },
	 *         slot: {
	 *           root: { class: ["px-8", "py-4", "text-lg"] }
	 *         }
	 *       }
	 *     ],
	 *     defaults: {
	 *       size: "md",
	 *       variant: "primary"
	 *     }
	 *   }
	 * );
	 *
	 * // Extending with new tokens
	 * const ThemedButtonCls = ButtonCls.extend(
	 *   {
	 *     tokens: {
	 *       "success.textColor": ["default", "hover"],
	 *       "success.bgColor": ["default", "hover"]
	 *     },
	 *     slot: ["root", "icon", "label"],
	 *     variant: {
	 *       variant: ["primary", "secondary", "success"] // Added "success"
	 *     }
	 *   },
	 *   {
	 *     token: {
	 *       "success.textColor": {
	 *         default: ["text-white"],
	 *         hover: ["text-green-100"]
	 *       },
	 *       "success.bgColor": {
	 *         default: ["bg-green-500"],
	 *         hover: ["bg-green-600"]
	 *       }
	 *     },
	 *     rule: [
	 *       {
	 *         match: { variant: "success" },
	 *         slot: {
	 *           root: { token: ["success.bgColor.default"] },
	 *           label: { token: ["success.textColor.default"] }
	 *         }
	 *       }
	 *     ],
	 *     defaults: {
	 *       size: "md",
	 *       variant: "primary"
	 *     }
	 *   }
	 * );
	 * ```
	 */
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
		definition: Definition<
			Contract<TTokenContract, TSlotContract, TVariantContract, TContract>
		>,
	): Cls<
		Contract<TTokenContract, TSlotContract, TVariantContract, TContract>
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
	 * The contract that defines this cls instance.
	 * This property provides access to the contract structure, including
	 * tokens, slots, and variants, for introspection and type inference.
	 */
	contract: TContract;
}
