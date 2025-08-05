import type {
	ButtonHTMLAttributes,
	FC,
	HTMLAttributes,
	LabelHTMLAttributes,
} from "react";
import { type ClassNameValue, twMerge } from "tailwind-merge";

/**
 * Recursive proxy; used to hack the type system.
 * This creates an infinite chain of proxies that allows for complex type manipulation
 * without actually creating real objects at runtime.
 */
const proxyOf: any = new Proxy(() => proxyOf, {
	get: () => proxyOf,
});

export namespace cls {
	export namespace Internal {
		/**
		 * Just forward class name type to prevent direct dependency on providing package.
		 * This type represents any valid class name value that can be passed to the system.
		 */
		export type ClassName = ClassNameValue;

		/**
		 * Defines the structure of slots in a component.
		 * TSlotKeys represents the names of different slots (like 'base', 'icon', 'label', etc.)
		 * Each slot maps to a class name value that will be applied to that specific part of the component.
		 */
		export type SlotDef<TSlotKeys extends string> = Record<
			TSlotKeys,
			ClassName
		>;

		/**
		 * Defines the structure of variants in a component.
		 * TVariantKeys represents the names of different variant categories (like 'size', 'color', 'state', etc.)
		 * Each variant category maps to a record where keys are variant values and values are class names.
		 * For example: { size: { small: 'text-sm', large: 'text-lg' } }
		 */
		export type VariantDef<TVariantKeys extends string> = Record<
			TVariantKeys,
			Record<string, ClassName>
		>;

		/**
		 * Extracts the possible values for each variant from the variant definition.
		 * For boolean variants (those with only 'true'/'false' keys), it maps to boolean type.
		 * For other variants, it maps to the union of all possible string keys.
		 * This type is used to define what values can be passed to each variant.
		 */
		export type ValuesDef<TVariant> = {
			[K in keyof TVariant]?: keyof TVariant[K] extends "true" | "false"
				? boolean
				: keyof TVariant[K];
		};

		/**
		 * Computes the extended slots by merging current slots with slots from extensions (uses).
		 * TSlot represents the current component's slot definition.
		 * TUse represents an extension function that may provide additional slots.
		 * This type ensures that when a component extends another, all slots from both are available.
		 */
		export type SlotEx<
			TSlot extends SlotDef<any>,
			TUse extends
				| (() => {
						"~type": {
							slot?: SlotDef<any>;
						};
				  })
				| unknown = unknown,
		> = TUse extends () => {
			"~type": {
				slot?: infer S;
			};
		}
			? TSlot & S
			: TSlot;

		/**
		 * Computes the extended variants by merging current variants with variants from extensions (uses).
		 * TVariant represents the current component's variant definition.
		 * TUse represents an extension function that may provide additional variants.
		 * This type ensures that when a component extends another, all variants from both are available.
		 */
		export type VariantEx<
			TVariant extends VariantDef<any>,
			TUse extends
				| (() => {
						"~type": {
							variant?: VariantDef<any>;
						};
				  })
				| unknown = unknown,
		> = TUse extends () => {
			"~type": {
				variant?: infer V;
			};
		}
			? TVariant & V
			: TVariant;

		/**
		 * Computes the extended default values by merging current defaults with defaults from extensions.
		 * Current defaults are required, while extension defaults are marked as optional.
		 * This ensures that base component defaults are always provided, while extensions can add optional defaults.
		 */
		export type DefaultsEx<
			TVariant extends VariantDef<any>,
			TUse extends
				| (() => {
						"~type": {
							variant?: VariantDef<any>;
						};
				  })
				| unknown = unknown,
		> = Required<ValuesDef<TVariant>> &
			(TUse extends () => {
				"~type": {
					variant?: infer V;
				};
			}
				? ValuesDef<V>
				: {});

		/**
		 * Defines a function that computes class names for a specific slot.
		 * TVariant represents the variant definition that this slot function can work with.
		 * TUse represents an extension that may provide additional variants.
		 * The function takes optional variant values and an optional class name override.
		 */
		export type SlotFn<
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = (
			values?: ValuesDef<VariantEx<TVariant, TUse>>,
			cls?: ClassName,
		) => string;

		/**
		 * Maps each slot to its corresponding slot function.
		 * TSlot represents the slot definition with slot names as keys.
		 * TVariant represents the variant definition that all slot functions can work with.
		 * TUse represents an extension that may provide additional slots and variants.
		 * This creates an object where each slot name maps to a function that computes classes for that slot.
		 */
		export type Slots<
			TSlot extends SlotDef<any>,
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = {
			[K in keyof SlotEx<TSlot, TUse>]: SlotFn<TVariant, TUse>;
		};

