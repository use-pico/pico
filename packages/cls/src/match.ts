import type { Contract, RuleDefinition, SlotMapping } from "./types";

export type MatchFn<TContract extends Contract<any, any, any>> = (
	match: RuleDefinition<TContract>["match"] | undefined,
	slot: SlotMapping<TContract>,
	override?: boolean,
) => RuleDefinition<TContract>;

export type MatchSlotFn<TContract extends Contract<any, any, any>> = (
	slot: SlotMapping<TContract>,
	override?: boolean,
) => RuleDefinition<TContract>;

export function match<TContract extends Contract<any, any, any>>(
	match: RuleDefinition<TContract>["match"] | undefined,
	slot: SlotMapping<TContract>,
	override: boolean = false,
): RuleDefinition<TContract> {
	return {
		match,
		slot,
		override,
	} as RuleDefinition<TContract>;
}
