import { twMerge } from "tailwind-merge";
import type { ClassName } from "./types/ClassName";
import type { ElementFn } from "./types/element/ElementFn";
import type { Elements } from "./types/element/Elements";
import type { DefaultsEx } from "./types/ex/DefaultsEx";
import type { ClsFn } from "./types/fn/ClsFn";
import type { SlotFn } from "./types/fn/SlotFn";
import type { Match } from "./types/Match";
import type { SlotProps } from "./types/props/SlotProps";
import type { VariantProps } from "./types/props/VariantProps";
import { proxyOf } from "./utils/proxyOf";

export namespace cls {
	/**
	 * Configuration interface for creating a cls component.
	 * TSlot represents the slot definition with slot names as keys.
	 * TVariant represents the variant definition with variant categories as keys.
	 * TUse represents an extension function that may provide additional slots and variants.
	 * This interface defines all the options needed to create a fully functional cls component.
	 */
	export interface Props<
		TSlotProps extends SlotProps<any>,
		TVariantProps extends VariantProps<keyof TSlotProps & string, any>,
		TUse extends ClsFn<any, any, any> | unknown = unknown,
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
		slot: TSlotProps;
		/**
		 * Define or override variants.
		 *
		 * Variants can contain an empty array if they're dynamic. When variant contains classes,
		 * they're applied to all slots.
		 */
		variant: TVariantProps;
		/**
		 * Matching rules.
		 *
		 * Those are used to compute dynamic class names based on the current state (input values).
		 */

		match?: Match<TSlotProps, TVariantProps, TUse>[];
		/**
		 * Default values.
		 *
		 * They're (cleverly) required to prevent surprises when using variants.
		 */
		defaults: DefaultsEx<TSlotProps, TVariantProps, TUse>;
	}
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
	TSlotProps extends SlotProps<any>,
	TVariantProps extends VariantProps<keyof TSlotProps & string, any>,
	TUse extends ClsFn<any, any, any> | unknown = unknown,
>({
	use,
	slot,
	variant,
	match = [],
	defaults,
}: cls.Props<TSlotProps, TVariantProps, TUse>): ClsFn<
	TSlotProps,
	TVariantProps,
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
			{} as ReturnType<ClsFn<TSlotProps, TVariantProps, TUse>>["slots"],
			{
				get(_, key: string): SlotFn<TSlotProps, TVariantProps, TUse> {
					return (override, $cls) => {
						/**
						 * Array to collect all class names that will be merged together.
						 * Classes are added in order of precedence: extensions first, then base slots, then variants, then overrides.
						 */
						const $classes: ClassName[] = [];

						/**
						 * Cast the extension function for type safety.
						 * The extension function provides additional slots and variants that are merged with the base component.
						 */
						const $use: ClsFn<any, any, any> | undefined =
							use as ClsFn<any, any, any>;

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
							$classes.push(value[key]);
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
			el: new Proxy({} as ElementFn<TSlotProps, TVariantProps, TUse>, {
				get(_, key: string): Elements<TSlotProps, TVariantProps, TUse> {
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
					...(use as ClsFn<any, any, any>)?.()?.["~config"].defaults,
					...defaults,
				},
				values: {
					...(use as ClsFn<any, any, any>)?.()?.["~config"].defaults,
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
