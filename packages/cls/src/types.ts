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
export type TokenDefinitionRequired<T extends Contract<any, any, any>> =
	T["tokens"][number] extends never
		? {
				[K: string]: never;
			} // If no tokens declared, no properties allowed
		: { [K in T["tokens"][number]]: What<T> }; // If tokens declared, they are required

export type TokenDefinitionOptional<T extends Contract<any, any, any>> =
	Partial<Record<TokensOf<T>, What<T>>>;

export type TokenDefinitionEx<T extends Contract<any, any, any>> =
	T["tokens"][number] extends never
		? TokenDefinitionOptional<T> // If no local tokens, only inherited tokens are allowed
		: TokenDefinitionOptional<T> & TokenDefinitionRequired<T>; // If local tokens exist, they are required

/**
 * Extended utility interface for CLS extension operations.
 *
 * This interface is identical to `WhatUtil` but is used specifically when extending
 * existing CLS instances via the `extend()` method. It provides the same styling
 * utilities but with types that are appropriate for extended components.
 *
 * @template T - The contract type that defines the structure (tokens, slots, variants)
 */
export interface WhatUtilEx<T extends Contract<any, any, any>>
	extends Omit<WhatUtil<T>, "def"> {
	def: Omit<WhatUtil<T>["def"], "token"> & {
		/**
		 * Creates token definitions that define the design system values.
		 *
		 * Use this to define the actual CSS values for your design tokens.
		 * These token definitions are used throughout the styling system
		 * and can be referenced by other tokens.
		 *
		 * @param token - Required token definitions for all declared tokens
		 * @returns Required token definitions for the design system
		 *
		 * @example
		 * ```typescript
		 * // Define all required tokens
		 * def.token({
		 *   "color.text.default": what.css(["text-gray-900"]),
		 *   "color.text.primary": what.css(["text-white"]),
		 *   "color.bg.default": what.css(["bg-gray-100"]),
		 *   "color.bg.primary": what.css(["bg-blue-600"]),
		 *   "spacing.padding.md": what.css(["px-4", "py-2"])
		 * })
		 * ```
		 */
		token(token: TokenDefinitionEx<T>): TokenDefinitionEx<T>;
	};
}

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

export type Variants<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantContract;
	"~use"?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeRecords<Variants<U>, V>
		: V
	: Record<string, never>; // No variants allowed when none are declared

// Helper type to check if a contract has no variants
type HasNoVariants<T extends Contract<any, any, any>> =
	keyof Variants<T> extends never ? true : false;

// Helper type for variant value mapping when no variants are declared
type NoVariantsMapping = Record<string, never>;

// Helper type for variant value mapping when variants are declared
type VariantsMapping<T extends Contract<any, any, any>> = {
	[K in keyof Variants<T>]: StringToBool<Variants<T>[K][number]>;
};

// Helper types for defaults function
type DefaultsParam<T extends Contract<any, any, any>> =
	HasNoVariants<T> extends true ? NoVariantsMapping : VariantValueMapping<T>;

type DefaultsReturn<T extends Contract<any, any, any>> =
	HasNoVariants<T> extends true ? NoVariantsMapping : VariantValueMapping<T>;

// Helper types for variant function
type VariantParam<T extends Contract<any, any, any>> =
	HasNoVariants<T> extends true
		? NoVariantsMapping
		: Partial<VariantValueMapping<T>>;

type VariantReturn<T extends Contract<any, any, any>> =
	HasNoVariants<T> extends true
		? NoVariantsMapping
		: Partial<VariantValueMapping<T>>;

// Helper types for cls function
type ClsConfigFn<
	T extends Contract<any, any, any>,
	Sub extends Contract<any, any, any>,
> = WhatConfigFn<HasBaseInUseChain<Sub, T> extends true ? Sub : never>;

// Keep the original VariantValueMapping simple for compatibility
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

/**
 * Core utility interface that provides type-safe styling helpers for CLS definitions.
 *
 * This interface is passed to definition functions and provides three main categories
 * of utilities: `what` for creating styling values, `override` for destructive styling,
 * and `def` for accumulative styling. Each category serves a specific purpose in
 * the styling system.
 *
 * @template T - The contract type that defines the structure (tokens, slots, variants)
 *
 * @example
 * ```typescript
 * // Used in definition functions
 * const ButtonCls = cls(contract, ({ what, override, def }) => ({
 *   token: def.token({
 *     "color.bg.primary": what.css(["bg-blue-600"])
 *   }),
 *   rules: [
 *     def.root({
 *       root: what.both(["px-4", "py-2"], ["color.bg.primary"])
 *     })
 *   ]
 * }));
 * ```
 */