		export namespace Elements {
			/**
			 * Base interface for all element props.
			 * TVariant represents the variant definition that this element can work with.
			 * TUse represents an extension that may provide additional variants.
			 * All elements can accept variant values and class name overrides.
			 */
			export interface ElementProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> {
				variant?: ValuesDef<VariantEx<TVariant, TUse>>;
				cls?: ClassName;
			}

			/**
			 * Props for div elements with variant support.
			 * Extends HTML div attributes but omits className to prevent conflicts.
			 * TVariant and TUse work the same as in ElementProps.
			 */
			export interface DivProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<HTMLAttributes<HTMLDivElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}

			/**
			 * Props for span elements with variant support.
			 * Extends HTML span attributes but omits className to prevent conflicts.
			 * TVariant and TUse work the same as in ElementProps.
			 */
			export interface SpanProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<HTMLAttributes<HTMLSpanElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}

			/**
			 * Props for paragraph elements with variant support.
			 * Extends HTML paragraph attributes but omits className to prevent conflicts.
			 * TVariant and TUse work the same as in ElementProps.
			 */
			export interface ParagraphProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<HTMLAttributes<HTMLParagraphElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}

			/**
			 * Props for label elements with variant support.
			 * Extends HTML label attributes but omits className to prevent conflicts.
			 * TVariant and TUse work the same as in ElementProps.
			 */
			export interface LabelProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}

			/**
			 * Props for button elements with variant support.
			 * Extends HTML button attributes but omits className to prevent conflicts.
			 * TVariant and TUse work the same as in ElementProps.
			 */
			export interface ButtonProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<
						ButtonHTMLAttributes<HTMLButtonElement>,
						"className"
					>,
					ElementProps<TVariant, TUse> {
				//
			}

			/**
			 * Props for anchor elements with variant support.
			 * Extends HTML anchor attributes but omits className to prevent conflicts.
			 * TVariant and TUse work the same as in ElementProps.
			 */
			export interface AnchorProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<HTMLAttributes<HTMLAnchorElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}
		}

		/**
		 * Collection of React functional components for each HTML element type.
		 * TVariant represents the variant definition that all elements can work with.
		 * TUse represents an extension that may provide additional variants.
		 * Each element component accepts the corresponding props interface and renders with computed classes.
		 */
		export interface Elements<
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> {
			Div: FC<Elements.DivProps<TVariant, TUse>>;
			Span: FC<Elements.SpanProps<TVariant, TUse>>;
			Paragraph: FC<Elements.ParagraphProps<TVariant, TUse>>;
			Label: FC<Elements.LabelProps<TVariant, TUse>>;
			Button: FC<Elements.ButtonProps<TVariant, TUse>>;
			Anchor: FC<Elements.AnchorProps<TVariant, TUse>>;
		}

		/**
		 * Maps each slot to a collection of element components.
		 * TSlot represents the slot definition with slot names as keys.
		 * TVariant represents the variant definition that all elements can work with.
		 * TUse represents an extension that may provide additional slots and variants.
		 * This creates an object where each slot name maps to a set of element components for that slot.
		 */
		export type ElementFn<
			TSlot extends SlotDef<any>,
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = {
			[K in keyof SlotEx<TSlot, TUse>]: Elements<TVariant, TUse>;
		};

		/**
		 * Internal configuration object that tracks the state of variant values.
		 * TVariantEx represents the extended variant definition including extensions.
		 * This object contains both the default values and the current computed values.
		 */
		export interface Config<TVariantEx extends VariantEx<any, any>> {
			/**
			 * Cumulated default values from all variants (including uses - extensions).
			 * These are the base values that are applied when no specific values are provided.
			 */
			defaults: ValuesDef<TVariantEx>;
			/**
			 * Combined cumulated defaults & current values provided to the cls function.
			 * This represents the final computed state of all variant values.
			 */
			values: ValuesDef<TVariantEx>;
		}

		/**
		 * Type information used for inheritance and type checking.
		 * TSlotEx represents the extended slots including extensions.
		 * TVariantEx represents the extended variants including extensions.
		 * TUse represents the extension function that provides additional slots and variants.
		 * This type is used internally for type system manipulation and inheritance.
		 */
		export type Type<
			TSlotEx extends SlotEx<any, TUse>,
			TVariantEx extends VariantEx<any, TUse>,
			TUse extends ClsFn<any, any, any> | unknown,
		> = {
			/**
			 * Extension type for this variant.
			 * This references the extension function that provides additional slots and variants.
			 */
			use?: TUse;
			/**
			 * Cumulated slots from all extensions.
			 * This contains all available slots from the base component and all extensions.
			 */
			slot?: TSlotEx;
			/**
			 * Cumulated variants from all extensions.
			 * This contains all available variants from the base component and all extensions.
			 */
			variant?: TVariantEx;
		};

		/**
		 * Maps slot names to optional class name values.
		 * TSlot represents the slot definition with slot names as keys.
		 * TUse represents an extension that may provide additional slots.
		 * This type is used when providing class name overrides for specific slots.
		 */
		export type SlotCls<
			TSlot extends SlotDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = {
			[K in keyof SlotEx<TSlot, TUse>]?: ClassName;
		};

		/**
		 * The main factory function type that creates the cls system.
		 * TSlot represents the slot definition with slot names as keys.
		 * TVariant represents the variant definition with variant categories as keys.
		 * TUse represents an extension function that may provide additional slots and variants.
		 * This function takes variant values and slot class overrides, returning an object with slots, elements, and internal metadata.
		 */
		export type ClsFn<
			TSlot extends SlotDef<any>,
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = (
			variant?: ValuesDef<VariantEx<TVariant, TUse>>,
			cls?: SlotCls<TSlot, TUse>,
		) => {
			/**
			 * Individual slots for a component. Those slots are then
			 * used to compute individual class names.
			 */
			slots: Slots<TSlot, TVariant, TUse>;
			/**
			 * Access predefined slots as an elements (e.g. div, span, ...).
			 *
			 * This is shortcut for <div className={slots.base()} /> etc.
			 */
			el: ElementFn<TSlot, TVariant, TUse>;
			/**
			 * Configuration used internally.
			 *
			 * This property does not havy any practical use in runtime.
			 */
			"~config": Config<VariantEx<TVariant, TUse>>;
			/**
			 * Used for inheritance and type checking.
			 *
			 * This property does not havy any practical use in runtime.
			 */
			"~type": Type<SlotEx<TSlot, TUse>, VariantEx<TVariant, TUse>, TUse>;
		};

		/**
		 * Defines a matching rule for dynamic class application.
		 * TSlot represents the slot definition that this rule can affect.
		 * TVariant represents the variant definition that this rule can check.
		 * TUse represents an extension that may provide additional slots and variants.
		 * Matching rules allow applying specific classes when certain variant conditions are met.
		 */
		export interface Match<
			TSlot extends SlotDef<any>,
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> {
			/**
			 * Conditions to match.
			 *
			 * All the provided values must match to apply the rule.
			 */
			if: ValuesDef<VariantEx<TVariant, TUse>>;
			/**
			 * Classes to apply when all conditions are met.
			 *
			 * Keys are slot names.
			 */
			do: SlotCls<TSlot, TUse>;
		}
	}
}

