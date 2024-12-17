import { twMerge, type ClassNameValue } from "tailwind-merge";

/**
 * Recursive proxy; used to hack the type system.
 */
const proxyOf: any = new Proxy(() => proxyOf, {
	get: () => proxyOf,
});

export namespace css {
	/**
	 * Just forward class name type to prevent direct dependency on providing package.
	 */
	export type Class = ClassNameValue;

	/**
	 * Types for the "definition" part of variants.
	 *
	 * Those types should not be used in "public".
	 */
	export namespace Definition {
		export type Slot<TSlotKeys extends string> = Record<TSlotKeys, Class>;

		export type Variant<TVariantKeys extends string> = Record<
			TVariantKeys,
			Record<string, Class>
		>;

		export type Values<TVariant> = {
			[K in keyof TVariant]?: keyof TVariant[K] extends "true" | "false" ?
				boolean
			:	keyof TVariant[K];
		};
	}

	/**
	 * Types for the "runtime" part of variants.
	 *
	 * Those types should not be used in "public".
	 */
	export namespace Use {
		/**
		 * Compute slot from all slots (including uses - extensions).
		 */
		export type SlotEx<
			TSlot extends Definition.Slot<any>,
			TUse extends
				| (() => { type: { slot?: Definition.Slot<any> } })
				| unknown = unknown,
		> = TUse extends () => { type: { slot?: infer S } } ? TSlot & S : TSlot;

		/**
		 * Compute variant from all variants (including uses - extensions).
		 */
		export type VariantEx<
			TVariant extends Definition.Variant<any>,
			TUse extends
				| (() => { type: { variant?: Definition.Variant<any> } })
				| unknown = unknown,
		> =
			TUse extends () => { type: { variant?: infer V } } ? TVariant & V
			:	TVariant;

		/**
		 * Compute default values from all variants (including uses - extensions).
		 *
		 * Current defaults are required, extensions are marked as optional.
		 */
		export type DefaultsEx<
			TVariant extends Definition.Variant<any>,
			TUse extends
				| (() => { type: { variant?: Definition.Variant<any> } })
				| unknown = unknown,
		> = Required<Definition.Values<TVariant>> &
			(TUse extends () => { type: { variant?: infer V } } ? Definition.Values<V>
			:	{});

		/**
		 * CSS property.
		 *
		 * Computes keys based on all slots (including extensions).
		 */
		export interface CssEx<
			TSlot extends Definition.Slot<string>,
			TUse = unknown,
		> {
			/**
			 * Individual slot classes.
			 *
			 * Keys are slot names.
			 */
			css?: {
				[K in keyof SlotEx<TSlot, TUse>]?: Class;
			};
		}

		/**
		 * Output of the factory method.
		 */
		export type Variants<
			TSlot extends Definition.Slot<any>,
			TVariant extends Definition.Variant<any>,
			TUse extends Variants<any, any, any> | unknown = unknown,
		> = (
			values?: Definition.Values<VariantEx<TVariant, TUse>> &
				CssEx<TSlot, TUse>,
		) => {
			/**
			 * Individual slots for a component. Those slots are then
			 * used to compute individual class names.
			 */
			slots: {
				[K in keyof SlotEx<TSlot, TUse>]: (
					values?: Definition.Values<VariantEx<TVariant, TUse>> & {
						css?: Class;
					},
				) => string;
			};
			/**
			 * Configuration used internally.
			 *
			 * This property does not havy any practical use in runtime.
			 */
			config: {
				/**
				 * Cumulated default values from all variants (including uses - extensions).
				 */
				defaults: Definition.Values<VariantEx<TVariant, TUse>>;
				/**
				 * Combined cumulated defaults & current values provided to `tva()`.
				 */
				values: Definition.Values<VariantEx<TVariant, TUse>>;
			};
			/**
			 * Used for inheritance and type checking.
			 *
			 * This property does not havy any practical use in runtime.
			 */
			type: {
				/**
				 * Extension type for this variant.
				 */
				use?: TUse;
				/**
				 * Cumulated slots from all extensions.
				 */
				slot?: SlotEx<TSlot, TUse>;
				/**
				 * Cumulated variants from all extensions.
				 */
				variant?: VariantEx<TVariant, TUse>;
			};
		};
	}

	/**
	 * Matching rules.
	 */
	export interface Match<
		TSlot extends Definition.Slot<any>,
		TVariant extends Definition.Variant<any>,
		TUse extends Use.Variants<any, any, any> | unknown = unknown,
	> {
		/**
		 * Conditions to match.
		 *
		 * All the provided values must match to apply the rule.
		 */
		if: Definition.Values<Use.VariantEx<TVariant, TUse>>;
		/**
		 * Classes to apply when all conditions are met.
		 *
		 * Keys are slot names.
		 */
		then: {
			[K in keyof Use.SlotEx<TSlot, TUse>]?: Class;
		};
	}