export interface WhatUtil<T extends Contract<any, any, any>> {
	/**
	 * Styling value creation utilities for building type-safe styling configurations.
	 *
	 * The `what` object provides helpers for creating CSS classes, token references,
	 * variant values, and slot configurations. These utilities ensure type safety
	 * and proper structure for all styling values.
	 */
	what: {
		/**
		 * Creates a pure CSS class styling value.
		 *
		 * Use this when you want to apply CSS classes directly without any token references.
		 * This is ideal for layout utilities, spacing, and other CSS-only styling.
		 *
		 * @param classes - CSS class names to apply
		 * @returns A WhatClass object containing the CSS classes
		 *
		 * @example
		 * ```typescript
		 * // Pure CSS classes for layout
		 * root: what.css(["inline-flex", "items-center", "rounded-md"])
		 *
		 * // Pure CSS classes for spacing
		 * root: what.css(["px-4", "py-2", "gap-2"])
		 *
		 * // Pure CSS classes for utilities
		 * root: what.css(["font-medium", "text-sm", "shadow-sm"])
		 * ```
		 */
		css(classes: ClassName): WhatClass;

		/**
		 * Creates a token reference styling value.
		 *
		 * Use this when you want to reference design tokens defined in your contract.
		 * Tokens are resolved at runtime and can reference other tokens, creating
		 * a flexible design system.
		 *
		 * @param tokens - Array of token names to reference
		 * @returns A WhatToken object containing the token references
		 *
		 * @example
		 * ```typescript
		 * // Reference single token
		 * root: what.token(["color.bg.primary"])
		 *
		 * // Reference multiple tokens
		 * root: what.token(["color.bg.primary", "color.text.primary"])
		 *
		 * // Reference spacing tokens
		 * root: what.token(["spacing.padding.md", "spacing.radius.sm"])
		 * ```
		 */
		token(tokens: TokensOfList<T>): WhatToken<T>;

		/**
		 * Creates a mixed styling value with both CSS classes and token references.
		 *
		 * Use this when you need both CSS classes (for layout/utilities) and design tokens
		 * (for theming) in the same styling configuration. This is the most common pattern.
		 *
		 * @param classes - CSS class names for layout and utilities
		 * @param tokens - Array of token names for theming
		 * @returns A What object containing both CSS classes and token references
		 *
		 * @example
		 * ```typescript
		 * // Mixed styling: layout + theming
		 * root: what.both(
		 *   ["inline-flex", "items-center", "rounded-md"], // Layout
		 *   ["color.bg.primary", "color.text.primary"]     // Theming
		 * )
		 *
		 * // Mixed styling: utilities + design tokens
		 * root: what.both(
		 *   ["font-medium", "text-sm", "shadow-sm"],       // Utilities
		 *   ["spacing.padding.md", "color.bg.default"]     // Design tokens
		 * )
		 * ```
		 */
		both(classes: ClassName, tokens: TokensOfList<T>): What<T>;

		/**
		 * Creates type-safe variant values for conditional styling.
		 *
		 * Use this to specify variant combinations that will be used in rule matching.
		 * The function ensures only valid variant values are used, providing compile-time
		 * type safety.
		 *
		 * @param variant - Partial variant mapping with type-safe values
		 * @returns A partial variant mapping for use in rules
		 *
		 * @example
		 * ```typescript
		 * // Single variant
		 * what.variant({ size: "lg" })
		 *
		 * // Multiple variants
		 * what.variant({ size: "lg", variant: "primary" })
		 *
		 * // Boolean variants
		 * what.variant({ disabled: true, loading: false })
		 *
		 * // Used in rules
		 * def.rule(
		 *   what.variant({ size: "lg", variant: "primary" }),
		 *   { root: what.css(["px-6", "py-3"]) }
		 * )
		 * ```
		 */
		variant(variant: VariantParam<T>): VariantReturn<T>;

		/**
		 * Creates slot-specific styling configurations.
		 *
		 * Use this to create slot mappings that can be applied to specific component parts.
		 * This is typically used in the `slot` property of configuration objects.
		 *
		 * @param slot - Slot mapping with styling for each slot
		 * @returns A slot mapping for use in configurations
		 *
		 * @example
		 * ```typescript
		 * // Slot configuration in create() method
		 * ButtonCls.create(({ what }) => ({
		 *   slot: what.slot({
		 *     root: what.css(["px-4", "py-2"]),
		 *     icon: what.css(["mr-2", "w-4", "h-4"]),
		 *     label: what.token(["color.text.primary"])
		 *   })
		 * }))
		 * ```
		 */
		slot(slot: SlotMapping<T>): SlotMapping<T>;
	};

