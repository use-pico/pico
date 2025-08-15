import { merge } from "./merge";
import { tvc } from "./tvc";
import type {
	ClassName,
	Cls,
	ClsSlotFn,
	Contract,
	CreateConfig,
	Definition,
	RuleDefinition,
	SlotContract,
	TokenContract,
	TokenDefinitionRequired,
	VariantContract,
	VariantValueMapping,
	What,
	WhatUtil,
} from "./types";
import { what } from "./what";

export function cls<
	const TTokenContract extends TokenContract,
	const TSlotContract extends SlotContract,
	const TVariantContract extends VariantContract,
	const TContract extends Contract<
		TTokenContract,
		TSlotContract,
		TVariantContract,
		any
	>,
>(
	contract: TContract,
	definitionFn: (props: WhatUtil<TContract>) => Definition<TContract>,
): Cls<TContract> {
	const whatUtil = what<TContract>();
	const definition = definitionFn(whatUtil);

	// Set the definition on the contract for inheritance
	contract["~definition"] = definition;

	// Build inheritance chain (base -> child order)
	const layers: {
		contract: Contract<TokenContract, SlotContract, VariantContract>;
		definition: Definition<
			Contract<TokenContract, SlotContract, VariantContract>
		>;
	}[] = [];
	let current:
		| Contract<TokenContract, SlotContract, VariantContract>
		| undefined = contract;
	let currentDef:
		| Definition<Contract<TokenContract, SlotContract, VariantContract>>
		| undefined = definition;

	while (current && currentDef) {
		layers.unshift({
			contract: current,
			definition: currentDef,
		});
		current = current["~use"] as
			| Contract<TokenContract, SlotContract, VariantContract>
			| undefined;
		currentDef = current?.["~definition"] as
			| Definition<Contract<TokenContract, SlotContract, VariantContract>>
			| undefined;
	}

	// Collect all slots
	const allSlots = new Set<string>();
	for (const { contract: c } of layers) {
		for (const slot of c.slot) {
			allSlots.add(slot);
		}
	}

	// Merge defaults and rules from ALL layers in inheritance order
	const defaultVariant = {} as VariantValueMapping<TContract>;
	const rules: RuleDefinition<
		Contract<TokenContract, SlotContract, VariantContract>
	>[] = [];

	// Process layers in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		// Merge defaults (child overrides base)
		Object.assign(defaultVariant, d.defaults);
		// Collect rules (all rules from all layers)
		rules.push(...d.rules);
	}

	// Build token index with proper inheritance order
	const tokens: TokenDefinitionRequired<
		Contract<TokenContract, SlotContract, VariantContract>
	> = {};

	// Apply token definitions in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		for (const [k, v] of Object.entries(d.token)) {
			tokens[k] = v;
		}
	}

	// Helper function to resolve a single What<T> object recursively
	const resolveWhat = (
		what: What<Contract<TokenContract, SlotContract, VariantContract>>,
		tokenTable: TokenDefinitionRequired<
			Contract<TokenContract, SlotContract, VariantContract>
		>,
		resolvedTokens: Set<string> = new Set(),
	): ClassName[] => {
		const result: ClassName[] = [];

		// Handle WhatClass (has 'class' property)
		if ("class" in what && what.class) {
			result.push(what.class);
		}

		// Handle WhatToken (has 'token' property) - recursive resolution
		if ("token" in what && what.token) {
			for (const tokenKey of what.token) {
				// Check for circular dependencies
				if (resolvedTokens.has(tokenKey)) {
					throw new Error(
						`Circular dependency detected in token references: ${Array.from(
							resolvedTokens,
						).join(" -> ")} -> ${tokenKey}`,
					);
				}

				if (!tokenTable[tokenKey]) {
					continue;
				}

				// Add to resolved set to prevent cycles
				resolvedTokens.add(tokenKey);

				// Recursively resolve the token definition
				const resolved = resolveWhat(
					tokenTable[tokenKey],
					tokenTable,
					resolvedTokens,
				);
				result.push(...resolved);

				// Remove from resolved set for other branches
				resolvedTokens.delete(tokenKey);
			}
		}

		return result;
	};

	// TODO May be simplified as it's only calling internal function
	const applyWhat = (
		acc: ClassName[],
		what:
			| What<Contract<TokenContract, SlotContract, VariantContract>>
			| undefined,
		tokenTable: TokenDefinitionRequired<
			Contract<TokenContract, SlotContract, VariantContract>
		>,
	): ClassName[] => {
		if (!what) {
			return acc;
		}

		acc.push(...resolveWhat(what, tokenTable));

		return acc;
	};

	const matches = (
		variant: VariantValueMapping<TContract>,
		ruleMatch?: Partial<VariantValueMapping<TContract>>,
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
		create(userConfigFn, internalConfigFn) {
			const config = merge(
				userConfigFn,
				internalConfigFn,
			)() as CreateConfig<TContract>;

			const effectiveVariant = {
				...defaultVariant,
				...(config.variant ?? {}),
			};

			// Apply token overrides
			const tokenTable = {
				...tokens,
			};

			for (const [key, values] of Object.entries(config.token ?? {})) {
				tokenTable[key] = values as What<
					Contract<TokenContract, SlotContract, VariantContract>
				>;
			}

			const cache = {} as Record<
				TSlotContract[number],
				ClsSlotFn<TContract>
			>;
			const resultCache = new Map<string, string>();

			const computeKey = (
				slot: string,
				call?: (
					props: WhatUtil<TContract>,
				) => Partial<CreateConfig<TContract>>,
			): string => {
				if (!call) {
					return `${slot}|__no_config__`;
				}

				try {
					return `${slot}|${JSON.stringify(call(whatUtil))}`;
				} catch {
					return `${slot}|__non_serializable__`;
				}
			};

			const handler: ProxyHandler<
				Record<TSlotContract[number], ClsSlotFn<TContract>>
			> = {
				get(_, slotName: TSlotContract[number]) {
					if (slotName in cache) {
						return cache[slotName];
					}

					const slotFn: ClsSlotFn<TContract> = (call) => {
						const key = computeKey(slotName, call);
						const cached = resultCache.get(key);
						if (cached !== undefined) {
							return cached;
						}

						const local = call?.(whatUtil);
						const localConfig: CreateConfig<TContract> | undefined =
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
							...(localConfig?.variant ?? {}),
						};
						const localTokens = {
							...tokenTable,
						};

						for (const [key, values] of Object.entries(
							localConfig?.token ?? {},
						)) {
							localTokens[key] = values as What<
								Contract<
									TokenContract,
									SlotContract,
									VariantContract
								>
							>;
						}

						let acc: ClassName[] = [];

						// Apply rules
						for (const rule of rules) {
							if (!matches(localEffective, rule.match)) {
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
							acc = applyWhat(acc, what, localTokens);
						}

						// Apply slot configurations (append to rules)
						if (
							localConfig?.slot?.[
								slotName as keyof typeof localConfig.slot
							]
						) {
							acc = applyWhat(
								acc,
								localConfig.slot[
									slotName as keyof typeof localConfig.slot
								],
								localTokens,
							);
						}

						if (
							config.slot?.[slotName as keyof typeof config.slot]
						) {
							acc = applyWhat(
								acc,
								config.slot[
									slotName as keyof typeof config.slot
								],
								localTokens,
							);
						}

						// Apply overrides (clear and replace)
						if (
							localConfig?.override?.[
								slotName as keyof typeof localConfig.override
							]
						) {
							acc = [];
							acc = applyWhat(
								acc,
								localConfig.override[
									slotName as keyof typeof localConfig.override
								],
								localTokens,
							);
						}

						if (
							config.override?.[
								slotName as keyof typeof config.override
							]
						) {
							acc = [];
							acc = applyWhat(
								acc,
								config.override[
									slotName as keyof typeof config.override
								],
								localTokens,
							);
						}

						const out = tvc(acc);
						resultCache.set(key, out);
						return out;
					};

					cache[slotName] = slotFn;
					return cache[slotName];
				},
				ownKeys() {
					return Array.from(allSlots);
				},
				getOwnPropertyDescriptor() {
					return {
						enumerable: true,
						configurable: true,
					};
				},
			};

			return new Proxy(
				{} as Record<TSlotContract[number], ClsSlotFn<TContract>>,
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
			) as unknown as TTokenContract & TContract["tokens"];

			const mergedContract = {
				...childContract,
				tokens: mergedTokens,
			};
			return cls(mergedContract as any, childDefinitionFn as any);
		},
		use<Sub extends Contract<any, any, any>>(
			sub: Cls<Sub>,
		): Cls<TContract> {
			return sub as unknown as Cls<TContract>;
		},
		cls(userConfigFn, internalConfigFn): (props: any) => any {
			return merge(userConfigFn, internalConfigFn);
		},
		contract,
		definition,
	};
}
