import { cls } from "../cls";
import type { Contract } from "../types/Contract";
import type { DefinitionBuilder } from "../types/DefinitionBuilder";

/**
 * Creates a definition builder with the given state
 */
function builder<
	const TContract extends Contract.Any,
	const TUse extends Contract.Any | unknown = unknown,
>(
	state: DefinitionBuilder.State<TContract, TUse>,
): DefinitionBuilder.Builder<TContract> {
	return {
		token(token) {
			return builder({
				...state,
				token,
			});
		},

		rule(match, slot, override = false) {
			return builder({
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

		root(slot, override = false) {
			return builder({
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

		defaults(defaults) {
			return builder({
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
	};
}

export const definition = <
	const TContract extends Contract.Any,
	const TUse extends Contract.Any | unknown = unknown,
>(
	contract: TContract,
	use?: TUse,
): DefinitionBuilder.Builder<TContract> => {
	return builder({
		contract,
		rules: [],
		use,
	});
};