	/**
	 * Destructive styling utilities that replace previous styles.
	 *
	 * The `override` object provides helpers for creating styling rules that completely
	 * replace previous styles rather than adding to them. This is useful when you need
	 * to ensure clean styling without accumulation.
	 */
	override: {
		/**
		 * Creates a root rule that replaces all previous styles for the specified slot.
		 *
		 * Use this when you want to completely replace the base styling for a slot.
		 * This is destructive - it will clear any previous styles and apply only
		 * the new ones.
		 *
		 * @param slot - Slot mapping with styling that will replace previous styles
		 * @param override - Optional override flag (defaults to true for override mode)
		 * @returns A rule definition for destructive styling
		 *
		 * @example
		 * ```typescript
		 * // Replace all root styles
		 * override.root({
		 *   root: what.css(["px-6", "py-3", "bg-red-500"])
		 * })
		 *
		 * // Replace multiple slot styles
		 * override.root({
		 *   root: what.css(["px-4", "py-2"]),
		 *   icon: what.css(["w-5", "h-5"]),
		 *   label: what.token(["color.text.error"])
		 * })
		 * ```
		 */
		root: MatchSlotFn<T>;

		/**
		 * Creates a conditional rule that replaces styles when variants match.
		 *
		 * Use this when you want to completely replace styles for specific variant
		 * combinations. This is destructive - it will clear any previous styles
		 * and apply only the new ones when the condition is met.
		 *
		 * @param match - Variant condition that triggers the rule
		 * @param slot - Slot mapping with styling that will replace previous styles
		 * @param override - Optional override flag (defaults to true for override mode)
		 * @returns A rule definition for conditional destructive styling
		 *
		 * @example
		 * ```typescript
		 * // Replace styles for primary variant
		 * override.rule(
		 *   what.variant({ variant: "primary" }),
		 *   {
		 *     root: what.token(["color.bg.primary", "color.text.primary"])
		 *   }
		 * )
		 *
		 * // Replace styles for large primary variant
		 * override.rule(
		 *   what.variant({ size: "lg", variant: "primary" }),
		 *   {
		 *     root: what.both(
		 *       ["px-8", "py-4"],
		 *       ["color.bg.primary", "color.text.primary"]
		 *     )
		 *   }
		 * )
		 * ```
		 */
		rule: MatchFn<T>;

		/**
		 * Creates token overrides that replace existing token definitions.
		 *
		 * Use this when you want to completely replace token definitions rather than
		 * merge with them. This is destructive - it will clear any previous token
		 * definitions and apply only the new ones.
		 *
		 * @param token - Partial token definitions that will replace existing ones
		 * @returns Partial token definitions for destructive token styling
		 *
		 * @example
		 * ```typescript
		 * // Replace token definitions
		 * override.token({
		 *   "color.bg.primary": what.css(["bg-indigo-600"]),
		 *   "color.text.primary": what.css(["text-indigo-50"])
		 * })
		 * ```
		 */
		token(
			token: Partial<TokenDefinitionOptional<T>>,
		): Partial<TokenDefinitionOptional<T>>;
	};

	/**
	 * Accumulative styling utilities that add to previous styles.
	 *
	 * The `def` object provides helpers for creating styling rules that add to
	 * previous styles rather than replacing them. This is the default behavior
	 * and is useful for building up styles incrementally.
	 */
	def: {
		/**
		 * Creates a root rule that adds to the base styling for the specified slot.
		 *
		 * Use this when you want to add styling to the base configuration for a slot.
		 * This is accumulative - it will add to any previous styles rather than
		 * replacing them.
		 *
		 * @param slot - Slot mapping with styling that will be added to previous styles
		 * @param override - Optional override flag (defaults to false for append mode)
		 * @returns A rule definition for accumulative styling
		 *
		 * @example
		 * ```typescript
		 * // Add to base root styles
		 * def.root({
		 *   root: what.both(
		 *     ["inline-flex", "items-center", "rounded-md"],
		 *     ["color.text.default", "color.bg.default"]
		 *   )
		 * })
		 *
		 * // Add to multiple slots
		 * def.root({
		 *   root: what.css(["px-4", "py-2"]),
		 *   icon: what.css(["mr-2", "w-4", "h-4"]),
		 *   label: what.css(["font-medium"])
		 * })
		 * ```
		 */
		root: MatchSlotFn<T>;

		/**
		 * Creates a conditional rule that adds styles when variants match.
		 *
		 * Use this when you want to add styling for specific variant combinations.
		 * This is accumulative - it will add to any previous styles rather than
		 * replacing them when the condition is met.
		 *
		 * @param match - Variant condition that triggers the rule
		 * @param slot - Slot mapping with styling that will be added to previous styles
		 * @param override - Optional override flag (defaults to false for append mode)
		 * @returns A rule definition for conditional accumulative styling
		 *
		 * @example
		 * ```typescript
		 * // Add styles for large size
		 * def.rule(
		 *   what.variant({ size: "lg" }),
		 *   {
		 *     root: what.css(["px-6", "py-3"])
		 *   }
		 * )
		 *
		 * // Add styles for primary variant
		 * def.rule(
		 *   what.variant({ variant: "primary" }),
		 *   {
		 *     root: what.token(["color.bg.primary", "color.text.primary"])
		 *   }
		 * )
		 * ```
		 */
		rule: MatchFn<T>;

		/**
		 * Creates token definitions that define the design system values.
		 *
		 * Use this to define the actual CSS values for your design tokens.
		 * These token definitions are used throughout the styling system
		 * and can be referenced by other tokens.
		 *
		 * @param token - Required token definitions for all declared tokens
		 * @returns Required token definitions for the design system
		 *
		 * @example
		 * ```typescript
		 * // Define all required tokens
		 * def.token({
		 *   "color.text.default": what.css(["text-gray-900"]),
		 *   "color.text.primary": what.css(["text-white"]),
		 *   "color.bg.default": what.css(["bg-gray-100"]),
		 *   "color.bg.primary": what.css(["bg-blue-600"]),
		 *   "spacing.padding.md": what.css(["px-4", "py-2"])
		 * })
		 * ```
		 */
		token(token: TokenDefinitionRequired<T>): TokenDefinitionRequired<T>;

		/**
		 * Creates default variant values for the component.
		 *
		 * Use this to specify the default values for each variant when no
		 * specific variant is provided. These defaults are used as fallbacks
		 * and can be overridden at runtime.
		 *
		 * @param defaults - Default values for each variant
		 * @returns Default variant mapping for the component
		 *
		 * @example
		 * ```typescript
		 * // Set default variants
		 * def.defaults({
		 *   size: "md",
		 *   variant: "default",
		 *   disabled: false,
		 *   loading: false
		 * })
		 * ```
		 */
		defaults(defaults: DefaultsParam<T>): DefaultsReturn<T>;
	};
}

