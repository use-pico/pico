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
import { cleanup } from "./utils/cleanup";
import { tvc } from "./utils/tvc";
import { tweaks } from "./utils/tweaks";
import { withVariants } from "./utils/withVariants";

// -----------------------------------------------------------------------------
// Local types
// -----------------------------------------------------------------------------

type Predicate<TContract extends Contract.Any> = (
	variant: Variant.VariantOf<TContract>,
) => boolean;

type CompiledRule<TContract extends Contract.Any> = {
	predicate: Predicate<TContract>;
	what: What.AnyOverride<Contract.Any>;
	override: boolean;
};

type ResolvedWhat = {
	classes: ClassName[];
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
	const rules: Rule.Type<Contract.Any>[] = layers.flatMap(
		({ definition }) => {
			return definition.rules;
		},
	);

	const pairs = rules.flatMap((rule) => {
		const predicate = compilePredicate<TContract>(rule.match);
		const isOverride = rule.override === true;
		const slotMap = rule.slot ?? {};

		return Object.entries(slotMap)
			.filter(
				(
					entry,
				): entry is [
					string,
					What.AnyOverride<Contract.Any>,
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

function indexRulesByToken<TContract extends Contract.Any>(
	layers: {
		definition: Definition.Type<any>;
	}[],
) {
	const rules: Rule.Type<Contract.Any>[] = layers.flatMap(
		({ definition }) => {
			return definition.rules;
		},
	);

	const pairs = rules.flatMap((rule) => {
		const predicate = compilePredicate<TContract>(rule.match);
		const isOverride = rule.override === true;
		const tokenMap = rule.token ?? {};

		return Object.entries(tokenMap)
			.filter(
				(
					entry,
				): entry is [
					string,
					What.AnyOverride<Contract.Any>,
				] => {
					return entry[1] !== undefined;
				},
			)
			.map(([tokenKey, whatValue]) => {
				const compiledRule: CompiledRule<TContract> = {
					predicate,
					what: whatValue,
					override: isOverride,
				};
				return {
					tokenKey,
					compiledRule,
				} as const;
			});
	});

	return pairs.reduce<Record<string, CompiledRule<TContract>[]>>(
		(accumulator, pair) => {
			const list = accumulator[(pair as any).tokenKey] ?? [];
			list.push((pair as any).compiledRule);
			accumulator[(pair as any).tokenKey] = list;
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
	const rulesByToken = indexRulesByToken<TContract>(layers);
	const tokensProto = buildTokenTable(layers);
	return {
		layers,
		slotKeys,
		rulesBySlot,
		rulesByToken,
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

	/**
	 * Push class names into the accumulator, supporting string | string[] | nested arrays.
	 * Order is preserved; falsy entries are ignored.
	 */
	function pushClassNames(
		accumulator: ClassName[],
		classInput: unknown,
	): void {
		if (Array.isArray(classInput)) {
			classInput.forEach((value) => {
				pushClassNames(accumulator, value);
			});
			return;
		}
		if (typeof classInput === "string" && classInput) {
			accumulator.push(classInput as ClassName);
		}
	}

	function resolve(
		whatValue: What.AnyOverride<Contract.Any>,
		tokenTable: Record<string, What.Any<Contract.Any>> = baseTokenTable,
		visiting: Set<string> = new Set<string>(),
		localCache?: Record<string, ClassName[]>,
	): ResolvedWhat {
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

				if (cacheRef?.[tokenKey]) {
					out.push(...cacheRef[tokenKey]);
					return;
				}

				const tokenDefinition = tokenTable[tokenKey];
				if (!tokenDefinition) {
					return;
				}

				visiting.add(tokenKey);
				const resolved = resolve(
					tokenDefinition as What.AnyOverride<Contract.Any>,
					tokenTable,
					visiting,
					localCache,
				);
				visiting.delete(tokenKey);

				if (cacheRef) {
					cacheRef[tokenKey] = resolved.classes;
				}
				out.push(...resolved.classes);
			});
		}

		if ("class" in whatValue && (whatValue as any).class !== undefined) {
			pushClassNames(out, (whatValue as any).class);
		}

		return {
			classes: out,
			override: (whatValue as any).override === true,
		};
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
	definition: Definition.Type<TContract>,
): Cls.Type<TContract> {
	contract["~definition"] = definition;

	// Precompile layers, slots, rules and base token table
	const { slotKeys, rulesBySlot, rulesByToken, tokensProto } =
		compileContract(contract, definition);

	return {
		create(...tweak) {
			const $tweak = cleanup(tweaks(...tweak));

			const variant = withVariants($tweak, {
				contract,
				definition,
			});

			// Global token table with overrides via prototype chain
			const tokenTable: Record<
				string,
				What.Any<Contract.Any>
			> = $tweak?.token
				? Object.assign(Object.create(tokensProto), $tweak.token)
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
			 *
			 * TODO Revisit this - we know what the input is
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

					const slotFunction: CoolSlot.Fn<TContract> = (...local) => {
						const $local = cleanup(tweaks(...local));

						// Merge variants (shallow, only defined values)
						const localEffective = {
							...variant,
						} as Variant.VariantOf<TContract>;
						if ($local?.variant) {
							Object.entries($local.variant)
								.filter(([, value]) => value !== undefined)
								.forEach(([key, value]) => {
									(localEffective as any)[key] = value;
								});
						}

						const key = computeKeyFromLocal(slotKeyStr, $local);
						if (key !== null) {
							const cached = resultCache.get(key);
							if (cached !== undefined) {
								return cached;
							}
						}

						// --- Apply token rules to produce a per-call token overlay ---
						const tokenRulesOverlayEntries = Object.entries(
							rulesByToken,
						)
							.map(([tokenKey, compiledRules]) => {
								const matches = compiledRules.map((rule) => {
									return rule.predicate(localEffective);
								});
								const anyMatch = matches.some(Boolean);
								if (!anyMatch) {
									return null;
								}
								const lastOverrideIdx = compiledRules.reduce(
									(acc, rule, index) => {
										if (matches[index] && rule.override) {
											return index;
										}
										return acc;
									},
									-1,
								);

								const startIndex =
									lastOverrideIdx >= 0 ? lastOverrideIdx : 0;
								const accumulated = compiledRules
									.slice(startIndex)
									.reduce<{
										classes: ClassName[];
										tokens: string[];
									}>(
										(acc, rule, idx) => {
											if (!matches[startIndex + idx]) {
												return acc;
											}
											const resolved = resolve(rule.what);
											if (resolved.override) {
												acc.classes =
													resolved.classes.slice();
												acc.tokens = [];
											} else {
												acc.classes =
													acc.classes.concat(
														resolved.classes,
													);
											}
											if ((rule.what as any).token) {
												acc.tokens = acc.tokens.concat(
													(
														(rule.what as any)
															.token as any[]
													).filter(
														Boolean,
													) as string[],
												);
											}
											return acc;
										},
										{
											classes: [],
											tokens: [],
										},
									);

								const composed: What.Any<Contract.Any> =
									{} as any;
								if (accumulated.classes.length > 0) {
									(composed as any).class =
										accumulated.classes;
								}
								if (accumulated.tokens.length > 0) {
									(composed as any).token =
										accumulated.tokens;
								}
								return [
									tokenKey,
									composed,
								] as const;
							})
							.filter(
								(
									x,
								): x is readonly [
									string,
									What.Any<Contract.Any>,
								] => Boolean(x),
							);

						const tokenTableWithRuleOverlay: Record<
							string,
							What.Any<Contract.Any>
						> = tokenRulesOverlayEntries.length > 0
							? Object.assign(
									Object.create(tokenTable),
									Object.fromEntries(
										tokenRulesOverlayEntries,
									),
								)
							: tokenTable;

						// Local token overlay and local cache for overlay resolution
						let activeTokens = tokenTableWithRuleOverlay;
						let localResolvedCache:
							| Record<string, ClassName[]>
							| undefined;
						if (
							$local?.token &&
							Object.keys($local.token).length > 0
						) {
							activeTokens = Object.assign(
								Object.create(tokenTableWithRuleOverlay),
								$local.token,
							);
							localResolvedCache = Object.create(null);
						}

						// Read per-slot customizations
						const localSlotWhat = $local?.slot
							? (
									$local.slot as Record<
										string,
										What.AnyOverride<Contract.Any>
									>
								)[slotName]
							: undefined;
						const configSlotWhat = $tweak?.slot
							? (
									$tweak.slot as Record<
										string,
										What.AnyOverride<Contract.Any>
									>
								)[slotName]
							: undefined;

						const slotRules = rulesBySlot[slotKeyStr] ?? [];

						// Fast path: nothing contributes
						const nothingContributes = [
							slotRules.length === 0,
							!localSlotWhat,
							!configSlotWhat,
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
								const resolvedWhat = resolve(
									rule.what,
									activeTokens,
									visiting,
									localResolvedCache,
								);
								if (resolvedWhat.override) {
									acc = resolvedWhat.classes;
								} else {
									acc = acc.concat(resolvedWhat.classes);
								}
							});
						}

						// Append slot-level whats (config first, user last)
						if (configSlotWhat) {
							const resolvedWhat = resolve(
								configSlotWhat,
								activeTokens,
								new Set<string>(),
								localResolvedCache,
							);
							if (resolvedWhat.override) {
								acc = resolvedWhat.classes;
							} else {
								acc = acc.concat(resolvedWhat.classes);
							}
						}
						if (localSlotWhat) {
							const resolvedWhat = resolve(
								localSlotWhat,
								activeTokens,
								new Set<string>(),
								localResolvedCache,
							);
							if (resolvedWhat.override) {
								acc = resolvedWhat.classes;
							} else {
								acc = acc.concat(resolvedWhat.classes);
							}
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

			return {
				slots: new Proxy(
					{} as Record<TSlot[number], CoolSlot.Fn<TContract>>,
					handler,
				),
				variant,
			};
		},
		extend(childContract, childDefinitionFn) {
			(childContract as any)["~use"] = contract;
			return cls(childContract, childDefinitionFn);
		},
		use<Sub extends Contract.Any>(sub: Cls.Type<Sub>) {
			return sub as unknown as Cls.Type<TContract>;
		},
		tweak(...tweak) {
			return tweaks(...(tweak as Tweak.Tweaks<TContract>[]));
		},
		contract,
		definition,
	};
}
