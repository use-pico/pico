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
			});
		},

		token(token) {
			return builder({
				...state,
				tokens: [
					...state.tokens,
					token,
				],
			});
		},

		slots(slots) {
			return builder({
				...state,
				slot: [
					...state.slot,
					...slots,
				],
			});
		},

		slot(slot) {
			return builder({
				...state,
				slot: [
					...state.slot,
					slot,
				],
			});
		},

		variants(variants) {
			return builder({
				...state,
				variant: mergeVariants(state.variant, variants),
			});
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
			const { use, ...contract } = state;

			return {
				...contract,
				"~use": use,
				/**
				 * Definition - not yet
				 */
				"~definition": undefined,
			} satisfies Contract.Type<TToken, TSlot, TVariant, TUse>;
		},

		def() {
			return definition(this.build(), state.use);
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
export function contract(): Omit<
	ContractBuilder.Builder<readonly [], readonly [], {}, unknown>,
	"build"
>;
export function contract<const TUse extends Contract.Any>(
	use: TUse,
): ContractBuilder.Builder<readonly [], readonly [], {}, TUse>;

export function contract<const TUse extends Contract.Any | unknown = unknown>(
	use?: TUse,
): ContractBuilder.Builder<readonly [], readonly [], {}, TUse> {
	return builder({
		tokens: [],
		slot: [],
		variant: {},
		use,
	});
}
