import type { ClassName } from "./types/ClassName";
import type { Cls } from "./types/Cls";
import type { Contract } from "./types/Contract";
import type { Definition } from "./types/Definition";
import type { Rule } from "./types/Rule";
import type { Slot as CoolSlot } from "./types/Slot";
import type { Token } from "./types/Token";
import type { Tweak } from "./types/Tweak";
import type { Variant } from "./types/Variant";
import type { What } from "./types/What";
import { def } from "./utils/definition/def";
import { override } from "./utils/definition/override";
import { merge } from "./utils/merge";
import { tvc } from "./utils/tvc";
import { what } from "./utils/what";
import { withVariants } from "./utils/withVariants";

export function cls<
	const TToken extends Token.Type,
	const TSlot extends CoolSlot.Type,
	const TVariant extends Variant.Type,
	const TContract extends Contract.Type<TToken, TSlot, TVariant, any>,
>(
	contract: TContract,
	definitionFn: Definition.Factory.Fn<TContract>,
): Cls.Type<TContract> {
	const whatUtil = what<TContract>();
	const defUtil = def<TContract>();

	const utils = {
		what: whatUtil,
		def: defUtil,
	} as const;

	const definition = definitionFn({
		...utils,
		override: override(),
	});

	// Set the definition on the contract for inheritance
	contract["~definition"] = definition;

	// Build inheritance chain (base -> child order)
	const layers: {
		contract: Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>;
		definition: Definition.Type<
			Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>
		>;
	}[] = [];
	let current:
		| Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>
		| undefined = contract;
	let currentDef:
		| Definition.Type<
				Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>
		  >
		| undefined = definition;

	while (current && currentDef) {
		layers.unshift({
			contract: current,
			definition: currentDef,
		});
		current = current["~use"] as
			| Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>
			| undefined;
		currentDef = current?.["~definition"] as
			| Definition.Type<
					Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>
			  >
			| undefined;
	}

	const slotSet = new Set<string>();
	for (const { contract: c } of layers) {
		for (const slot of c.slot) {
			slotSet.add(slot);
		}
	}

	// Merge defaults and rules from ALL layers in inheritance order
	const defaultVariant = {} as Variant.VariantOf<TContract>;
	const rules: Rule.Type<
		Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>
	>[] = [];

	// Process layers in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		// Merge defaults (child overrides base)
		Object.assign(defaultVariant, d.defaults);
		// Collect rules (all rules from all layers)
		rules.push(...d.rules);
	}

	// Build token index with proper inheritance order
	const tokens: Record<
		string,
		What.Any<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>
	> = {};

	// Apply token definitions in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		for (const [k, v] of Object.entries(d.token)) {
			tokens[k] = v;
		}
	}

	// Helper function to resolve a single What<T> object recursively
	const resolveWhat = (
		what: What.Any<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>,
		tokenTable: Record<
			string,
			What.Any<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>
		>,
		tokenSet: Set<string> = new Set(),
	): ClassName[] => {
		const result: ClassName[] = [];

		// Handle WhatToken (has 'token' property) - recursive resolution FIRST
		if ("token" in what && what.token) {
			for (const tokenKey of what.token) {
				// Check for circular dependencies
				if (tokenSet.has(tokenKey)) {
					throw new Error(
						`Circular dependency detected in token references: ${Array.from(
							tokenSet,
						).join(" -> ")} -> ${tokenKey}`,
					);
				}

				if (!tokenTable[tokenKey]) {
					continue;
				}

				// Add to resolved set to prevent cycles
				tokenSet.add(tokenKey);

				// Recursively resolve the token definition
				const resolved = resolveWhat(
					tokenTable[tokenKey],
					tokenTable,
					tokenSet,
				);
				result.push(...resolved);

				// Remove from resolved set for other branches
				tokenSet.delete(tokenKey);
			}
		}

		// Handle WhatClass (has 'class' property) AFTER tokens - classes override tokens
		if ("class" in what && what.class) {
			result.push(what.class);
		}

		return result;
	};

	const matches = (
		variant: Variant.Required<TContract>,
		ruleMatch?: Variant.Optional<TContract>,
	): boolean => {
		if (!ruleMatch) {
			return true;
		}

		for (const [k, v] of Object.entries(ruleMatch)) {
			if (variant[k] !== v) {
				return false;
			}
		}

		return true;
	};

	// Public API
	return {
		create(userTweakFn, internalTweakFn) {
			const effectiveVariant = withVariants(
				{
					contract,
					definition,
				},
				userTweakFn,
				internalTweakFn,
			);

			// Get config for token overrides
			const config = merge(
				userTweakFn,
				internalTweakFn,
			)() as Tweak.Type<TContract>;

			// Apply token overrides
			const tokenTable = {
				...tokens,
			};

			for (const [key, values] of Object.entries(config.token ?? {})) {
				tokenTable[key] = values as What.Any<
					Contract.Type<TToken, CoolSlot.Type, Variant.Type>
				>;
			}

			const cache = {} as Record<TSlot[number], CoolSlot.Fn<TContract>>;
			const resultCache = new Map<string, string>();

			const computeKey = (
				slot: string,
				call?: Tweak.Fn<TContract>,
			): string => {
				if (!call) {
					return `${slot}|__no_config__`;
				}

				try {
					return `${slot}|${JSON.stringify(
						call({
							...utils,
							override: null,
						}),
					)}`;
				} catch {
					return `${slot}|__non_serializable__`;
				}
			};

			const handler: ProxyHandler<
				Record<TSlot[number], CoolSlot.Fn<TContract>>
			> = {
				get(_, slotName: TSlot[number]) {
					if (slotName in cache) {
						return cache[slotName];
					}

					const slotFn: CoolSlot.Fn<TContract> = (call) => {
						const key = computeKey(slotName, call);
						const cached = resultCache.get(key);
						if (cached !== undefined) {
							return cached;
						}

						const local = call?.({
							...utils,
							override: null,
						});
						const localConfig: Tweak.Type<TContract> | undefined =
							local
								? {
										variant: local.variant,
										slot: local.slot,
										override: local.override,
										token: local.token,
									}
								: undefined;

						const localEffective = {
							...effectiveVariant,
							...Object.fromEntries(
								Object.entries(
									localConfig?.variant ?? {},
								).filter(([, value]) => value !== undefined),
							),
						} as const;

						const localTokens = {
							...tokenTable,
						};

						for (const [key, values] of Object.entries(
							localConfig?.token ?? {},
						)) {
							localTokens[key] = values as What.Any<
								Contract.Type<
									TToken,
									CoolSlot.Type,
									Variant.Type
								>
							>;
						}

						let acc: ClassName[] = [];

						// Apply rules
						for (const rule of rules) {
							if (
								!matches(
									localEffective as Variant.Required<TContract>,
									rule.match as Variant.Optional<TContract>,
								)
							) {
								continue;
							}
							const slotMap = rule.slot ?? {};
							const what = slotMap[slotName];
							if (!what) {
								continue;
							}
							if (rule.override === true) {
								acc = [];
							}
							acc.push(...resolveWhat(what, localTokens));
						}

						// Apply slot configurations (append to rules)
						if (
							localConfig?.slot?.[
								slotName as keyof typeof localConfig.slot
							]
						) {
							const what =
								localConfig.slot[
									slotName as keyof typeof localConfig.slot
								];
							if (what) {
								acc.push(...resolveWhat(what, localTokens));
							}
						}

						if (
							config.slot?.[slotName as keyof typeof config.slot]
						) {
							const what =
								config.slot[
									slotName as keyof typeof config.slot
								];
							if (what) {
								acc.push(...resolveWhat(what, localTokens));
							}
						}

						// Apply overrides (clear and replace)
						if (
							localConfig?.override?.[
								slotName as keyof typeof localConfig.override
							]
						) {
							acc = [];
							const what =
								localConfig.override[
									slotName as keyof typeof localConfig.override
								];
							if (what) {
								acc.push(...resolveWhat(what, localTokens));
							}
						}

						if (
							config.override?.[
								slotName as keyof typeof config.override
							]
						) {
							acc = [];
							const what =
								config.override[
									slotName as keyof typeof config.override
								];
							if (what) {
								acc.push(...resolveWhat(what, localTokens));
							}
						}

						const out = tvc(acc);
						resultCache.set(key, out);
						return out;
					};

					cache[slotName] = slotFn;
					return cache[slotName];
				},
				ownKeys() {
					return Array.from(slotSet);
				},
				getOwnPropertyDescriptor() {
					return {
						enumerable: true,
						configurable: true,
					};
				},
			};

			return new Proxy(
				{} as Record<TSlot[number], CoolSlot.Fn<TContract>>,
				handler,
			);
		},
		extend(childContract, childDefinitionFn) {
			childContract["~use"] = contract;
			// Don't set ~definition here - it will be set when cls() is called

			const parentTokens = contract.tokens;
			const childTokens = childContract.tokens;
			const mergedTokens = Array.from(
				new Set([
					...parentTokens,
					...childTokens,
				]),
			) as unknown as TToken & TContract["tokens"];

			const mergedContract = {
				...childContract,
				tokens: mergedTokens,
			};
			return cls(mergedContract as any, childDefinitionFn as any);
		},
		use<Sub extends Contract.Any>(sub: Cls.Type<Sub>) {
			return sub as unknown as Cls.Type<TContract>;
		},
		tweak(userTweakFn, internalTweakFn) {
			return merge(userTweakFn, internalTweakFn) as Tweak.Fn<TContract>;
		},
		contract,
		definition,
	};
}
