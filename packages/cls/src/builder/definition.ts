import { cls } from "../cls";
import type { Contract } from "../types/Contract";
import type { DefinitionBuilder } from "../types/DefinitionBuilder";

/**
 * Creates a definition builder with the given state
 */
function builder<const TContract extends Contract.Any>(
	state: DefinitionBuilder.State<TContract>,
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
			const contractTokens = state.contract.tokens || [];
			const contractVariants = state.contract.variant || {};
			const hasTokens = contractTokens.length > 0;
			const hasVariants = Object.keys(contractVariants).length > 0;

			// Validation: ensure required parts are provided when contract has tokens/variants
			if (hasTokens && !state.token) {
				throw new Error(
					"Token definitions are required. Call .token() before .cls()",
				);
			}
			if (hasVariants && !state.defaults) {
				throw new Error(
					"Defaults are required. Call .defaults() before .cls()",
				);
			}

			// Validation: ensure tokens match between contract and definition
			if (state.token) {
				const definedTokens = Object.keys(state.token);
				const missingTokens = contractTokens.filter(
					(token: string) => !definedTokens.includes(token),
				);
				const extraTokens = definedTokens.filter(
					(token: string) => !contractTokens.includes(token),
				);

				if (missingTokens.length > 0) {
					throw new Error(
						`Missing token definitions: ${missingTokens.join(", ")}`,
					);
				}
				if (extraTokens.length > 0) {
					throw new Error(
						`Extra token definitions not in contract: ${extraTokens.join(", ")}`,
					);
				}
			}

			// Validation: ensure defaults match contract variants
			if (state.defaults) {
				const definedDefaults = Object.keys(state.defaults);
				const contractVariantKeys = Object.keys(contractVariants);
				const missingDefaults = contractVariantKeys.filter(
					(variant: string) => !definedDefaults.includes(variant),
				);
				const extraDefaults = definedDefaults.filter(
					(variant: string) => !contractVariantKeys.includes(variant),
				);

				if (missingDefaults.length > 0) {
					throw new Error(
						`Missing default values for variants: ${missingDefaults.join(", ")}`,
					);
				}
				if (extraDefaults.length > 0) {
					throw new Error(
						`Extra default values not in contract variants: ${extraDefaults.join(", ")}`,
					);
				}
			}

			// Create the definition object
			const definition = {
				token: state.token || ({} as any),
				rules: state.rules,
				defaults: state.defaults || ({} as any),
			};

			// Create and return the CLS instance
			return cls(state.contract, () => definition);
		},
	};
}

export const definition = <const TContract extends Contract.Any>(
	contract: TContract,
): DefinitionBuilder.Builder<TContract> => {
	return builder({
		contract,
		rules: [],
	});
};
