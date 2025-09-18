import type { Contract } from "../types/Contract";
import type { ContractBuilder } from "../types/ContractBuilder";
import type { Slot } from "../types/Slot";
import type { Token } from "../types/Token";
import type { Variant } from "../types/Variant";
import { mergeVariants } from "../utils/mergeVariants";
import { definition } from "./definition";

/**
 * Creates a contract builder with the given state
 */
function builder<
	const TToken extends Token.Type,
	const TSlot extends Slot.Type,
	const TVariant extends Variant.Type,
	const TUse extends Contract.Any | unknown = unknown,
>(
	state: ContractBuilder.State<TToken, TSlot, TVariant, TUse>,
): ContractBuilder.Builder<TToken, TSlot, TVariant, TUse> {
	return {
		tokens(tokens) {
			return builder({
				...state,
				tokens: [
					...state.tokens,
					...tokens,
				],
			} as const);
		},

		token(token) {
			return builder({
				...state,
				tokens: [
					...state.tokens,
					token,
				],
			} as const);
		},

		slots(slots) {
			return builder({
				...state,
				slot: [
					...state.slot,
					...slots,
				],
			} as const);
		},

		slot(slot) {
			return builder({
				...state,
				slot: [
					...state.slot,
					slot,
				],
			} as const);
		},

		variants(variants) {
			return builder({
				...state,
				variant: mergeVariants(state.variant, variants),
			} as const);
		},

		variant(name, values) {
			return builder({
				...state,
				variant: mergeVariants(state.variant, {
					[name]: values,
				} as Record<typeof name, typeof values>),
			});
		},

		build() {
			return state;
		},

		def() {
			return definition(this.build());
		},
	};
}

/**
 * Creates a new contract builder instance.
 * Provides a fluent API for building contracts with proper type accumulation.
 *
 * @example
 * ```typescript
 * const myContract = contract()
 *   .tokens(["color.primary", "color.secondary"])
 *   .slots(["root", "label"])
 *   .variant("size", ["sm", "md", "lg"])
 *   .build();
 * ```
 */
export function contract(): ContractBuilder.Builder<
	Token.Type,
	Slot.Type,
	Variant.Type,
	unknown
>;
export function contract<const TUse extends Contract.Any>(
	use: TUse,
): ContractBuilder.Builder<Token.Type, Slot.Type, Variant.Type, TUse>;

export function contract<const TUse extends Contract.Any | unknown = unknown>(
	use?: TUse,
): ContractBuilder.Builder<Token.Type, Slot.Type, Variant.Type, TUse> {
	return builder({
		tokens: [] as Token.Type,
		slot: [] as Slot.Type,
		variant: {} as Variant.Type,
		use,
	});
}
