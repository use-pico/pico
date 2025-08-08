import { cls } from "./cls";
import type { Cls, Contract, SlotContract, SlotMapping } from "./types";

/**
 * Props for the simple-component helper.
 *
 * - slots: contract definition listing the component's slots
 * - slot: a single base rule mapping each slot to its static classes
 */
export type ComponentProps<TSlots extends SlotContract> = {
	slots: TSlots;
	slot: SlotMapping<Contract<{}, TSlots, {}>>;
};

/**
 * component(props)
 *
 * Convenience helper for simple, static-slot components (no tokens, no variants).
 * It wraps `cls(contract, definition)` under the hood with an empty token/variant
 * contract and a single base rule for your slots.
 *
 * Type-safety
 * - `props.slots` defines the contract, driving autocomplete for valid slot keys
 * - `props.slot` is type-checked against that contract
 *
 * Behavior
 * - Returns a regular `Cls`, so you can call `.create(userConfig?, internalConfig?)`
 * - Since there are no tokens/variants, only `slot` and `override` in create-config
 *   make sense at call sites
 * - Classes are still resolved lazily via Proxy, one slot at a time
 *
 * Example
 * ```ts
 * import { component } from "@use-pico/cls";
 *
 * export const PreviewCls = component({
 *   slots: ["base", "container", "title", "links", "actions", "extra"] as const,
 *   slot: {
 *     base: {
 *       class: [
 *         "pico--preview",
 *         "flex",
 *         "flex-col",
 *         "gap-2",
 *         "bg-(--color-bg)",
 *         "p-2",
 *         "rounded-md",
 *         "border",
 *         "border-(--color-border)",
 *       ],
 *     },
 *     container: { class: ["flex", "flex-row", "items-center", "justify-between", "gap-1"] },
 *     title: { class: ["flex", "flex-row", "items-center", "gap-4"] },
 *     links: { class: ["flex", "flex-row", "items-center", "gap-4", "justify-end"] },
 *     actions: { class: ["flex", "flex-row", "items-center", "gap-4"] },
 *     extra: { class: ["flex", "flex-row", "gap-4", "justify-end"] },
 *   },
 * });
 *
 * const s = PreviewCls.create();
 * // s.base, s.container, s.title, s.links, s.actions, s.extra
 * ```
 */
export function component<const TSlots extends SlotContract>({
	slots,
	slot,
}: ComponentProps<TSlots>): Cls<Contract<{}, TSlots, {}>> {
	return cls(
		{
			tokens: {},
			slot: slots,
			variant: {},
		},
		{
			token: {},
			rule: [
				{
					slot,
				},
			],
			defaults: {},
		},
	);
}
