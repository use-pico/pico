import { createContext } from "react";
import type { Contract } from "../types/Contract";
import type { Variant } from "../types/Variant";

/**
 * React context for "user-land" tweaks.
 *
 * Purpose:
 * - Components using `useCls` automatically read from the global `TokenContext`.
 * - `TweakContext` is the second layer consulted by `useCls` for overrides.
 * - Pure user-land tweaks take precedence over all other sources.
 *
 * Use this to scope tweak overrides to a subtree. Values are merged by `useCls`
 * after `TokenContext` and before internal defaults, with direct user tweaks
 * winning on conflicts.
 *
 * @returns React context carrying tweak values for any contract.
 *
 * @example
 * ```tsx
 * <TweakContext value={{ size: ["lg"], intent: ["primary"] }}>
 *   <Child />
 * </TweakContext>
 *
 * // Inside a descendant component
 * const tweak = useTweakContext();
 * ```
 */
export const VariantContext = createContext<Variant.Optional<Contract.Any>>({});
