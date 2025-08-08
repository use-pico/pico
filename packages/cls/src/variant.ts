import { cls } from "./cls";
import type {
	Cls,
	Contract,
	Definition,
	SlotContract,
	VariantContract,
} from "./types";

/**
 * Props for the variant-enabled helper.
 *
 * - slots: slot contract (named parts of the component)
 * - variants: variant contract (supported variant keys and values; "bool" → boolean)
 * - rule: full rule list (including base rule if needed) with match/override support
 * - defaults: required default values for all variants
 */
export interface VariantProps<
	TSlots extends SlotContract,
	TVariants extends VariantContract,
> {
	/**
	 * Slot contract: list of named component parts whose classes will be produced by create().
	 *
	 * Drives autocomplete for valid slot keys across `rule`, `create().slot`, and `create().override`.
	 * Provide a readonly tuple for best type inference.
	 */
	slots: TSlots;
	/**
	 * Variant contract: supported variant keys and their allowed values.
	 *
	 * Use the string literal "bool" to get a boolean variant type in TS.
	 * These keys drive both `defaults` and `rule[].match` type-safety.
	 */
	variants: TVariants;
	/**
	 * Full rule list applied in order (top to bottom).
	 *
	 * Include your base rule here (initial classes per slot). Additional rules
	 * can add classes conditionally via `match`. When `override: true` is set,
	 * accumulated classes for affected slots are reset for that step.
	 */
	rule: Definition<Contract<{}, TSlots, TVariants>>["rule"];
	/**
	 * Default values for every variant key.
	 *
	 * Used when evaluating `match` and generating classes. Can be overridden at
	 * call sites via `create({ variant: { ... } })` (user) or internal config.
	 */
	defaults: Definition<Contract<{}, TSlots, TVariants>>["defaults"];
}

/**
 * variant(props)
 *
 * Convenience helper for components that need static slots plus variants
 * and full rule matching (match/override). It wraps `cls(contract, definition)`
 * with an empty token contract, your slot + variant contract, and your full
 * `rule` array (including any base rule).
 *
 * Type-safety
 * - `props.slots` and `props.variants` drive autocomplete for slot/variant keys
 * - `props.rule` uses the same rule type as `cls` (including match/override)
 * - `props.defaults` must provide defaults for all variants
 *
 * Behavior
 * - Returns a regular `Cls`, so you can call `.create(userConfig?, internalConfig?)`
 * - No tokens are defined here; use `cls` directly if you need tokens
 *
 * Example
 * ```ts
 * import { variant } from "@use-pico/cls";
 *
 * export const Alert = variant({
 *   slots: ["base", "title", "message"] as const,
 *   variants: { variant: ["info", "success"], clickable: ["bool"] } as const,
 *   rule: [
 *     {
 *       // base rule
 *       slot: {
 *         base: { class: ["p-2", "rounded"] },
 *         title: { class: ["font-semibold"] },
 *         message: { class: ["opacity-85"] },
 *       },
 *     },
 *     {
 *       match: { variant: "success", clickable: true },
 *       slot: { base: { class: ["hover:bg-green-50"] } },
 *     },
 *   ],
 *   defaults: { variant: "info", clickable: false },
 * });
 *
 * const s = Alert.create({ variant: { variant: "success" } });
 * // s.base includes hover:bg-green-50 only when clickable is true
 * ```
 */
export function variant<
	const TSlots extends SlotContract,
	const TVariants extends VariantContract,
>({
	slots,
	variants,
	rule = [],
	defaults,
}: VariantProps<TSlots, TVariants>): Cls<Contract<{}, TSlots, TVariants>> {
	return cls(
		{
			tokens: {},
			slot: slots,
			variant: variants,
		},
		{
			token: {},
			rule,
			defaults,
		},
	);
}
