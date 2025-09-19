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

/**
 * Utility objects passed to factory callbacks
 */
const defUtils = {
	what: what<any>(),
	def: def<any>(),
	override: defOverride<any>(),
} as const;

const tweakUtils = {
	...defUtils,
	override: tweakOverride<any>(),
} as const;

// -----------------------------------------------------------------------------
// Local types
// -----------------------------------------------------------------------------

type Predicate<TContract extends Contract.Any> = (
	variant: Variant.VariantOf<TContract>,
) => boolean;

type CompiledRule<TContract extends Contract.Any> = {
	predicate: Predicate<TContract>;
	what: What.Any<Contract.Any>;
	override: boolean;
};

// -----------------------------------------------------------------------------
// Compile-time utilities (pure)
// -----------------------------------------------------------------------------

const alwaysTrue: Predicate<Contract.Any> = () => {
	return true;
};

function compilePredicate<TContract extends Contract.Any>(
	match?: Variant.Optional<Contract.Any>,
): Predicate<TContract> {
	if (!match) {
		return alwaysTrue as Predicate<TContract>;
	}

	const keys = Object.keys(match);
	return function pred(variant) {
		// Using loose index access intentionally to avoid narrowing gymnastics
		// Keys come directly from provided match object
		const variantAny: Record<string, unknown> =
			variant as unknown as Record<string, unknown>;
		return !keys.some((key) => {
			return variantAny[key] !== (match as Record<string, unknown>)[key];
		});
	};
}

function buildLayers<TContract extends Contract.Any>(
	contract: TContract,
	definition: Definition.Type<TContract>,
) {
	const layers: {
		contract: Contract.Any;
		definition: Definition.Type<any>;
	}[] = [];
	let currentContract: Contract.Any | undefined = contract;
	let currentDefinition:
		| Definition.Type<TContract>
		| Definition.Type<Contract.Any>
		| undefined = definition;

	while (currentContract && currentDefinition) {
		layers.unshift({
			contract: currentContract,
			definition: currentDefinition,
		});
		currentContract = (currentContract as any)["~use"];
		currentDefinition = currentContract
			? (currentContract as any)["~definition"]
			: undefined;
	}

	return layers;
}

function collectSlotKeys(
	layers: {
		contract: Contract.Any;
	}[],
) {
	return Array.from(new Set(layers.flatMap(({ contract }) => contract.slot)));
}

function indexRulesBySlot<TContract extends Contract.Any>(
	layers: {
		definition: Definition.Type<any>;
	}[],
) {
	const allRules: Rule.Type<Contract.Any>[] = layers.flatMap(
		({ definition }) => {
			return definition.rules;
		},
	);

	const pairs = allRules.flatMap((rule) => {
		const predicate = compilePredicate<TContract>(rule.match);
		const isOverride = rule.override === true;
		const slotMap = rule.slot ?? {};

		return Object.entries(slotMap)
			.filter(
				(
					entry,
				): entry is [
					string,
					What.Any<Contract.Any>,
				] => {
					return entry[1] !== undefined;
				},
			)
			.map(([slotKey, whatValue]) => {
				const compiledRule: CompiledRule<TContract> = {
					predicate,
					what: whatValue,
					override: isOverride,
				};
				return {
					slotKey,
					compiledRule,
				};
			});
	});

	return pairs.reduce<Record<string, CompiledRule<TContract>[]>>(
		(accumulator, pair) => {
			const list = accumulator[pair.slotKey] ?? [];
			list.push(pair.compiledRule);
			accumulator[pair.slotKey] = list;
			return accumulator;
		},
		Object.create(null),
	);
}

function buildTokenTable(
	layers: {
		definition: Definition.Type<any>;
	}[],
): Record<string, What.Any<Contract.Any>> {
	return layers.reduce<Record<string, What.Any<Contract.Any>>>(
		(accumulator, item) => {
			const layerTokensEntries = Object.entries(
				item.definition.token ?? {},
			).filter(([, value]) => {
				return value !== undefined;
			});
			const layerTokens = Object.fromEntries(
				layerTokensEntries,
			) as Record<string, What.Any<Contract.Any>>;
			return Object.assign(Object.create(accumulator), layerTokens);
		},
		Object.create(null),
	);
}

function compileContract<TContract extends Contract.Any>(
	contract: TContract,
	definition: Definition.Type<TContract>,
) {
	const layers = buildLayers(contract, definition);
	const slotKeys = collectSlotKeys(layers);
	const rulesBySlot = indexRulesBySlot<TContract>(layers);
	const tokensProto = buildTokenTable(layers);
	return {
		layers,
		slotKeys,
		rulesBySlot,
		tokensProto,
	} as const;
}

// -----------------------------------------------------------------------------
// Resolver (factory) with cycle detection and caching
// -----------------------------------------------------------------------------