export namespace cls {
	/**
	 * Alias for the internal ClassName type.
	 * Represents any valid class name value that can be used in the cls system.
	 */
	export type Class = Internal.ClassName;

	/**
	 * Configuration interface for creating a cls component.
	 * TSlot represents the slot definition with slot names as keys.
	 * TVariant represents the variant definition with variant categories as keys.
	 * TUse represents an extension function that may provide additional slots and variants.
	 * This interface defines all the options needed to create a fully functional cls component.
	 */
	export interface Config<
		TSlot extends Internal.SlotDef<any>,
		TVariant extends Internal.VariantDef<any>,
		TUse extends Internal.ClsFn<any, any, any> | unknown = unknown,
	> {
		/**
		 * Extension of the component.
		 *
		 * When provided, it also provides full type-checking from all previous
		 * extend variants.
		 */
		use?: TUse;
		/**
		 * Define or override slots.
		 *
		 * Slot is a set of classes that are used to compute the final class name.
		 *
		 * By a convention and simpler use, even single-slot component must be placed here.
		 */
		slot: TSlot;
		/**
		 * Define or override variants.
		 *
		 * Variants can contain an empty array if they're dynamic. When variant contains classes,
		 * they're applied to all slots.
		 */
		variant: TVariant;
		/**
		 * Matching rules.
		 *
		 * Those are used to compute dynamic class names based on the current state (input values).
		 */

		// TODO Change structure to tuple [if, do] instead of object
		match?: Internal.Match<TSlot, TVariant, TUse>[];
		/**
		 * Default values.
		 *
		 * They're (cleverly) required to prevent surprises when using variants.
		 */
		defaults: Internal.DefaultsEx<TVariant, TUse>;
	}

