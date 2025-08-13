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

// TODO Vibe variable extraction (create PicoCls with tokens)

// Local internal helpers (runtime only)
type InternalContractLayer = {
	contract: Contract<any, any, any>;
	definition: Definition<any>;
};

type InternalTokenIndex = Record<string, string[]>;
type InternalVariantValues = Record<string, unknown>;

// Internal type for runtime processing (simplified version of What for internal use)
type InternalWhat = {
	class?: ClassName;
	token?: string[];
};

type InternalCreateConfig = {
	variant?: Record<string, unknown>;
	slot?: Record<string, InternalWhat>;
	override?: Record<string, InternalWhat>;
	// Flat token overrides: tokenKey → classes
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
	// Create WhatUtil instance for this cls instance
	const whatUtil = what<TContract>();

	// Build inheritance chain once for this instance (base -> child order)
	const buildChain = (
		base: Contract<any, any, any>,
		def: Definition<any>,
	): InternalContractLayer[] => {
		const layers: InternalContractLayer[] = [];

		let currentContract: Contract<any, any, any> | undefined = base;
		let currentDefinition: Definition<any> | undefined = def;

		while (currentContract && currentDefinition) {
			layers.push({
				contract: currentContract,
				definition: currentDefinition,
			});

			const nextContract = currentContract["~use"] as
				| Contract<any, any, any>
				| undefined;
			const nextDefinition = currentContract["~definition"] as
				| Definition<any>
				| undefined;

			currentContract = nextContract;
			currentDefinition = nextDefinition;
		}

		return layers.reverse();
	};

	// Call definition function to get the actual definition
	const definition = definitionFn(whatUtil);
	const layers = buildChain(contract, definition);

	// Collect all slots across the chain (set union)
	const allSlots: Set<string> = (() => {
		const s = new Set<string>();
		for (const { contract: c } of layers) {
			for (const slot of c.slot as string[]) s.add(slot);
		}
		return s;
	})();

	// Precompute merged defaults (base -> child, child overwrites)
	const mergedDefaults: InternalVariantValues = (() => {
		const out: InternalVariantValues = {};
		for (const { definition: d } of layers)
			Object.assign(out, d.defaults ?? {});
		return out;
	})();

	// Precompute merged rules (base rules first, then child rules; keep order)
	const mergedRules: RuleDefinition<any>[] = (() => {
		const out: RuleDefinition<any>[] = [];
		for (const { definition: d } of layers) {
			// rules is an array property, not a function
			out.push(...d.rules);
		}
		return out;
	})();

	// Normalize definitions to flat map: tokenKey -> classes[]
	const normalizeDefToFlat = (
		token: Record<string, any> | undefined,
	): Record<string, string[]> => {
		const out: Record<string, string[]> = {};
		if (!token) return out;
		for (const [k, v] of Object.entries(token)) {
			if (Array.isArray(v)) {
				out[k] = v as string[];
				continue;
			}
			if (v && typeof v === "object") {
				for (const [variant, classes] of Object.entries(
					v as Record<string, string[]>,
				)) {
					out[`${k}.${variant}`] = Array.isArray(classes)
						? (classes as string[])
						: [];
				}
			}
		}
		return out;
	};

	// Build base token index table (REPLACE/APPEND semantics handled per layer)
	const baseTokenIndex: InternalTokenIndex = (() => {
		const index: InternalTokenIndex = {};

		// First pass: collect all token keys from all contracts and seed with empty arrays
		for (const { contract: c } of layers) {
			const t = c.tokens as unknown as any;
			if (Array.isArray(t)) {
				for (const key of t) {
					if (!(key in index)) index[key] = [];
				}
			} else if (t && typeof t === "object") {
				for (const [group, variants] of Object.entries(
					t as Record<string, readonly string[]>,
				)) {
					for (const v of variants as readonly string[]) {
						const key = `${group}.${v}`;
						if (!(key in index)) index[key] = [];
					}
				}
			}
		}

		// Second pass: apply token definitions with REPLACE/APPEND semantics
		for (const { definition: d } of layers) {
			const map = normalizeDefToFlat(d.token as any);
			for (const [key, classes] of Object.entries(map)) {
				index[key] = Array.isArray(classes) ? classes : [];
			}
		}

		return index;
	})();

	// Helpers shared by slot invocations
	const applyTokenOverrides = (
		target: InternalTokenIndex,
		overrides: Record<string, string[]> | undefined,
	) => {
		if (!overrides) return;
		for (const [key, values] of Object.entries(overrides)) {
			target[key] = Array.isArray(values) ? values : [];
		}
	};

	const resolveTokens = (
		tokens: string[] | undefined,
		table: InternalTokenIndex,
	): string[] => {
		if (!tokens || tokens.length === 0) return [];
		const out: string[] = [];
		for (const t of tokens) {
			const cls = table[t] ?? [];
			if (cls.length) out.push(...cls);
		}
		return out;
	};

	const applyWhat = (
		acc: string[],
		what: InternalWhat | undefined,
		table: InternalTokenIndex,
	): string[] => {
		if (!what) return acc;
		if (what.class) {
			if (Array.isArray(what.class))
				acc.push(...(what.class as string[]));
			else acc.push(what.class as string);
		}
		if (what.token) acc.push(...resolveTokens(what.token, table));
		return acc;
	};

	const matches = (
		effective: Record<string, unknown>,
		ruleMatch: Record<string, unknown> | undefined,
	): boolean => {
		if (!ruleMatch) return true;

		for (const [k, v] of Object.entries(ruleMatch)) {
			const effectiveValue = effective[k];

			// Handle nested variant structures
			if (
				typeof v === "object" &&
				v !== null &&
				typeof effectiveValue === "object" &&
				effectiveValue !== null
			) {
				// Recursively check nested variant structure
				if (
					!matches(
						effectiveValue as Record<string, unknown>,
						v as Record<string, unknown>,
					)
				) {
					return false;
				}
			} else if (effectiveValue !== v) {
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
			)() as InternalCreateConfig;

			// Effective variants: defaults <- create.variant
			const effectiveVariant: Record<string, unknown> = {
				...mergedDefaults,
				...(config.variant ?? {}),
			};

			// Build per-create token index (base + create.token)
			const tokenTable: InternalTokenIndex = {
				...baseTokenIndex,
			};
			if (config.token) {
				applyTokenOverrides(
					tokenTable,
					normalizeDefToFlat(config.token as any),
				);
			}

			const cache: Record<string | symbol, ClsSlotFn<TContract>> = {};
			// Shared result cache across all slots for this create() instance
			const resultCache = new Map<string, string>();
			const computeKey = (
				slot: string,
				call?: (
					props: WhatUtil<TContract>,
				) => Partial<CreateConfig<TContract>>,
			): string => {
				if (call === undefined) {
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
								| InternalCreateConfig
								| undefined = local
								? {
										variant: local.variant,
										slot: local.slot as
											| Record<string, InternalWhat>
											| undefined,
										override: local.override as
											| Record<string, InternalWhat>
											| undefined,
										token: local.token as any,
									}
								: undefined;

							const localEffective: Record<string, unknown> = {
								...effectiveVariant,
								...(localConfig?.variant ?? {}),
							};

							// Per-call token overrides
							const localTokenTable: InternalTokenIndex = {
								...tokenTable,
							};
							if (localConfig?.token) {
								applyTokenOverrides(
									localTokenTable,
									normalizeDefToFlat(
										localConfig.token as any,
									),
								);
							}

							let acc: string[] = [];

							// Apply rules in order
							for (const rule of mergedRules) {
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
								acc = applyWhat(acc, what, localTokenTable);
							}

							// Apply create-time appends/overrides
							const baseAppend = config.slot?.[slotName];
							if (baseAppend) {
								acc = applyWhat(
									acc,
									baseAppend,
									localTokenTable,
								);
							}

							const baseOverride = config.override?.[slotName];
							if (baseOverride) {
								acc = [];
								acc = applyWhat(
									acc,
									baseOverride,
									localTokenTable,
								);
							}

							const callAppend = localConfig?.slot?.[slotName];
							if (callAppend) {
								acc = applyWhat(
									acc,
									callAppend,
									localTokenTable,
								);
							}

							const callOverride =
								localConfig?.override?.[slotName];
							if (callOverride) {
								acc = [];
								acc = applyWhat(
									acc,
									callOverride,
									localTokenTable,
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
			// Set up inheritance chain
			childContract["~use"] = contract;
			childContract["~definition"] = definition;

			// Create a merged contract that includes both child and inherited tokens (flat)
			const parentTokens = Array.isArray(contract.tokens)
				? (contract.tokens as unknown as string[])
				: [];
			const childTokens = Array.isArray(childContract.tokens)
				? (childContract.tokens as unknown as string[])
				: [];
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

			// Create the extended cls instance with the merged contract
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