function createResolver(
	baseTokenTable: Record<string, What.Any<Contract.Any>>,
) {
	const baseResolvedTokenCache: Record<string, ClassName[]> =
		Object.create(null);

	function resolve(
		whatValue: What.Any<Contract.Any>,
		tokenTable: Record<string, What.Any<Contract.Any>> = baseTokenTable,
		visiting: Set<string> = new Set<string>(),
		localCache?: Record<string, ClassName[]>,
	): ClassName[] {
		const out: ClassName[] = [];
		const cacheRef =
			tokenTable === baseTokenTable ? baseResolvedTokenCache : localCache;

		if ("token" in whatValue && whatValue.token) {
			whatValue.token.forEach((tokenKey) => {
				if (visiting.has(tokenKey)) {
					throw new Error(
						`Circular dependency detected in token references: ${Array.from(visiting).join(" -> ")} -> ${tokenKey}`,
					);
				}

				if (cacheRef && (cacheRef as any)[tokenKey]) {
					out.push(...(cacheRef as any)[tokenKey]);
					return;
				}

				const tokenDefinition = tokenTable[tokenKey];
				if (!tokenDefinition) {
					return;
				}

				visiting.add(tokenKey);
				const resolved = resolve(
					tokenDefinition,
					tokenTable,
					visiting,
					localCache,
				);
				visiting.delete(tokenKey);

				if (cacheRef) {
					(cacheRef as any)[tokenKey] = resolved;
				}
				out.push(...resolved);
			});
		}

		if ("class" in whatValue && (whatValue as any).class) {
			out.push((whatValue as any).class);
		}

		return out;
	}

	return {
		resolve,
		baseResolvedTokenCache,
	} as const;
}