/**
 * Extended styling definition for CLS extension operations.
 *
 * This type is identical to `Definition` and is used specifically when extending
 * existing CLS instances via the `extend()` method. It represents the complete
 * styling definition that provides concrete values for an extended contract,
 * ensuring that all declared tokens, rules, and defaults are properly defined.
 *
 * The key difference from `Definition` is the context in which it's used - it's
 * returned by extension definition functions and works with `WhatUtil` to
 * provide type safety for extended components.
 *
 * @template T - The contract type that defines the structure (tokens, slots, variants)
 *
 * @example
 * ```typescript
 * // Used in extend() operations with WhatUtil
 * const PrimaryButtonCls = ButtonCls.extend(
 *   {
 *     tokens: ["color.bg.primary", "color.text.primary"],
 *     slot: ["root"],
 *     variant: {}
 *   },
 *   ({ what, def }) => ({ // Returns DefinitionEx with WhatUtil
 *     token: def.token({
 *       "color.bg.primary": what.css(["bg-blue-600"]),
 *       "color.text.primary": what.css(["text-white"])
 *     }),
 *     rules: [
 *       def.root({
 *         root: what.token(["color.bg.primary", "color.text.primary"])
 *       })
 *     ],
 *     defaults: {}
 *   })
 * );
 * ```
 */
export type DefinitionEx<T extends Contract<any, any, any>> = {
	/**
	 * Required token definitions for all declared tokens in the extended contract.
	 *
	 * This object contains all the design token definitions for the extended component.
	 * Unlike the regular `Definition` type, this enforces that all tokens declared
	 * in the extended contract must be defined, providing stronger type safety
	 * for extension operations.
	 *
	 * Each token name declared in the extended contract must have a corresponding
	 * definition that specifies the actual CSS classes or token references.
	 * These tokens can reference tokens from the parent contract and support
	 * recursive resolution.
	 *
	 * @example
	 * ```typescript
	 * // In extend() operation - all declared tokens must be defined
	 * token: def.token({
	 *   // New tokens declared in extended contract
	 *   "color.bg.primary": what.css(["bg-blue-600"]),
	 *   "color.text.primary": what.css(["text-white"]),
	 *
	 *   // Can reference parent tokens
	 *   "button.primary": what.token([
	 *     "color.bg.primary",    // New token
	 *     "color.text.primary",  // New token
	 *     "spacing.padding.md"   // Parent token
	 *   ])
	 * })
	 * ```
	 */
	token: TokenDefinitionEx<T>;

	/**
	 * Array of styling rules that define conditional styling for the extended component.
	 *
	 * Rules are processed in order and can either add to or replace previous styles
	 * from the parent component. Each rule specifies a condition (variant combination)
	 * and the styling to apply when that condition is met. Rules support both
	 * accumulative (def) and destructive (override) styling modes.
	 *
	 * Extended components can add new rules, override existing rules, or extend
	 * the styling behavior of the parent component.
	 *
	 * @example
	 * ```typescript
	 * rules: [
	 *   // Override parent's root styles
	 *   override.root({
	 *     root: what.token(["color.bg.primary", "color.text.primary"])
	 *   }),
	 *
	 *   // Add new variant rules
	 *   def.rule(
	 *     what.variant({ theme: "dark" }),
	 *     {
	 *       root: what.token(["color.bg.dark", "color.text.dark"])
	 *     }
	 *   ),
	 *
	 *   // Extend existing variant behavior
	 *   def.rule(
	 *     what.variant({ size: "lg" }),
	 *     {
	 *       root: what.css(["shadow-lg", "font-bold"])
	 *     }
	 *   )
	 * ]
	 * ```
	 */
	rules: RuleDefinition<T>[];

	/**
	 * Default values for variants in the extended component.
	 *
	 * This object specifies the fallback values for each variant defined in the
	 * extended contract. These defaults can override parent defaults and are used
	 * when creating styled instances without explicit variant overrides.
	 * Extended components can provide new defaults or override inherited defaults.
	 *
	 * @example
	 * ```typescript
	 * defaults: def.defaults({
	 *   // Override parent defaults
	 *   variant: "primary", // Instead of parent's "default"
	 *
	 *   // Keep parent defaults
	 *   size: "md", // Same as parent
	 *
	 *   // Add new variant defaults
	 *   theme: "light",
	 *   loading: false
	 * })
	 * ```
	 *
	 * @example
	 * ```typescript
	 * // Usage with extended defaults
	 * const slots = PrimaryButtonCls.create();
	 * // Uses extended defaults: variant="primary", size="md", theme="light"
	 *
	 * // Override extended defaults at runtime
	 * const slots = PrimaryButtonCls.create(({ what }) => ({
	 *   variant: what.variant({ variant: "secondary", theme: "dark" })
	 * }));
	 * ```
	 */
	defaults: VariantValueMapping<T>;
};

