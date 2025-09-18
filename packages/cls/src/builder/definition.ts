import { cls } from "../cls";
import type { Contract } from "../types/Contract";
import type { DefinitionBuilder } from "../types/DefinitionBuilder";
import type { Slot } from "../types/Slot";
import type { Token } from "../types/Token";
import type { Variant } from "../types/Variant";

/**
 * Creates a definition builder with the given state
 */
function builder<
	const TContract extends Contract.Any,
	const TState extends DefinitionBuilder.CompletionState = {},
	const TUse extends Contract.Any | unknown = unknown,
>(
	state: DefinitionBuilder.State<TContract, TUse>,
): DefinitionBuilder.Builder<TContract, TState> {
	return {
		token(token: Token.Required<TContract>) {
			return builder<
				TContract,
				TState & {
					hasToken: true;
				},
				TUse
			>({
				...state,
				token,
			});
		},

		rule(
			match: Variant.Optional<TContract>,
			slot: Slot.Optional<TContract>,
			override = false,
		) {
			return builder<TContract, TState, TUse>({
				...state,
				rules: [
					...state.rules,
					{
						match,
						slot,
						override,
					},
				],
			});
		},

		root(slot: Slot.Optional<TContract>, override = false) {
			return builder<TContract, TState, TUse>({
				...state,
				rules: [
					...state.rules,
					{
						match: undefined,
						slot,
						override,
					},
				],
			});
		},

		defaults(defaults: Variant.VariantOf<TContract>) {
			return builder<
				TContract,
				TState & {
					hasDefaults: true;
				},
				TUse
			>({
				...state,
				defaults,
			});
		},

		cls() {
			return cls(state.contract, () => ({
				token: state.token || ({} as any),
				rules: state.rules,
				defaults: state.defaults || ({} as any),
			}));
		},
	} as any as DefinitionBuilder.Builder<TContract, TState>;
}

export const definition = <
	const TContract extends Contract.Any,
	const TUse extends Contract.Any | unknown = unknown,
>(
	contract: TContract,
	use?: TUse,
): DefinitionBuilder.Builder<TContract, {}> => {
	return builder<TContract, {}, TUse>({
		contract,
		rules: [],
		use,
	});
};