	/**
	 * Type for component props that include cls system props.
	 * TCls represents the cls function type that this component uses.
	 * P represents additional props that the component may have.
	 * This type automatically includes variant, tva, and cls props while omitting them from the base props to prevent conflicts.
	 */
	export type Props<
		TCls extends Internal.ClsFn<any, any, any>,
		P = unknown,
	> = {
		variant?: Internal.ValuesDef<
			Internal.VariantEx<ReturnType<TCls>["~type"]["variant"], TCls>
		>;
		tva?: TCls;
		cls?: {
			[K in keyof Internal.SlotEx<
				ReturnType<TCls>["~type"]["slot"],
				TCls
			>]?: Class;
		};
	} & Omit<P, "variant" | "tva" | "cls">;

	/**
	 * Extracts only the cls-related props from a Props type.
	 * TProps represents the full props type that includes cls system props.
	 * This type picks only the variant, tva, and cls properties for when you need just the cls system props.
	 */
	export type Extract<TProps extends Props<any>> = Pick<
		TProps,
		"variant" | "tva" | "cls"
	>;

	/**
	 * Removes cls-related props from a Props type.
	 * TProps represents the full props type that includes cls system props.
	 * This type omits the variant, tva, and cls properties, useful when you want to extend props
	 * and provide your own cls type.
	 */
	export type Clear<TProps extends Props<any>> = Omit<
		TProps,
		"variant" | "tva" | "cls"
	>;

	/**
	 * Extracts the slots type from a cls function.
	 * TCls represents the cls function type.
	 * This type gives you access to the slots object type that the cls function returns.
	 */
	export type Slots<TCls extends Internal.ClsFn<any, any, any>> =
		ReturnType<TCls>["slots"];
}

/**
 * Creates a cls component factory with full type safety and inheritance support.
 * TSlot represents the slot definition with slot names as keys - these are the different parts of your component that can have different styles.
 * TVariant represents the variant definition with variant categories as keys - these are the different ways your component can vary (size, color, state, etc.).
 * TUse represents an extension function that may provide additional slots and variants - this enables component inheritance and composition.
 *
 * This function is an advanced implementation of tailwind-variants with strict API design and powerful type checking, including inheritance support.
 * It creates a factory function that can be called with variant values to generate the appropriate class names for each slot.
 */
export function cls<
	TSlot extends cls.Internal.SlotDef<any>,
	TVariant extends cls.Internal.VariantDef<any>,
	TUse extends cls.Internal.ClsFn<any, any, any> | unknown = unknown,
>({
	use,
	slot,
	variant,
	match = [],
	defaults,
}: cls.Config<TSlot, TVariant, TUse>): cls.Internal.ClsFn<
	TSlot,
	TVariant,
	TUse