	/**
	 * Variants configuration.
	 */
	export interface Config<
		TSlot extends Definition.Slot<any>,
		TVariant extends Definition.Variant<any>,
		TUse extends Use.Variants<any, any, any> | unknown = unknown,
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
		match?: Match<TSlot, TVariant, TUse>[];
		/**
		 * Default values.
		 *
		 * They're (cleverly) required to prevent surprises when using variants.
		 */
		defaults: Use.DefaultsEx<TVariant, TUse>;
	}

	/**
	 * When used in components, this is a safe way how to extend component props.
	 *
	 * It omits `variant`, `tva`, and `css` props from the parent props.
	 */
	export type Props<
		TVariants extends Use.Variants<any, any, any>,
		P = unknown,
	> = {
		variant?: Definition.Values<
			Use.VariantEx<ReturnType<TVariants>["type"]["variant"], TVariants>
		>;
		tva?: TVariants;
		css?: {
			[K in keyof Use.SlotEx<
				ReturnType<TVariants>["type"]["slot"],
				TVariants
			>]?: Class;
		};
	} & Omit<P, "variant" | "tva" | "css">;

	export type Extract<TProps extends Props<any>> = Pick<
		TProps,
		"variant" | "tva" | "css"
	>;
}

/**
 * Create variants for a component (or whatever usage you need).
 *
 * This method is an advanced implementation of tailwind-variants with a bit more strict
 * API, but powerful type checking, including inheritance.
 */
export function css<
	TSlot extends css.Definition.Slot<any>,
	TVariant extends css.Definition.Variant<any>,
	TUse extends css.Use.Variants<any, any, any> | unknown = unknown,
>({
	use,
	slot,
	variant,
	match = [],
	defaults,
}: css.Config<TSlot, TVariant, TUse>): css.Use.Variants<TSlot, TVariant, TUse> {
	/**
	 * Output is a factory method used to call at a component level (or whatever place you want).
	 */
	return ({ css, ...values } = {}) => ({
		/**
		 * Proxy all calls to the slots to compute class names.
		 *
		 * Because there is a strict type checking, this should be safe to use; if you break types,
		 * this may fail at runtime.
		 */
		slots: new Proxy(
			{} as ReturnType<css.Use.Variants<TSlot, TVariant, TUse>>["slots"],
			{
				get: (_, key: string) => {
					return ({ css: $css, ...override } = {} as any) => {
						/**
						 * Output classes,
						 */
						const $classes: css.Class[] = [];

						/**
						 * Type "use" (extension) for later use.
						 */
						const $use: css.Use.Variants<any, any, any> | undefined =
							use as css.Use.Variants<any, any, any>;

						/**
						 * Compute current variants from:
						 * - use (extension)
						 * - local default values
						 * - values provided by the component call
						 * - override provided at the class name computation
						 */
						const $values = {
							...$use?.()?.config.defaults,
							...defaults,
							...values,
							...override,
						};

						/**
						 * Push classes from the extension first as they may be overridden.
						 */
						$classes.push($use?.($values)?.slots[key]?.($values));
						/**
						 * Push classes from slot as this is the base set of class names.
						 */
						$classes.push(Array.isArray(slot[key]) ? slot[key] : [slot[key]]);

						/**
						 * Push all "truthy" present variant values.
						 */
						for (const [k, v] of Object.entries($values)) {
							const value = variant[k]?.[v as string];
							if (!value) {
								continue;
							}
							$classes.push(value);
						}

						/**
						 * Resolve all matching rules and push their classes.
						 */
						for (const rule of match) {
							Object.entries(rule.if).every(
								([entry, value]) => value === $values[entry],
							) && $classes.push(rule.then?.[key]);
						}

						/**
						 * Push all overriding classes from the component call.
						 */
						$classes.push(css?.[key]);
						/**
						 * Push all overriding classes from the class name computation.
						 */
						$classes.push($css);

						return twMerge($classes);
					};
				},
			},
		),
		/**
		 * This is a configuration used internally
		 */
		config: {
			defaults: {
				...(use as css.Use.Variants<any, any, any>)?.()?.config.defaults,
				...defaults,
			},
			values: {
				...(use as css.Use.Variants<any, any, any>)?.()?.config.defaults,
				...defaults,
				...values,
			},
		},
		/**
		 * Used for inheritance and type checking.
		 */
		type: proxyOf(),
	});
}