// ============================================================================
// PUBLIC API TYPES
// ============================================================================

/**
 * Complete styling definition that provides concrete values for a CLS contract.
 *
 * This type represents the implementation of a CLS contract, containing all the
 * styling values, rules, and defaults that determine how a component is actually
 * styled. It's returned by definition functions and used internally by CLS instances
 * to generate styled components.
 *
 * @template T - The contract type that defines the structure (tokens, slots, variants)
 *
 * @example
 * ```typescript
 * // Definition function returns this type
 * const ButtonCls = cls(contract, ({ what, def }) => ({
 *   token: def.token({
 *     "color.bg.primary": what.css(["bg-blue-600"]),
 *     "color.text.primary": what.css(["text-white"])
 *   }),
 *   rules: [
 *     def.root({
 *       root: what.both(["px-4", "py-2"], ["color.bg.primary", "color.text.primary"])
 *     }),
 *     def.rule(
 *       what.variant({ size: "lg" }),
 *       { root: what.css(["px-6", "py-3"]) }
 *     )
 *   ],
 *   defaults: def.defaults({
 *     size: "md",
 *     variant: "default"
 *   })
 * }));
 * ```
 */
export type Definition<T extends Contract<any, any, any>> = {
	/**
	 * Token definitions that map token names to their CSS values.
	 *
	 * This object contains all the design token definitions for the component.
	 * Each token name (as declared in the contract) must have a corresponding
	 * definition that specifies the actual CSS classes or token references.
	 * These tokens can be referenced throughout the styling system and support
	 * recursive resolution (tokens can reference other tokens).
	 *
	 * @example
	 * ```typescript
	 * token: def.token({
	 *   // Color tokens
	 *   "color.text.default": what.css(["text-gray-900"]),
	 *   "color.text.primary": what.css(["text-white"]),
	 *   "color.bg.default": what.css(["bg-gray-100"]),
	 *   "color.bg.primary": what.css(["bg-blue-600"]),
	 *
	 *   // Spacing tokens
	 *   "spacing.padding.sm": what.css(["px-2", "py-1"]),
	 *   "spacing.padding.md": what.css(["px-4", "py-2"]),
	 *   "spacing.padding.lg": what.css(["px-6", "py-3"]),
	 *
	 *   // Composite tokens that reference other tokens
	 *   "button.primary": what.token(["color.bg.primary", "color.text.primary"]),
	 *   "button.default": what.token(["color.bg.default", "color.text.default"])
	 * })
	 * ```
	 */
	token: TokenDefinitionRequired<T>;

	/**
	 * Array of styling rules that define conditional styling based on variants.
	 *
	 * Rules are processed in order and can either add to or replace previous styles
	 * depending on the `override` flag. Each rule specifies a condition (variant
	 * combination) and the styling to apply when that condition is met. Rules
	 * support both accumulative (def) and destructive (override) styling modes.
	 *
	 * @example
	 * ```typescript
	 * rules: [
	 *   // Base styles (accumulative)
	 *   def.root({
	 *     root: what.both(
	 *       ["inline-flex", "items-center", "rounded-md"],
	 *       ["color.text.default", "color.bg.default"]
	 *     ),
	 *     icon: what.css(["mr-2", "w-4", "h-4"]),
	 *     label: what.css(["font-medium"])
	 *   }),
	 *
	 *   // Size variants (accumulative - adds to base)
	 *   def.rule(
	 *     what.variant({ size: "sm" }),
	 *     { root: what.css(["px-2", "py-1", "text-sm"]) }
	 *   ),
	 *   def.rule(
	 *     what.variant({ size: "lg" }),
	 *     { root: what.css(["px-6", "py-3", "text-lg"]) }
	 *   ),
	 *
	 *   // Variant styles (destructive - replaces colors)
	 *   override.rule(
	 *     what.variant({ variant: "primary" }),
	 *     { root: what.token(["color.bg.primary", "color.text.primary"]) }
	 *   ),
	 *
	 *   // Complex conditional styling
	 *   def.rule(
	 *     what.variant({ size: "lg", variant: "primary" }),
	 *     {
	 *       root: what.css(["shadow-lg"]),
	 *       icon: what.css(["w-5", "h-5"])
	 *     }
	 *   )
	 * ]
	 * ```
	 */
	rules: RuleDefinition<T>[];

	/**
	 * Default values for variants when no specific variant is provided.
	 *
	 * This object specifies the fallback values for each variant defined in the
	 * contract. These defaults are used when creating styled instances without
	 * explicit variant overrides. Defaults can be overridden at runtime through
	 * the `create()` method or component props.
	 *
	 * @example
	 * ```typescript
	 * defaults: def.defaults({
	 *   // String variants
	 *   size: "md",
	 *   variant: "default",
	 *   theme: "light",
	 *
	 *   // Boolean variants
	 *   disabled: false,
	 *   loading: false,
	 *   fullWidth: false
	 * })
	 * ```
	 *
	 * @example
	 * ```typescript
	 * // Usage with defaults
	 * const slots = ButtonCls.create(); // Uses defaults: size="md", variant="default"
	 *
	 * // Override defaults at runtime
	 * const slots = ButtonCls.create(({ what }) => ({
	 *   variant: what.variant({ size: "lg", variant: "primary" })
	 * }));
	 * ```
	 */
	defaults: VariantValueMapping<T>;
};