// -----------------------------------------------------------------------------
// Public API – cls
// -----------------------------------------------------------------------------

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

	// Attach definition to contract for inheritance
	(contract as any)["~definition"] = definition;

	// Precompile layers, slots, rules and base token table
	const { slotKeys, rulesBySlot, tokensProto } = compileContract(
		contract,
		definition,
	);

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
			const config = merge(userTweakFn, internalTweakFn)();

			// Global token table with overrides via prototype chain
			const tokenTable: Record<
				string,
				What.Any<Contract.Any>
			> = config.token
				? Object.assign(Object.create(tokensProto), config.token)
				: tokensProto;

			// Resolver bound to the token table after global overrides
			const { resolve } = createResolver(tokenTable);

			// Cache of built slot functions and result strings per local config
			const slotFunctionCache: Record<
				TSlot[number],
				CoolSlot.Fn<TContract>
			> = Object.create(null);
			const resultCache = new Map<string, string>();

			// --- tweak key helpers (identity + stable stringify) ---
			const tweakIdentityIds = new WeakMap<object, number>();
			let tweakIdentitySeq = 0;

			/**
			 * Recursively stringify an arbitrary POJO with sorted keys for determinism.
			 * Mirrors JSON semantics for primitives and arrays; skips undefined values.
			 */
			function stableStringifySorted(value: unknown): string {
				if (value === null || typeof value !== "object") {
					return JSON.stringify(value);
				}
				if (Array.isArray(value)) {
					const items = value.map((item) =>
						stableStringifySorted(item),
					);
					return `[${items.join(",")}]`;
				}
				const record: Record<string, unknown> = value as Record<
					string,
					unknown
				>;
				const keys = Object.keys(record).sort();
				const parts = keys
					.filter((key) => record[key] !== undefined)
					.map((key) => {
						return `${JSON.stringify(key)}:${stableStringifySorted(record[key])}`;
					});
				return `{${parts.join(",")}}`;
			}

			/**
			 * Stable, slot-scoped cache key for local tweak.
			 * Strategy:
			 * 1) Identity-based key via WeakMap for reused object instances (fast path).
			 * 2) Deterministic structural part that includes only fields that affect this slot.
			 */
			function computeKeyFromLocal<TContractLocal extends Contract.Any>(
				slotName: string,
				local: Tweak.Type<TContractLocal> | undefined,
			): string | null {
				if (!local) {
					return `${slotName}|__no_config__`;
				}

				// Identity key
				const localObject = local as unknown as object;
				let identityId = tweakIdentityIds.get(localObject);
				if (identityId === undefined) {
					tweakIdentitySeq = tweakIdentitySeq + 1;
					identityId = tweakIdentitySeq;
					tweakIdentityIds.set(localObject, identityId);
				}

				// Slot-scoped normalized view
				const normalized: {
					variant?: unknown;
					slot?: unknown;
					override?: unknown;
					token?: unknown;
				} = {};
				if (local.variant) {
					normalized.variant = local.variant;
				}
				const localSlotTable = local.slot as unknown as
					| Record<string, unknown>
					| undefined;
				if (localSlotTable && Object.hasOwn(localSlotTable, slotName)) {
					normalized.slot = {
						[slotName]: (localSlotTable as any)[slotName],
					};
				}
				const localOverrideTable = local.override as unknown as
					| Record<string, unknown>
					| undefined;
				if (
					localOverrideTable &&
					Object.hasOwn(localOverrideTable, slotName)
				) {
					normalized.override = {
						[slotName]: (localOverrideTable as any)[slotName],
					};
				}
				if (local.token) {
					normalized.token = local.token;
				}

				try {
					const structural = stableStringifySorted(normalized);
					return `${slotName}|id:${identityId}|${structural}`;
				} catch {
					return null;
				}
			}

			const handler: ProxyHandler<
				Record<TSlot[number], CoolSlot.Fn<TContract>>
			> = {
				get(_: unknown, slotName: TSlot[number]) {
					if (slotName in slotFunctionCache) {
						return slotFunctionCache[slotName];
					}

					const slotKeyStr = String(slotName);

					const slotFunction: CoolSlot.Fn<TContract> = (call) => {
						const local = call?.(tweakUtils);

						// Merge variants (shallow, only defined values)
						const localEffective: any = {
							...effectiveVariant,
						};
						if (local && local.variant) {
							Object.entries(local.variant)
								.filter(([, value]) => value !== undefined)
								.forEach(([key, value]) => {
									localEffective[key] = value;
								});
						}

						const key = computeKeyFromLocal(slotKeyStr, local);
						if (key !== null) {
							const cached = resultCache.get(key);
							if (cached !== undefined) {
								return cached;
							}
						}

						// Local token overlay and local cache for overlay resolution
						let activeTokens = tokenTable;
						let localResolvedCache:
							| Record<string, ClassName[]>
							| undefined;
						if (
							local &&
							local.token &&
							Object.keys(local.token).length > 0
						) {
							activeTokens = Object.assign(
								Object.create(tokenTable),
								local.token,
							);
							localResolvedCache = Object.create(null);
						}

						// Read per-slot customizations
						const localSlotWhat =
							local && local.slot
								? (local.slot as any)[slotName as any]
								: undefined;
						const configSlotWhat = config.slot
							? (config.slot as any)[slotName as any]
							: undefined;
						const localOverrideWhat =
							local && local.override
								? (local.override as any)[slotName as any]
								: undefined;
						const configOverrideWhat = config.override
							? (config.override as any)[slotName as any]
							: undefined;

						const slotRules = rulesBySlot[slotKeyStr] ?? [];

						// Fast path: nothing contributes
						const nothingContributes = [
							slotRules.length === 0,
							!localSlotWhat,
							!configSlotWhat,
							!localOverrideWhat,
							!configOverrideWhat,
						].every(Boolean);
						if (nothingContributes) {
							if (key !== null) {
								resultCache.set(key, "");
							}
							return "";
						}

						// Evaluate predicates and find last matching override index
						const matches = slotRules.map((rule) => {
							return rule.predicate(localEffective);
						});

						const anyMatch = matches.some(Boolean);
						const lastOverrideIdx = slotRules.reduce(
							(accumulator, rule, index) => {
								if (matches[index] && rule.override) {
									return index;
								}
								return accumulator;
							},
							-1,
						);

						let acc: ClassName[] = [];

						if (anyMatch) {
							const startIndex =
								lastOverrideIdx >= 0 ? lastOverrideIdx : 0;
							const visiting = new Set<string>();
							slotRules.slice(startIndex).forEach((rule, idx) => {
								if (!matches[startIndex + idx]) {
									return;
								}
								acc = acc.concat(
									resolve(
										rule.what,
										activeTokens,
										visiting,
										localResolvedCache,
									),
								);
							});
						}

						// Append slot-level whats
						if (localSlotWhat) {
							acc = acc.concat(
								resolve(
									localSlotWhat,
									activeTokens,
									new Set<string>(),
									localResolvedCache,
								),
							);
						}
						if (configSlotWhat) {
							acc = acc.concat(
								resolve(
									configSlotWhat,
									activeTokens,
									new Set<string>(),
									localResolvedCache,
								),
							);
						}

						// Apply overrides (clear & replace)
						if (localOverrideWhat) {
							acc = resolve(
								localOverrideWhat,
								activeTokens,
								new Set<string>(),
								localResolvedCache,
							);
						}
						if (configOverrideWhat) {
							acc = resolve(
								configOverrideWhat,
								activeTokens,
								new Set<string>(),
								localResolvedCache,
							);
						}

						const out = acc.length === 0 ? "" : tvc(acc);
						if (key !== null) {
							resultCache.set(key, out);
						}
						return out;
					};

					slotFunctionCache[slotName] = slotFunction;
					return slotFunctionCache[slotName];
				},
				ownKeys() {
					return slotKeys as any;
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
			(childContract as any)["~use"] = contract;
			return cls(childContract, childDefinitionFn);
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
