import { type ClassNameValue, twMerge } from "tailwind-merge";

/**
 * Recursive proxy; used to hack the type system.
 */
const proxyOf: any = new Proxy(() => proxyOf, {
	get: () => proxyOf,
});

/**
 * Just forward class name type to prevent direct dependency on providing package.
 */
type Class = ClassNameValue;

type SlotDef<TSlotKeys extends string> = Record<TSlotKeys, Class>;

type VariantDef<TVariantKeys extends string> = Record<
	TVariantKeys,
	Record<string, Class>
>;

type ValuesDef<TVariant> = {
	[K in keyof TVariant]?: keyof TVariant[K] extends "true" | "false"
		? boolean
		: keyof TVariant[K];
};

/**
 * Compute slot from all slots (including uses - extensions).
 */
type SlotEx<
	TSlot extends SlotDef<any>,
	TUse extends
		| (() => {
				type: {
					slot?: SlotDef<any>;
				};
		  })
		| unknown = unknown,
> = TUse extends () => {
	type: {
		slot?: infer S;
	};
}
	? TSlot & S
	: TSlot;

/**
 * Compute variant from all variants (including uses - extensions).
 */
export type VariantEx<
	TVariant extends VariantDef<any>,
	TUse extends
		| (() => {
				type: {
					variant?: VariantDef<any>;
				};
		  })
		| unknown = unknown,
> = TUse extends () => {
	type: {
		variant?: infer V;
	};
}
	? TVariant & V
	: TVariant;

/**
 * Compute default values from all variants (including uses - extensions).
 *
 * Current defaults are required, extensions are marked as optional.
 */
export type DefaultsEx<
	TVariant extends VariantDef<any>,
	TUse extends
		| (() => {
				type: {
					variant?: VariantDef<any>;
				};
		  })
		| unknown = unknown,
> = Required<ValuesDef<TVariant>> &
	(TUse extends () => {
		type: {
			variant?: infer V;
		};
	}
		? ValuesDef<V>
		: {});

export namespace cls {
	export type Cls = Class;

	/**
	 * Types for the "runtime" part of variants.
	 *
	 * Those types should not be used in "public".
	 */
	export namespace Use {
		/**
		 * CSS property.
		 *
		 * Computes keys based on all slots (including extensions).
		 */
		export interface CssEx<TSlot extends SlotDef<string>, TUse = unknown> {
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
			TSlot extends SlotDef<any>,
			TVariant extends VariantDef<any>,
			TUse extends Variants<any, any, any> | unknown = unknown,
		> = (
			// TODO Change for an input object {variant, css, ...}
			variant?: ValuesDef<VariantEx<TVariant, TUse>> & CssEx<TSlot, TUse>,
		) => {
			/**
			 * Individual slots for a component. Those slots are then
			 * used to compute individual class names.
			 */
			slots: {
				[K in keyof SlotEx<TSlot, TUse>]: (
					values?: ValuesDef<VariantEx<TVariant, TUse>> & {
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
				defaults: ValuesDef<VariantEx<TVariant, TUse>>;
				/**
				 * Combined cumulated defaults & current values provided to `tva()`.
				 */
				values: ValuesDef<VariantEx<TVariant, TUse>>;
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
		TSlot extends SlotDef<any>,
		TVariant extends VariantDef<any>,
		TUse extends Use.Variants<any, any, any> | unknown = unknown,
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
		do: {
			[K in keyof SlotEx<TSlot, TUse>]?: Class;
		};
	}

	/**
	 * Variants configuration.
	 */
	export interface Config<
		TSlot extends SlotDef<any>,
		TVariant extends VariantDef<any>,
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
		defaults: DefaultsEx<TVariant, TUse>;
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
		variant?: ValuesDef<
			VariantEx<ReturnType<TVariants>["type"]["variant"], TVariants>
		>;
		tva?: TVariants;
		css?: {
			[K in keyof SlotEx<
				ReturnType<TVariants>["type"]["slot"],
				TVariants
			>]?: Class;
		};
	} & Omit<P, "variant" | "tva" | "css">;

	export type Extract<TProps extends Props<any>> = Pick<
		TProps,
		"variant" | "tva" | "css"
	>;

	export type Slots<TUse extends Use.Variants<any, any, any>> =
		ReturnType<TUse>["slots"];
}

/**
 * Create variants for a component (or whatever usage you need).
 *
 * This method is an advanced implementation of tailwind-variants with a bit more strict
 * API, but powerful type checking, including inheritance.
 */
export function cls<
	TSlot extends SlotDef<any>,
	TVariant extends VariantDef<any>,
	TUse extends cls.Use.Variants<any, any, any> | unknown = unknown,
>({
	use,
	slot,
	variant,
	match = [],
	defaults,
}: cls.Config<TSlot, TVariant, TUse>): cls.Use.Variants<TSlot, TVariant, TUse> {
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
			{} as ReturnType<cls.Use.Variants<TSlot, TVariant, TUse>>["slots"],
			{
				get: (_, key: string) => {
					return ({ css: $css, ...override } = {} as any) => {
						/**
						 * Output classes,
						 */
						const $classes: Class[] = [];

						/**
						 * Type "use" (extension) for later use.
						 */
						const $use:
							| cls.Use.Variants<any, any, any>
							| undefined = use as cls.Use.Variants<
							any,
							any,
							any
						>;

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
						$classes.push(
							Array.isArray(slot[key])
								? slot[key]
								: [
										slot[key],
									],
						);

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
							) && $classes.push(rule.do?.[key]);
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
				...(use as cls.Use.Variants<any, any, any>)?.()?.config
					.defaults,
				...defaults,
			},
			values: {
				...(use as cls.Use.Variants<any, any, any>)?.()?.config
					.defaults,
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
