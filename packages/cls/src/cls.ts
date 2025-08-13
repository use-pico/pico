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
	VariantContract,
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
	const defaults: Record<string, unknown> = {};
	const rules: RuleDefinition<
		Contract<TokenContract, SlotContract, VariantContract>
	>[] = [];

	// Process layers in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		// Merge defaults (child overrides base)
		Object.assign(defaults, d.defaults ?? {});
		// Collect rules (all rules from all layers)
		rules.push(...(d.rules ?? []));
	}

	// Build token index with proper inheritance order
	const tokens: Record<string, ClassName> = {};

	// Apply token definitions in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		for (const [k, v] of Object.entries(d.token)) {
			tokens[k] = v;
		}
	}

	// Helper functions
	const resolveTokens = (
		tokenKeys: string[] | undefined,
		tokenTable: typeof tokens,
	): ClassName[] => {
		if (!tokenKeys) {
			return [];
		}
		const result: ClassName[] = [];
		for (const key of tokenKeys) {
			result.push(tokenTable[key]);
		}
		return result;
	};

	const applyWhat = (
		acc: ClassName[],
		what:
			| What<Contract<TokenContract, SlotContract, VariantContract>>
			| undefined,
		tokenTable: typeof tokens,
	): ClassName[] => {
		if (!what) {
			return acc;
		}

		// Handle WhatClass (has 'class' property)
		if ("class" in what && what.class) {
			acc.push(what.class);
		}

		// Handle WhatToken (has 'token' property)
		if ("token" in what && what.token) {
			acc.push(...resolveTokens(what.token, tokenTable));
		}

		return acc;
	};

	const matches = (
		effective: Record<string, unknown>,
		ruleMatch: Record<string, unknown> | undefined,
	): boolean => {
		if (!ruleMatch) {
			return true;
		}

		for (const [k, v] of Object.entries(ruleMatch)) {
			if (effective[k] !== v) {
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
				...defaults,
				...(config.variant ?? {}),
			};

			// Apply token overrides
			const tokenTable = {
				...tokens,
			};

			for (const [key, values] of Object.entries(config.token ?? {})) {
				tokenTable[key] = values as string[];
			}

			const cache: Record<string | symbol, ClsSlotFn<TContract>> = {};
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

			const handler: ProxyHandler<Record<string, ClsSlotFn<TContract>>> =
				{
					get(_, prop) {
						if (prop in cache) return cache[prop];
						const slotName = prop as string;
						if (!allSlots.has(slotName)) {
							return undefined as unknown as ClsSlotFn<TContract>;
						}

						const slotFn: ClsSlotFn<TContract> = (call) => {
							const key = computeKey(slotName, call);
							const cached = resultCache.get(key);
							if (cached !== undefined) {
								return cached;
							}

							const local = call?.(whatUtil);
							const localConfig:
								| CreateConfig<TContract>
								| undefined = local
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
								localTokens[key] = values as string[];
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

							// Apply overrides
							if (
								config.slot?.[
									slotName as keyof typeof config.slot
								]
							) {
								acc = applyWhat(
									acc,
									config.slot[
										slotName as keyof typeof config.slot
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

							const out = tvc(acc);
							resultCache.set(key, out);
							return out;
						};

						cache[prop] = slotFn;
						return cache[prop];
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

			return new Proxy<Record<string, ClsSlotFn<TContract>>>(
				{} as Record<string, ClsSlotFn<TContract>>,
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