> {
	/**
	 * Returns a factory function that can be called with variant values and slot overrides.
	 * This factory function creates the actual cls system instance with computed slots, elements, and metadata.
	 */
	return (values, cls) => {
		/**
		 * Creates a proxy object that dynamically generates slot functions.
		 * Each slot function computes the appropriate class names based on the current variant values,
		 * extension values, and any provided overrides.
		 */
		const slots = new Proxy(
			{} as ReturnType<
				cls.Internal.ClsFn<TSlot, TVariant, TUse>
			>["slots"],
			{
				get(_, key: string): cls.Internal.SlotFn<TVariant, TUse> {
					return (override, $cls) => {
						/**
						 * Array to collect all class names that will be merged together.
						 * Classes are added in order of precedence: extensions first, then base slots, then variants, then overrides.
						 */
						const $classes: cls.Internal.ClassName[] = [];

						/**
						 * Cast the extension function for type safety.
						 * The extension function provides additional slots and variants that are merged with the base component.
						 */
						const $use:
							| cls.Internal.ClsFn<any, any, any>
							| undefined = use as cls.Internal.ClsFn<
							any,
							any,
							any
						>;

						/**
						 * Computes the final variant values by merging in order of precedence:
						 * 1. Extension defaults (from the use function)
						 * 2. Local default values (from the defaults parameter)
						 * 3. Values provided by the component call (from the values parameter)
						 * 4. Override values provided at the slot function call (from the override parameter)
						 * This ensures that more specific values override more general ones.
						 */
						const $values = {
							...$use?.()?.["~config"].defaults,
							...defaults,
							...values,
							...override,
						};

						/**
						 * Adds classes from the extension first, as they may be overridden by the base component.
						 * This allows extensions to provide base styles that can be customized by the main component.
						 */
						$classes.push($use?.($values)?.slots[key]?.($values));
						/**
						 * Adds classes from the current slot definition.
						 * These are the base classes for this specific slot, converted to an array for consistency.
						 */
						$classes.push(
							Array.isArray(slot[key])
								? slot[key]
								: [
										slot[key],
									],
						);

						/**
						 * Iterates through all variant values and adds the corresponding classes.
						 * Only adds classes for "truthy" values to avoid adding empty or undefined classes.
						 * This applies variant-specific styles based on the current state.
						 */
						for (const [k, v] of Object.entries($values)) {
							const value = variant[k]?.[v as string];
							if (!value) {
								continue;
							}
							$classes.push(value);
						}

						/**
						 * Processes all matching rules to apply conditional classes.
						 * A rule is applied when all conditions in the rule.if object match the current values.
						 * This enables dynamic styling based on complex combinations of variant values.
						 */
						for (const rule of match) {
							Object.entries(rule.if).every(
								([entry, value]) => value === $values[entry],
							) && $classes.push(rule.do?.[key]);
						}

						/**
						 * Adds any class overrides provided at the component level.
						 * These are the most specific overrides and take highest precedence.
						 */
						$classes.push(cls?.[key]);
						/**
						 * Adds any class overrides provided at the slot function level.
						 * These are the most specific overrides and take highest precedence.
						 */
						$classes.push($cls);

						/**
						 * Merges all collected classes using tailwind-merge to handle conflicts and duplicates.
						 * This ensures that conflicting classes are resolved properly and duplicates are removed.
						 */
						return twMerge($classes);
					};
				},
			},
		);

		return {
			/**
			 * The slots object provides functions for each slot that compute the appropriate class names.
			 * Each slot function takes optional variant values and class overrides.
			 * The proxy ensures type safety while allowing dynamic slot access.
			 */
			slots,
			/**
			 * The elements object provides React components for each slot.
			 * Each element component accepts the same props as regular HTML elements plus variant and cls props.
			 * This provides a convenient way to render slots as specific HTML elements with computed classes.
			 */
			el: new Proxy({} as cls.Internal.ElementFn<TSlot, TVariant, TUse>, {
				get(_, key: string): cls.Internal.Elements<TVariant, TUse> {
					return {
						/**
						 * Div component that renders with computed classes for the specified slot.
						 * Accepts all standard div props plus variant and cls props.
						 */
						Div({ variant, cls, ...props }) {
							return (
								<div
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						/**
						 * Span component that renders with computed classes for the specified slot.
						 * Accepts all standard span props plus variant and cls props.
						 */
						Span({ variant, cls, ...props }) {
							return (
								<span
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						/**
						 * Paragraph component that renders with computed classes for the specified slot.
						 * Accepts all standard paragraph props plus variant and cls props.
						 */
						Paragraph({ variant, cls, ...props }) {
							return (
								<p
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						/**
						 * Label component that renders with computed classes for the specified slot.
						 * Accepts all standard label props plus variant and cls props.
						 */
						Label({ variant, cls, ...props }) {
							return (
								<label
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						/**
						 * Button component that renders with computed classes for the specified slot.
						 * Accepts all standard button props plus variant and cls props.
						 */
						Button({ variant, cls, ...props }) {
							return (
								<button
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						/**
						 * Anchor component that renders with computed classes for the specified slot.
						 * Accepts all standard anchor props plus variant and cls props.
						 */
						Anchor({ variant, cls, ...props }) {
							return (
								<a
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
					};
				},
			}),
			/**
			 * Internal configuration object that tracks the current state of variant values.
			 * This object contains both the default values and the computed values.
			 * It's used internally for debugging and type checking but has no practical runtime use.
			 */
			"~config": {
				defaults: {
					...(use as cls.Internal.ClsFn<any, any, any>)?.()?.[
						"~config"
					].defaults,
					...defaults,
				},
				values: {
					...(use as cls.Internal.ClsFn<any, any, any>)?.()?.[
						"~config"
					].defaults,
					...defaults,
					...values,
				},
			},
			/**
			 * Type information used for inheritance and type checking.
			 * This object contains references to the extension function, slots, and variants.
			 * It's used by the TypeScript compiler for type checking but has no practical runtime use.
			 * The proxyOf function creates an infinite chain that satisfies the type system requirements.
			 */
			"~type": proxyOf(),
		};
	};
}
