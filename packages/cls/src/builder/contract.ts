import type { ContractBuilder } from "../types/ContractBuilder";
import type { Slot } from "../types/Slot";
import type { Token } from "../types/Token";
import type { Variant } from "../types/Variant";
import { mergeVariants } from "../utils/mergeVariants";
import { definition } from "./definition";

/**
 * Creates a contract builder with the given state
 */
function createBuilder<
	const TTokens extends Token.Type = readonly [],
	const TSlots extends Slot.Type = readonly [],
	const TVariants extends Variant.Type = {},
>(
	state: ContractBuilder.State<TTokens, TSlots, TVariants>,
): ContractBuilder.Builder<TTokens, TSlots, TVariants> {
	return {
		tokens(tokens) {
			return createBuilder({
				tokens: [
					...state.tokens,
					...tokens,
				],
				slots: state.slots,
				variants: state.variants,
			});
		},

		token(token) {
			return createBuilder({
				tokens: [
					...state.tokens,
					token,
				],
				slots: state.slots,
				variants: state.variants,
			});
		},

		slots(slots) {
			return createBuilder({
				tokens: state.tokens,
				slots: [
					...state.slots,
					...slots,
				],
				variants: state.variants,
			});
		},

		slot(slot) {
			return createBuilder({
				tokens: state.tokens,
				slots: [
					...state.slots,
					slot,
				],
				variants: state.variants,
			});
		},

		variants(variants) {
			return createBuilder({
				tokens: state.tokens,
				slots: state.slots,
				variants: mergeVariants(state.variants, variants),
			});
		},

		variant(name, values) {
			return createBuilder({
				tokens: state.tokens,
				slots: state.slots,
				variants: mergeVariants(state.variants, {
					[name]: values,
				} as Record<typeof name, typeof values>),
			});
		},

		build() {
			return {
				tokens: state.tokens,
				slot: state.slots,
				variant: state.variants,
			};
		},

		def() {
			return definition({
				tokens: state.tokens,
				slot: state.slots,
				variant: state.variants,
			});
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
export function contract(): ContractBuilder.Builder {
	return createBuilder({
		tokens: [] as const,
		slots: [] as const,
		variants: {} as const,
	});
}