export type DefinitionFn<TContract extends Contract<any, any, any>> = (
	props: WhatUtil<TContract>,
) => Definition<TContract>;

export type CreateConfig<T extends Contract<any, any, any>> = {
	variant?: Partial<VariantValueMapping<T>>;
	slot?: SlotMapping<T>;
	override?: SlotMapping<T>;
	token?: Partial<TokenDefinitionOptional<T>>;
};

/**
 * Standard component props interface that provides CLS integration capabilities.
 *
 * This helper type defines the standard structure for React component props that need
 * CLS styling integration. It provides optional `tva` and `cls` properties while
 * preserving all other props from the base type `P`.
 *
 * @template TCls - The CLS instance type for styling
 * @template P - The base props type to extend (defaults to `unknown`)
 *
 * @example
 * ```typescript
 * // Basic usage in a component
 * interface ButtonProps extends Component<typeof ButtonCls> {
 *   children: ReactNode;
 *   onClick?: () => void;
 * }
 *
 * const Button: FC<ButtonProps> = ({ tva = ButtonCls, cls, children, onClick }) => {
 *   const slots = tva.create(cls);
 *   return (
 *     <button className={slots.root()} onClick={onClick}>
 *       {children}
 *     </button>
 *   );
 * };
 * ```
 *
 * @example
 * ```typescript
 * // With custom styling configuration
 * const Button: FC<ButtonProps> = ({ tva = ButtonCls, cls, children, onClick }) => {
 *   const slots = tva.create(cls, ({ what }) => ({
 *     variant: what.variant({ size: "lg", variant: "primary" })
 *   }));
 *
 *   return (
 *     <button className={slots.root()} onClick={onClick}>
 *       {children}
 *     </button>
 *   );
 * };
 * ```
 */
export type Component<TCls extends Cls<any>, P = unknown> = {
	/**
	 * The CLS instance to use for styling. If not provided, the component should
	 * use a default CLS instance. This allows components to be styled with different
	 * CLS instances while maintaining type safety.
	 *
	 * @example
	 * ```typescript
	 * // Use default styling
	 * <Button>Click me</Button>
	 *
	 * // Use extended CLS instance
	 * <Button tva={ButtonCls.use(PrimaryButtonCls)}>Click me</Button>
	 * ```
	 */
	tva?: TCls;

	/**
	 * Optional styling configuration function that receives the `WhatUtil` object
	 * and returns partial configuration overrides. This allows for dynamic styling
	 * based on component state or props.
	 *
	 * @example
	 * ```typescript
	 * // Static configuration
	 * <Button cls={({ what }) => ({
	 *   variant: what.variant({ size: "lg" })
	 * })}>Click me</Button>
	 *
	 * // Dynamic configuration based on props
	 * <Button cls={({ what }) => ({
	 *   variant: what.variant({
	 *     size: size,
	 *     variant: isPrimary ? "primary" : "default"
	 *   })
	 * })}>Click me</Button>
	 * ```
	 */
	cls?: (
		props: WhatUtil<TCls["contract"]>,
	) => Partial<CreateConfig<TCls["contract"]>>;
} & Omit<P, "tva" | "cls">;

/**
 * Extracts the slot functions type from a CLS instance for use in component props.
 *
 * This helper type takes a CLS instance and returns the type of its slot functions.
 * Each slot function accepts an optional configuration and returns a CSS class string.
 * This is commonly used in React components to provide type-safe access to styling slots.
 *
 * @template TCls - The CLS instance type
 *
 * @example
 * ```typescript
 * // Given a CLS with slots: ["root", "icon", "label"]
 * interface ButtonProps {
 *   slots?: ComponentSlots<typeof ButtonCls>;
 * }
 *
 * // Usage in component
 * const Button: FC<ButtonProps> = ({ slots = ButtonCls.create() }) => {
 *   return (
 *     <button className={slots.root()}>
 *       <Icon className={slots.icon()} />
 *       <span className={slots.label()}>Click me</span>
 *     </button>
 *   );
 * };
 * ```
 *
 * @example
 * ```typescript
 * // With custom configuration
 * const Button: FC<ButtonProps> = ({ slots = ButtonCls.create() }) => {
 *   const customSlots = slots(({ what }) => ({
 *     variant: what.variant({ size: "lg", variant: "primary" })
 *   }));
 *
 *   return (
 *     <button className={customSlots.root()}>
 *       <Icon className={customSlots.icon()} />
 *       <span className={customSlots.label()}>Click me</span>
 *     </button>
 *   );
 * };
 * ```
 */
export type ComponentSlots<TCls extends Cls<any>> = ClsSlots<TCls["contract"]>;

