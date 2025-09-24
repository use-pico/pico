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
			return builder({
				...state,
				token,
			});
		},

		tokens: {
			rule(
				match: Variant.Optional<TContract>,
				token: Token.Optional<TContract>,
				override = false,
			) {
				return builder({
					...state,
					rules: [
						...state.rules,
						{
							match,
							token,
							override,
						},
					],
				});
			},

			switch(
				key: any,
				whenTrue: Token.Optional<TContract>,
				whenFalse: Token.Optional<TContract>,
			) {
				return builder({
					...state,
					rules: [
						...state.rules,
						{
							match: {
								[key]: true,
							} as any,
							token: whenTrue,
							override: false,
						},
						{
							match: {
								[key]: false,
							} as any,
							token: whenFalse,
							override: false,
						},
					],
				});
			},

			match<
				const TKey extends keyof Variant.VariantOf<TContract>,
				const TValue extends Variant.VariantOf<TContract>[TKey],
			>(
				key: TKey,
				value: TValue,
				token: Token.Optional<TContract>,
				override = false,
			) {
				return builder({
					...state,
					rules: [
						...state.rules,
						{
							match: {
								[key]: value,
							} as any,
							token,
							override,
						},
					],
				});
			},
		},

		root(slot: Slot.Optional<TContract>, override = false) {
			return builder({
				...state,
				rules: [
					...state.rules,
					{
						match: undefined,
						slot: {
							_target: "slot",
							...slot,
						} as Slot.Optional<TContract>,
						override,
					},
				],
			});
		},

		rule(
			match: Variant.Optional<TContract>,
			slot: Slot.Optional<TContract>,
			override = false,
		) {
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

		switch(
			key: any,
			whenTrue: Slot.Optional<TContract>,
			whenFalse: Slot.Optional<TContract>,
		) {
			return builder({
				...state,
				rules: [
					...state.rules,
					{
						match: {
							[key]: true,
						} as any,
						slot: whenTrue,
						override: false,
					},
					{
						match: {
							[key]: false,
						} as any,
						slot: whenFalse,
						override: false,
					},
				],
			});
		},

		match<
			const TKey extends keyof Variant.VariantOf<TContract>,
			const TValue extends Variant.VariantOf<TContract>[TKey],
		>(
			key: TKey,
			value: TValue,
			slot: Slot.Optional<TContract>,
			override = false,
		) {
			return builder({
				...state,
				rules: [
					...state.rules,
					{
						match: {
							[key]: value,
						} as any,
						slot,
						override,
					},
				],
			});
		},

		defaults(defaults: Variant.VariantOf<TContract>) {
			return builder({
				...state,
				defaults,
			});
		},

		cls() {
			return cls(state.contract, {
				token: state.token || ({} as any),
				rules: state.rules,
				defaults: state.defaults || ({} as any),
			});
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
