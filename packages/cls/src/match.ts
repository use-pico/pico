import type { Contract, RuleDefinition, SlotMapping } from "./types";

/**
 * match(predicate, slot, override?) — typed rule builder
 *
 * Build `rule` steps with full type-safety against your contract's variants and slots.
 * Intended for use inside the `rule` array of `cls`, `variant`, or instance helpers.
 *
 * Parameters
 * - predicate: Partial variant predicate with boolean variants typed as boolean. Use `undefined` for base rule.
 * - slot: Mapping of slot names to { class | token } (e.g., via `classes([...])`)
 * - override: Optional; when true, resets accumulated classes for the affected slots at that step
 *
 * Notes
 * - Inside a rule step, class values are applied before token values
 * - Across the whole resolution: base rules → matched rules → create().slot → create().override
 * - Types are inferred from the surrounding definition via the parameter types (predicate/slot)
 *
 * Examples
 * ```ts
 * import { classes, match, variant } from "@use-pico/cls";
 *
 * const Alert = variant({
 *   slots: ["base"] as const,
 *   variants: { kind: ["info", "success"], clickable: ["bool"] } as const,
 *   rule: [
 *     match(undefined, { base: classes(["p-2", "rounded"]) }), // base rule
 *     match({ kind: "success" }, { base: classes(["bg-green-50"]) }), // conditional
 *     match({ clickable: true }, { base: classes(["hover:shadow-sm"]) }),
 *   ],
 *   defaults: { kind: "info", clickable: false },
 * });
 * ```
 */
// Overload A: Full rule object (best IDE inference from parent context)
export function match<TContract extends Contract<any, any, any>>(
	rule: RuleDefinition<TContract>,
): RuleDefinition<TContract>;
// Overload B: 3-params form (predicate, slot, override)
export function match<TContract extends Contract<any, any, any>>(
	predicate: RuleDefinition<TContract>["match"] | undefined,
	slot: SlotMapping<TContract>,
	override?: boolean,
): RuleDefinition<TContract>;
export function match<TContract extends Contract<any, any, any>>(
	a:
		| RuleDefinition<TContract>
		| (RuleDefinition<TContract>["match"] | undefined),
	b?: SlotMapping<TContract>,
	c?: boolean,
): RuleDefinition<TContract> {
	if (b === undefined && typeof a === "object" && a !== null) {
		return a as RuleDefinition<TContract>;
	}
	return {
		match: (a as RuleDefinition<TContract>["match"]) ?? undefined,
		slot: b as SlotMapping<TContract>,
		override: c ?? false,
	} as RuleDefinition<TContract>;
}