/**
 * Extracts the value type for a specific variant from a CLS instance.
 *
 * This helper type takes a CLS instance and a variant name, then returns the appropriate
 * value type for that variant. For boolean variants (defined with "bool" in the contract),
 * it returns `boolean`. For all other variants, it returns the string literal type.
 *
 * @template TCls - The CLS instance type
 * @template TVariant - The name of the variant to extract the type for
 *
 * @example
 * ```typescript
 * // Given a CLS with variants: { size: ["sm", "md", "lg"], disabled: ["bool"] }
 * type ButtonSize = VariantOf<typeof ButtonCls, "size">; // "sm" | "md" | "lg"
 * type ButtonDisabled = VariantOf<typeof ButtonCls, "disabled">; // boolean
 * ```
 *
 * @example
 * ```typescript
 * // Usage in component props
 * interface ButtonProps {
 *   size?: VariantOf<typeof ButtonCls, "size">;
 *   disabled?: VariantOf<typeof ButtonCls, "disabled">;
 * }
 * ```
 */
export type VariantOf<
	TCls extends Cls<any>,
	TVariant extends keyof Variants<TCls["contract"]>,
> = Variants<TCls["contract"]>[TVariant] extends readonly (infer U extends
	string)[]
	? StringToBool<U>
	: never;

/**
 * Extracts all available variants from a CLS instance into a type-safe object structure.
 *
 * This utility type creates a partial object type where each key represents a variant name
 * and each value represents the possible variant values for that variant. It's particularly
 * useful for:
 * - Type-checking variant configurations in component props
 * - Creating default variant objects
 * - Ensuring type safety when working with variant combinations
 * - Documentation and IDE autocompletion for available variants
 *
 * The resulting type is `Partial`, meaning all variant properties are optional, allowing
 * you to specify only the variants you need while maintaining type safety for the ones
 * you do specify.
 *
 * @template TCls - The CLS instance type to extract variants from
 * @returns A partial object type with variant names as keys and their possible values as values
 *
 * @example
 * ```typescript
 * // Define a button with multiple variants
 * const ButtonCls = cls(
 *   {
 *     variant: {
 *       size: ["sm", "md", "lg"],
 *       color: ["primary", "secondary", "danger"],
 *       state: ["enabled", "disabled"]
 *     }
 *   },
 *   ({ what, def }) => ({
 *     // ... styling definition
 *   })
 * );
 *
 * // Extract all variants into a type-safe object
 * type ButtonVariants = VariantsOf<typeof ButtonCls>;
 * // Result: {
 * //   size?: "sm" | "md" | "lg";
 * //   color?: "primary" | "secondary" | "danger";
 * //   state?: "enabled" | "disabled";
 * // }
 *
 * // Use in component props for type safety
 * interface ButtonProps {
 *   variants?: VariantsOf<typeof ButtonCls>;
 * }
 *
 * // Create a default variants object
 * const defaultVariants: VariantsOf<typeof ButtonCls> = {
 *   size: "md",
 *   color: "primary",
 *   state: "enabled"
 * };
 * ```
 */
export type VariantsOf<TCls extends Cls<any>> = Partial<
	VariantValueMapping<TCls["contract"]>
>;

/**
 * Main CLS instance interface that provides styling capabilities through contracts and definitions.
 *
 * This interface represents a complete CLS instance that combines a contract (structure)
 * with a definition (styling values) to provide a type-safe styling system. It offers
 * methods for creating styled instances, extending functionality, and managing inheritance.
 *
 * @template T - The contract type that defines the structure (tokens, slots, variants)
 *
 * @example
 * ```typescript
 * // Create a CLS instance
 * const ButtonCls = cls(contract, definition);
 *
 * // Use the instance to create styled components
 * const slots = ButtonCls.create();
 * const customSlots = ButtonCls.create(({ what }) => ({
 *   variant: what.variant({ size: "lg", variant: "primary" })
 * }));
 * ```
 */
export interface Cls<T extends Contract<any, any, any>> {
	/**
	 * Creates a styled instance with optional configuration overrides.
	 *
	 * This method generates slot functions that can be called to get CSS class strings.
	 * It accepts optional user and internal configuration functions that can override
	 * the default styling behavior.
	 *
	 * @param userConfigFn - Optional user configuration function for runtime overrides
	 * @param internalConfigFn - Optional internal configuration function for component logic
	 * @returns An object with slot functions that return CSS class strings
	 *
	 * @example
	 * ```typescript
	 * // Basic usage - use default styling
	 * const slots = ButtonCls.create();
	 * const className = slots.root(); // "inline-flex items-center text-gray-900 bg-gray-100"
	 *
	 * // With user configuration
	 * const slots = ButtonCls.create(({ what }) => ({
	 *   variant: what.variant({ size: "lg", variant: "primary" })
	 * }));
	 * const className = slots.root(); // "inline-flex items-center text-white bg-blue-600 px-6 py-3"
	 *
	 * // With both user and internal configuration
	 * const slots = ButtonCls.create(
	 *   ({ what }) => ({ variant: what.variant({ size: "lg" }) }), // User config
	 *   ({ what }) => ({ slot: { root: what.css(["internal-class"]) } }) // Internal config
	 * );
	 * ```
	 */
	create(
		userConfigFn?: WhatConfigFn<T>,
		internalConfigFn?: WhatConfigFn<T>,
	): ClsSlots<T>;

