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

// Local types for cls function implementation
type Predicate<TContract extends Contract.Any> = (
	variant: Variant.VariantOf<TContract>,
) => boolean;

type CompiledRule<TContract extends Contract.Any> = {
	predicate: Predicate<TContract>;
	what: What.Any<Contract.Any>;
	override: boolean;
};

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
		contract: Contract.Any;
		definition: Definition.Type<any>;
	}[] = [];
	let current: Contract.Any | undefined = contract;
	let currentDef:
		| Definition.Type<TContract>
		| Definition.Type<Contract.Any>
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

	const slotKeys = Array.from(
		new Set(layers.flatMap(({ contract }) => contract.slot)),
	);

	const rules: Rule.Type<Contract.Any>[] = layers.flatMap(
		({ definition }) => definition.rules,
	);

	// Build token index with proper inheritance order
	const tokens = Object.fromEntries(
		layers.flatMap(({ definition }) =>
			Object.entries(definition.token).filter(([, v]) => v !== undefined),
		),
	) as Record<string, What.Any<Contract.Any>>;

	// Compile predicates once per rule.match
	const alwaysTrue: Predicate<TContract> = () => true;

	function compilePredicate(
		match?: Variant.Optional<Contract.Any>,
	): Predicate<TContract> {
		if (!match) {
			return alwaysTrue;
		}
		const keys = Object.keys(
			match,
		) as (keyof Variant.VariantOf<TContract>)[];
		return function pred(variant) {
			return !keys.some(
				(key) => key !== undefined && variant[key] !== match[key],
			);
		};
	}

	// Pre-index rules per slot with compiled predicates and extracted 'what'
	const rulesBySlot: Record<string, CompiledRule<TContract>[]> = rules
		.flatMap((rule) => {
			const predicate = compilePredicate(rule.match);
			const isOverride = rule.override === true;
			const slotMap = rule.slot ?? {};

			return Object.entries(slotMap)
				.filter(
					(
						entry,
					): entry is [
						string,
						What.Any<Contract.Any>,
					] => entry[1] !== undefined,
				)
				.map(([slotKey, what]) => ({
					slotKey,
					compiledRule: {
						predicate,
						what,
						override: isOverride,
					},
				}));
		})
		.reduce((acc, { slotKey, compiledRule }) => {
			if (!acc[slotKey]) {
				acc[slotKey] = [];
			}
			acc[slotKey].push(compiledRule);
			return acc;
		}, Object.create(null));

	// Base token resolution cache; rebound after global overrides are applied
	let baseTokenTable: Record<string, What.Any<Contract.Any>> = tokens;
	let baseResolvedTokenCache: Record<string, ClassName[]> =
		Object.create(null);

	// Helper to resolve a single What<T> recursively with caching
	const resolveWhat = (
		what: What.Any<Contract.Any>,
		tokenTable: Record<string, What.Any<Contract.Any>>,
		tokenSet: Set<string>,
		localTokenCache?: Record<string, ClassName[]>,
	): ClassName[] => {
		const out: ClassName[] = [];

		if ("token" in what && what.token) {
			what.token.forEach((tokenKey) => {
				if (tokenSet.has(tokenKey)) {
					throw new Error(
						`Circular dependency detected in token references: ${Array.from(
							tokenSet,
						).join(" -> ")} -> ${tokenKey}`,
					);
				}

				const cacheRef =
					tokenTable === baseTokenTable
						? baseResolvedTokenCache
						: localTokenCache;

				if (cacheRef) {
					if (cacheRef[tokenKey]) {
						out.push(...cacheRef[tokenKey]);
						return;
					}
				}

				const tokenDef = tokenTable[tokenKey];
				if (!tokenDef) {
					return;
				}

				tokenSet.add(tokenKey);

				const resolved = resolveWhat(
					tokenDef,
					tokenTable,
					tokenSet,
					localTokenCache,
				);
				out.push(...resolved);

				if (cacheRef) {
					cacheRef[tokenKey] = resolved;
				}

				tokenSet.delete(tokenKey);
			});
		}

		if ("class" in what && what.class) {
			out.push(what.class);
		}

		return out;
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

			const config = merge(userTweakFn, internalTweakFn)();

			// Global token table with overrides
			const tokenTable: Record<string, What.Any<Contract.Any>> = {
				...tokens,
				...(config.token ?? {}),
			};

			// Rebind base token cache to include global overrides
			baseTokenTable = tokenTable;
			baseResolvedTokenCache = Object.create(null);

			const cache: Record<
				TSlot[number],
				CoolSlot.Fn<TContract>
			> = Object.create(null);
			const resultCache = new Map<string, string>();

			const computeKeyFromLocal = (
				slot: string,
				local: Tweak.Type<TContract> | undefined,
			): string | null => {
				if (!local) {
					return `${slot}|__no_config__`;
				}
				try {
					return `${slot}|${JSON.stringify(local)}`;
				} catch {
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

					const slotKeyStr = String(slotName);

					const slotFn: CoolSlot.Fn<TContract> = (call) => {
						const local = call?.(tweakUtils);

						const key = computeKeyFromLocal(slotKeyStr, local);
						if (key !== null) {
							const cached = resultCache.get(key);
							if (cached !== undefined) {
								return cached;
							}
						}

						// Merge variant overrides (no intermediate arrays)
						const localEffective = {
							...effectiveVariant,
						};
						if (local?.variant) {
							Object.entries(local.variant)
								.filter(([, variant]) => variant !== undefined)
								.forEach(([k, variant]) => {
									localEffective[
										k as keyof typeof localEffective
									] = variant;
								});
						}

						// Local token overrides without copying base table: use overlay proto
						let activeTokens = tokenTable;
						let localResolvedCache:
							| Record<string, ClassName[]>
							| undefined;

						if (local?.token && Object.keys(local.token).length) {
							activeTokens = Object.assign(
								Object.create(tokenTable),
								Object.fromEntries(
									Object.entries(local.token).map(
										([token, what]) => [
											token,
											what,
										],
									),
								),
							);
							localResolvedCache = Object.create(null);
						}

						// Pre-read per-slot extras
						const localSlotWhat =
							local?.slot?.[slotName as keyof typeof local.slot];
						const configSlotWhat =
							config.slot?.[slotName as keyof typeof config.slot];
						const localOverrideWhat =
							local?.override?.[
								slotName as keyof typeof local.override
							];
						const configOverrideWhat =
							config.override?.[
								slotName as keyof typeof config.override
							];

						const slotRules = rulesBySlot[slotKeyStr] ?? [];

						// Fast bail: nothing contributes at all
						if (
							slotRules.length === 0 &&
							!localSlotWhat &&
							!configSlotWhat &&
							!localOverrideWhat &&
							!configOverrideWhat
						) {
							const out = "";
							if (key !== null) {
								resultCache.set(key, out);
							}
							return out;
						}

						// One pass: evaluate predicates -> matches[], find last matching override index
						const matches = slotRules.map((rule) =>
							rule.predicate(localEffective),
						);
						const anyMatch = matches.some(Boolean);
						const lastOverrideIdx =
							slotRules
								.map((rule, index) =>
									matches[index] && rule.override
										? index
										: -1,
								)
								.filter((index) => index !== -1)
								.pop() ?? -1;

						let acc: ClassName[] = [];

						// If at least one rule matches, accumulate from last matched override
						if (anyMatch) {
							const start =
								lastOverrideIdx >= 0 ? lastOverrideIdx : 0;

							const sharedTokenSet = new Set<string>();

							slotRules
								.slice(start)
								.filter((_, index) => matches[start + index])
								.forEach((rule) => {
									acc.push(
										...resolveWhat(
											rule.what,
											activeTokens,
											sharedTokenSet,
											localResolvedCache,
										),
									);
								});
						}

						// Append slot configurations
						if (localSlotWhat) {
							acc.push(
								...resolveWhat(
									localSlotWhat,
									activeTokens,
									new Set<string>(),
									localResolvedCache,
								),
							);
						}
						if (configSlotWhat) {
							acc.push(
								...resolveWhat(
									configSlotWhat,
									activeTokens,
									new Set<string>(),
									localResolvedCache,
								),
							);
						}

						// Apply overrides (clear and replace)
						if (localOverrideWhat) {
							acc = [];
							acc.push(
								...resolveWhat(
									localOverrideWhat,
									activeTokens,
									new Set<string>(),
									localResolvedCache,
								),
							);
						}
						if (configOverrideWhat) {
							acc = [];
							acc.push(
								...resolveWhat(
									configOverrideWhat,
									activeTokens,
									new Set<string>(),
									localResolvedCache,
								),
							);
						}

						const out = acc.length === 0 ? "" : tvc(acc);
						if (key !== null) {
							resultCache.set(key, out);
						}
						return out;
					};

					cache[slotName] = slotFn;
					return cache[slotName];
				},
				ownKeys() {
					return slotKeys;
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

			return cls(
				{
					...childContract,
					tokens: Array.from(
						new Set([
							...contract.tokens,
							...childContract.tokens,
						]),
					),
				} as any,
				childDefinitionFn as any,
			);
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
