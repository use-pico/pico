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

type InternalConfig = {
	variant?: Record<string, unknown>;
	slot?: Record<string, What<any>>;
	override?: Record<string, What<any>>;
	token?: Record<string, string[]>;
};

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
		contract: Contract<any, any, any>;
		definition: Definition<any>;
	}[] = [];
	let current: Contract<any, any, any> | undefined = contract;
	let currentDef: Definition<any> | undefined = definition;

	while (current && currentDef) {
		layers.unshift({
			contract: current,
			definition: currentDef,
		});
		current = current["~use"] as Contract<any, any, any> | undefined;
		currentDef = current?.["~definition"] as Definition<any> | undefined;
	}

	// Collect all slots
	const allSlots = new Set<string>();
	for (const { contract: c } of layers) {
		for (const slot of c.slot as string[]) allSlots.add(slot);
	}

	// Merge defaults and rules from ALL layers in inheritance order
	const defaults: Record<string, unknown> = {};
	const rules: RuleDefinition<any>[] = [];

	// Process layers in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		// Merge defaults (child overrides base)
		Object.assign(defaults, d.defaults ?? {});
		// Collect rules (all rules from all layers)
		rules.push(...(d.rules ?? []));
	}

	// Build token index with proper inheritance order
	const tokens: Record<string, string[]> = {};

	// First pass: collect all token keys from all contracts
	for (const { contract: c } of layers) {
		const tokenKeys = c.tokens as unknown as string[];
		for (const key of tokenKeys) {
			if (!(key in tokens)) tokens[key] = [];
		}
	}

	// Second pass: apply token definitions in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		const tokenDefs = d.token as Record<string, any> | undefined;
		if (tokenDefs) {
			for (const [k, v] of Object.entries(tokenDefs)) {
				if (Array.isArray(v)) {
					tokens[k] = v as string[];
				} else {
					for (const [variant, classes] of Object.entries(
						v as Record<string, string[]>,
					)) {
						tokens[`${k}.${variant}`] = classes;
					}
				}
			}
		}
	}

	// Helper functions
	const resolveTokens = (
		tokenKeys: string[] | undefined,
		tokenTable: Record<string, string[]>,
	): string[] => {
		if (!tokenKeys) {
			return [];
		}
		const result: string[] = [];
		for (const key of tokenKeys) {
			const classes = tokenTable[key] ?? [];
			if (classes.length) result.push(...classes);
		}
		return result;
	};

	const applyWhat = (
		acc: ClassName[],
		what: What<any> | undefined,
		tokenTable: Record<string, string[]>,
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
			)() as InternalConfig;

			const effectiveVariant = {
				...defaults,
				...(config.variant ?? {}),
			};

			// Apply token overrides
			const tokenTable = {
				...tokens,
			};

			for (const [key, values] of Object.entries(config.token ?? {})) {
				tokenTable[key] = values;
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
						// TODO This should not happen in type level; instead of returning undefined, throw
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
							// TODO use types from ./types.ts
							const localConfig: InternalConfig | undefined =
								local
									? {
											variant: local.variant,
											slot: local.slot as
												| Record<string, What<any>>
												| undefined,
											override: local.override as
												| Record<string, What<any>>
												| undefined,
											token: local.token as any,
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
								localTokens[key] = values;
							}

							let acc: ClassName[] = [];

							// Apply rules
							for (const rule of rules) {
								if (!matches(localEffective, rule.match)) {
									continue;
								}
								const slotMap = (rule.slot ?? {}) as Record<
									string,
									What<any>
								>;
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
							if (config.slot?.[slotName]) {
								acc = applyWhat(
									acc,
									config.slot[slotName],
									localTokens,
								);
							}

							if (config.override?.[slotName]) {
								acc = [];
								acc = applyWhat(
									acc,
									config.override[slotName],
									localTokens,
								);
							}

							if (localConfig?.slot?.[slotName]) {
								acc = applyWhat(
									acc,
									localConfig.slot[slotName],
									localTokens,
								);
							}

							if (localConfig?.override?.[slotName]) {
								acc = [];
								acc = applyWhat(
									acc,
									localConfig.override[slotName],
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

			const parentTokens = contract.tokens as unknown as string[];
			const childTokens = childContract.tokens as unknown as string[];
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