	/**
	 * Extends the current CLS instance with additional functionality.
	 *
	 * This method creates a new CLS instance that inherits from the current one,
	 * adding new tokens, slots, or variants while preserving the existing functionality.
	 * The new instance can override inherited values and add new styling rules.
	 *
	 * @template TTokenContract - Additional token contract
	 * @template TSlotContract - Additional slot contract
	 * @template TVariantContract - Additional variant contract
	 * @param contract - Extended contract with new tokens, slots, and variants
	 * @param definition - Function that receives WhatUtil and returns the extended definition
	 * @returns A new CLS instance with extended functionality
	 *
	 * @example
	 * ```typescript
	 * // Extend with new variants and tokens
	 * const PrimaryButtonCls = ButtonCls.extend(
	 *   {
	 *     tokens: ["color.bg.primary", "color.text.primary"],
	 *     slot: ["root", "icon"],
	 *     variant: {
	 *       loading: ["bool"],
	 *       size: ["sm", "md", "lg", "xl"]
	 *     }
	 *   },
	 *   ({ what, def }) => ({
	 *     token: def.token({
	 *       "color.bg.primary": what.css(["bg-blue-600"]),
	 *       "color.text.primary": what.css(["text-white"])
	 *     }),
	 *     rules: [
	 *       def.rule(
	 *         what.variant({ loading: true }),
	 *         { root: what.css(["opacity-75", "cursor-not-allowed"]) }
	 *       )
	 *     ],
	 *     defaults: def.defaults({ loading: false, size: "md" })
	 *   })
	 * );
	 * ```
	 */
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

	/**
	 * Assigns a compatible CLS instance for type-safe inheritance.
	 *
	 * This method provides type-safe assignment of CLS instances that are derived
	 * from the current instance. It ensures that only compatible instances can be
	 * assigned, preventing runtime errors from incompatible styling systems.
	 *
	 * @template Sub - The sub-instance type that must be derived from the current instance
	 * @param sub - A CLS instance that must be derived from the current instance
	 * @returns The current CLS instance for method chaining
	 *
	 * @example
	 * ```typescript
	 * // Assign a compatible instance
	 * const ButtonGroup = ButtonCls.use(PrimaryButtonCls);
	 *
	 * // This would cause a TypeScript error if PrimaryButtonCls is not derived from ButtonCls
	 * // const InvalidGroup = ButtonCls.use(SomeOtherCls); // ❌ Type error
	 *
	 * // Use the assigned instance
	 * const slots = ButtonGroup.create();
	 * ```
	 */
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

	/**
	 * Creates a configuration function for use in component props.
	 *
	 * This method generates a configuration function that can be passed to components
	 * via the `cls` prop. It provides type-safe access to styling configuration
	 * while ensuring compatibility with the current CLS instance.
	 *
	 * @template Sub - The sub-contract type (defaults to the current contract)
	 * @param userConfigFn - Optional user configuration function
	 * @param internalConfigFn - Optional internal configuration function
	 * @returns A configuration function or undefined
	 *
	 * @example
	 * ```typescript
	 * // Create a configuration function for component props
	 * const configFn = ButtonCls.cls(({ what }) => ({
	 *   variant: what.variant({ size: "lg", variant: "primary" })
	 * }));
	 *
	 * // Use in component
	 * <Button cls={configFn}>Click me</Button>
	 *
	 * // Or create inline
	 * <Button cls={ButtonCls.cls(({ what }) => ({
	 *   variant: what.variant({ size: "lg" })
	 * }))}>Click me</Button>
	 * ```
	 */
	cls<Sub extends Contract<any, any, any> = T>(
		userConfigFn?: {
			hack: ClsConfigFn<T, Sub>;
		}["hack"],
		internalConfigFn?: {
			hack: ClsConfigFn<T, Sub>;
		}["hack"],
	): WhatConfigFn<T> | undefined;

	/**
	 * The contract that defines the structure of this CLS instance.
	 *
	 * Contains the tokens, slots, and variants that define what can be styled
	 * and how the styling system is structured.
	 *
	 * @example
	 * ```typescript
	 * // Access contract information
	 * console.log(ButtonCls.contract.tokens); // ["color.text.default", "color.bg.default", ...]
	 * console.log(ButtonCls.contract.slot); // ["root", "label", "icon"]
	 * console.log(ButtonCls.contract.variant); // { size: ["sm", "md", "lg"], variant: ["default", "primary"] }
	 * ```
	 */
	contract: T;

	/**
	 * The definition that provides concrete styling values for this CLS instance.
	 *
	 * Contains the token definitions, styling rules, and default values that
	 * determine how the component is actually styled.
	 *
	 * @example
	 * ```typescript
	 * // Access definition information
	 * console.log(ButtonCls.definition.token); // { "color.text.default": {...}, ... }
	 * console.log(ButtonCls.definition.rules); // Array of styling rules
	 * console.log(ButtonCls.definition.defaults); // { size: "md", variant: "default" }
	 * ```
	 */
	definition: Definition<T>;
}
