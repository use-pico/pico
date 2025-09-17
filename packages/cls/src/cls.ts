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
import { override as defOverride } from "./utils/definition/override";
import { merge } from "./utils/merge";
import { tvc } from "./utils/tvc";
import { override as tweakOverride } from "./utils/tweak/override";
import { what } from "./utils/what";
import { withVariants } from "./utils/withVariants";

const defUtils = {
	what: what<any>(),
	def: def<any>(),
	override: defOverride<any>(),
} as const;

const tweakUtils = {
	...defUtils,
	override: tweakOverride<any>(),
} as const;

export function cls<
	const TToken extends Token.Type,
	const TSlot extends CoolSlot.Type,
	const TVariant extends Variant.Type,
	const TContract extends Contract.Type<TToken, TSlot, TVariant, any>,
>(
	contract: TContract,
	definitionFn: Definition.Factory.Fn<TContract>,
): Cls.Type<TContract> {
	const definition = definitionFn(defUtils);

	// Set the definition on the contract for inheritance
	contract["~definition"] = definition;

	// Build inheritance chain (base -> child order)
	const layers: {
		contract: Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>;
		definition: Definition.Type<any>;
	}[] = [];
	let current:
		| Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>
		| undefined = contract;
	let currentDef:
		| Definition.Type<TContract>
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
			if (v !== undefined) {
				tokens[k] = v;
			}
		}
	}

	// Pre-index rules per slot to avoid scanning all rules on every slot call
	const rulesBySlot: Record<
		string,
		Rule.Type<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>[]
	> = Object.create(null);
	for (const rule of rules) {
		const slotMap = rule.slot ?? {};
		for (const slotKey of Object.keys(slotMap)) {
			if (!rulesBySlot[slotKey]) {
				rulesBySlot[slotKey] = [];
			}
			rulesBySlot[slotKey].push(rule);
		}
	}

	// Base token resolution cache for the unoverridden token table
	const baseTokenTable = tokens;
	const baseResolvedTokenCache: Record<string, ClassName[]> =
		Object.create(null);

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

				const useBaseCache = tokenTable === baseTokenTable;
				if (useBaseCache) {
					const cached = baseResolvedTokenCache[tokenKey];
					if (cached) {
						result.push(...cached);
						continue;
					}
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

				// Cache for base table only
				if (tokenTable === baseTokenTable) {
					baseResolvedTokenCache[tokenKey] = resolved;
				}

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

	// Build the initial token table including global token overrides from tweak config
	// (Applied later inside .create where user/internal tweaks are merged.)

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

			// Apply token overrides (global level)
			const tokenTable: Record<
				string,
				What.Any<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>
			> = {
				...tokens,
			};

			for (const [key, values] of Object.entries(config.token ?? {})) {
				tokenTable[key] = values as What.Any<
					Contract.Type<TToken, CoolSlot.Type, Variant.Type>
				>;
			}

			const cache = {} as Record<TSlot[number], CoolSlot.Fn<TContract>>;
			const resultCache = new Map<string, string>();

			// Build a cache key from already evaluated local config
			const computeKeyFromLocal = (
				slot: string,
				local: ReturnType<NonNullable<Tweak.Fn<TContract>>> | undefined,
			): string | null => {
				if (!local) {
					return `${slot}|__no_config__`;
				}
				try {
					return `${slot}|${JSON.stringify(local)}`;
				} catch {
					// Do not cache if serialization fails
					return null;
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
						// Evaluate 'call' exactly once
						const local = call?.(tweakUtils);

						const localConfig: Tweak.Type<TContract> | undefined =
							local
								? {
										variant: local.variant,
										slot: local.slot,
										override: local.override,
										token: local.token,
									}
								: undefined;

						const key = computeKeyFromLocal(
							String(slotName),
							local,
						);
						if (key !== null) {
							const cached = resultCache.get(key);
							if (cached !== undefined) {
								return cached;
							}
						}

						const localEffective = {
							...effectiveVariant,
							...Object.fromEntries(
								Object.entries(
									localConfig?.variant ?? {},
								).filter(([, value]) => value !== undefined),
							),
						} as const;

						// Avoid allocating a new token table if there are no local overrides
						let localTokens:
							| Record<
									string,
									What.Any<
										Contract.Type<
											Token.Type,
											CoolSlot.Type,
											Variant.Type
										>
									>
							  >
							| undefined;

						if (
							localConfig?.token &&
							Object.keys(localConfig.token).length > 0
						) {
							localTokens = {
								...tokenTable,
							};
							for (const [key, values] of Object.entries(
								localConfig.token,
							)) {
								localTokens[key] = values as What.Any<
									Contract.Type<
										TToken,
										CoolSlot.Type,
										Variant.Type
									>
								>;
							}
						}

						// Use either the base table with potential global overrides or the locally extended one
						const activeTokens = localTokens ?? tokenTable;

						let acc: ClassName[] = [];

						// Apply rules (pre-indexed per slot)
						const slotRules =
							rulesBySlot[slotName as unknown as string] ?? [];

						for (const rule of slotRules) {
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
							acc.push(...resolveWhat(what, activeTokens));
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
								acc.push(...resolveWhat(what, activeTokens));
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
								acc.push(...resolveWhat(what, activeTokens));
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
								acc.push(...resolveWhat(what, activeTokens));
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
								acc.push(...resolveWhat(what, activeTokens));
							}
						}

						const out = tvc(acc);
						if (key !== null) {
							resultCache.set(key, out);
						}
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
