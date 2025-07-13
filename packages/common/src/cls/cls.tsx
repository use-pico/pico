import type {
	ButtonHTMLAttributes,
	FC,
	HTMLAttributes,
	LabelHTMLAttributes,
} from "react";
import { type ClassNameValue, twMerge } from "tailwind-merge";

/**
 * Recursive proxy; used to hack the type system.
 */
const proxyOf: any = new Proxy(() => proxyOf, {
	get: () => proxyOf,
});

export namespace cls {
	export namespace Internal {
		/**
		 * Just forward class name type to prevent direct dependency on providing package.
		 */
		export type ClassName = ClassNameValue;

		export type SlotDef<TSlotKeys extends string> = Record<
			TSlotKeys,
			ClassName
		>;

		export type VariantDef<TVariantKeys extends string> = Record<
			TVariantKeys,
			Record<string, ClassName>
		>;

		export type ValuesDef<TVariant> = {
			[K in keyof TVariant]?: keyof TVariant[K] extends "true" | "false"
				? boolean
				: keyof TVariant[K];
		};

		/**
		 * Compute slot from all slots (including uses - extensions).
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
		 * Compute variant from all variants (including uses - extensions).
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
		 * Compute default values from all variants (including uses - extensions).
		 *
		 * Current defaults are required, extensions are marked as optional.
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

		export type SlotFn<
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = (
			values?: ValuesDef<VariantEx<TVariant, TUse>>,
			cls?: ClassName,
		) => string;

		export type Slots<
			TSlot extends SlotDef<any>,
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = {
			[K in keyof SlotEx<TSlot, TUse>]: SlotFn<TVariant, TUse>;
		};

		export namespace Elements {
			export interface ElementProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> {
				variant?: ValuesDef<VariantEx<TVariant, TUse>>;
				cls?: ClassName;
			}

			export interface DivProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<HTMLAttributes<HTMLDivElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}

			export interface SpanProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<HTMLAttributes<HTMLSpanElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}

			export interface ParagraphProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<HTMLAttributes<HTMLParagraphElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}

			export interface LabelProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}

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

			export interface AnchorProps<
				TVariant extends VariantDef<any>,
				TUse extends ClsFn<any, any, any> | unknown = unknown,
			> extends Omit<HTMLAttributes<HTMLAnchorElement>, "className">,
					ElementProps<TVariant, TUse> {
				//
			}
		}

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

		export type ElementFn<
			TSlot extends SlotDef<any>,
			TVariant extends VariantDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = {
			[K in keyof SlotEx<TSlot, TUse>]: Elements<TVariant, TUse>;
		};

		export interface Config<TVariantEx extends VariantEx<any, any>> {
			/**
			 * Cumulated default values from all variants (including uses - extensions).
			 */
			defaults: ValuesDef<TVariantEx>;
			/**
			 * Combined cumulated defaults & current values provided to `tva()`.
			 */
			values: ValuesDef<TVariantEx>;
		}

		export type Type<
			TSlotEx extends SlotEx<any, TUse>,
			TVariantEx extends VariantEx<any, TUse>,
			TUse extends ClsFn<any, any, any> | unknown,
		> = {
			/**
			 * Extension type for this variant.
			 */
			use?: TUse;
			/**
			 * Cumulated slots from all extensions.
			 */
			slot?: TSlotEx;
			/**
			 * Cumulated variants from all extensions.
			 */
			variant?: TVariantEx;
		};

		export type SlotCls<
			TSlot extends SlotDef<any>,
			TUse extends ClsFn<any, any, any> | unknown = unknown,
		> = {
			[K in keyof SlotEx<TSlot, TUse>]?: ClassName;
		};

		/**
		 * Output of the factory method.
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
		 * Matching rules.
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
	export type Class = Internal.ClassName;

	/**
	 * Variants configuration.
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
		match?: Internal.Match<TSlot, TVariant, TUse>[];
		/**
		 * Default values.
		 *
		 * They're (cleverly) required to prevent surprises when using variants.
		 */
		defaults: Internal.DefaultsEx<TVariant, TUse>;
	}

	/**
	 * When used in components, this is a safe way how to extend component props.
	 *
	 * It omits `variant`, `tva`, and `cls` props from the parent props.
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
	 * Extract `variant`, `tva`, and `cls` types from the given props.
	 */
	export type Extract<TProps extends Props<any>> = Pick<
		TProps,
		"variant" | "tva" | "cls"
	>;

	/**
	 * Drop `cls` types from the given props. Useful, if you extend props
	 * and you want to provide your own `cls` type.
	 */
	export type Clear<TProps extends Props<any>> = Omit<
		TProps,
		"variant" | "tva" | "cls"
	>;

	export type Slots<TCls extends Internal.ClsFn<any, any, any>> =
		ReturnType<TCls>["slots"];
}

/**
 * Create variants for a component (or whatever usage you need).
 *
 * This method is an advanced implementation of tailwind-variants with a bit more strict
 * API, but powerful type checking, including inheritance.
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
	 * Output is a factory method used to call at a component level (or whatever place you want).
	 */
	return (values, cls) => {
		const slots = new Proxy(
			{} as ReturnType<
				cls.Internal.ClsFn<TSlot, TVariant, TUse>
			>["slots"],
			{
				get(_, key: string): cls.Internal.SlotFn<TVariant, TUse> {
					return (override, $cls) => {
						/**
						 * Output classes,
						 */
						const $classes: cls.Internal.ClassName[] = [];

						/**
						 * Type "use" (extension) for later use.
						 */
						const $use:
							| cls.Internal.ClsFn<any, any, any>
							| undefined = use as cls.Internal.ClsFn<
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
							...$use?.()?.["~config"].defaults,
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
						$classes.push(cls?.[key]);
						/**
						 * Push all overriding classes from the class name computation.
						 */
						$classes.push($cls);

						return twMerge($classes);
					};
				},
			},
		);

		return {
			/**
			 * Proxy all calls to the slots to compute class names.
			 *
			 * Because there is a strict type checking, this should be safe to use; if you break types,
			 * this may fail at runtime.
			 */
			slots,
			el: new Proxy({} as cls.Internal.ElementFn<TSlot, TVariant, TUse>, {
				get(_, key: string): cls.Internal.Elements<TVariant, TUse> {
					return {
						Div({ variant, cls, ...props }) {
							return (
								<div
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						Span({ variant, cls, ...props }) {
							return (
								<span
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						Paragraph({ variant, cls, ...props }) {
							return (
								<p
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						Label({ variant, cls, ...props }) {
							return (
								<label
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
						Button({ variant, cls, ...props }) {
							return (
								<button
									className={slots[key]?.(variant, cls)}
									{...props}
								/>
							);
						},
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
			 * This is a configuration used internally
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
			 * Used for inheritance and type checking.
			 */
			"~type": proxyOf(),
		};
	};
}
