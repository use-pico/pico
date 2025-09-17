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
	v: Variant.Required<TContract>,
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
	) as Record<
		string,
		What.Any<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>
	>;

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
		) as (keyof Variant.Required<TContract>)[];
		return function pred(variant: Variant.Required<TContract>): boolean {
			return !keys.some(
				(key) =>
					key !== undefined &&
					variant[key] !==
						(match as Variant.Required<TContract>)[key],
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
	let baseTokenTable: Record<
		string,
		What.Any<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>
	> = tokens;
	let baseResolvedTokenCache: Record<string, ClassName[]> =
		Object.create(null);

	// Helper to push arrays without spread/iterators
	function pushAll<T>(dst: T[], src: T[]): void {
		for (let i = 0; i < src.length; i++) {
			dst.push(src[i]!);
		}
	}

	// Helper to resolve a single What<T> recursively with caching
	const resolveWhat = (
		what: What.Any<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>,
		tokenTable: Record<
			string,
			What.Any<Contract.Type<Token.Type, CoolSlot.Type, Variant.Type>>
		>,
		tokenSet: Set<string>,
		localTokenCache?: Record<string, ClassName[]>,
	): ClassName[] => {
		const out: ClassName[] = [];

		if ("token" in what && what.token) {
			for (let i = 0; i < what.token.length; i++) {
				const tokenKey = what.token[i]!;
				if (tokenSet.has(tokenKey)) {
					throw new Error(
						`Circular dependency detected in token references: ${Array.from(
							tokenSet,
						).join(" -> ")} -> ${tokenKey}`,
					);
				}

				const useBaseCache = tokenTable === baseTokenTable;
				const cacheRef = useBaseCache
					? baseResolvedTokenCache
					: localTokenCache;

				if (cacheRef) {
					const cached = cacheRef[tokenKey];
					if (cached) {
						pushAll(out, cached);
						continue;
					}
				}

				const tokenDef = tokenTable[tokenKey];
				if (!tokenDef) {
					continue;
				}

				tokenSet.add(tokenKey);

				const resolved = resolveWhat(
					tokenDef,
					tokenTable,
					tokenSet,
					localTokenCache,
				);
				pushAll(out, resolved);

				if (cacheRef) {
					cacheRef[tokenKey] = resolved;
				}

				tokenSet.delete(tokenKey);
			}
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

			const config = merge(
				userTweakFn,
				internalTweakFn,
			)() as Tweak.Type<TContract>;

			// Global token table with overrides
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

			// Rebind base token cache to include global overrides
			baseTokenTable = tokenTable;
			baseResolvedTokenCache = Object.create(null);

			const cache = Object.create(null) as Record<
				TSlot[number],
				CoolSlot.Fn<TContract>
			>;
			const resultCache = new Map<string, string>();

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

						const localConfig: Tweak.Type<TContract> | undefined =
							local
								? {
										variant: local.variant,
										slot: local.slot,
										override: local.override,
										token: local.token,
									}
								: undefined;

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
						} as Variant.Required<TContract>;
						if (localConfig?.variant) {
							for (const k in localConfig.variant) {
								const v = (
									localConfig.variant as Variant.Optional<TContract>
								)[k];
								if (v !== undefined) {
									(localEffective as any)[k] = v;
								}
							}
						}

						// Local token overrides without copying base table: use overlay proto
						let activeTokens = tokenTable as Record<
							string,
							What.Any<
								Contract.Type<
									Token.Type,
									CoolSlot.Type,
									Variant.Type
								>
							>
						>;
						let localResolvedCache:
							| Record<string, ClassName[]>
							| undefined;

						if (
							localConfig?.token &&
							Object.keys(localConfig.token).length > 0
						) {
							const overlay = Object.create(
								tokenTable,
							) as typeof tokenTable;
							for (const [k, v] of Object.entries(
								localConfig.token,
							)) {
								overlay[k] = v as What.Any<
									Contract.Type<
										TToken,
										CoolSlot.Type,
										Variant.Type
									>
								>;
							}
							activeTokens = overlay;
							localResolvedCache = Object.create(null) as Record<
								string,
								ClassName[]
							>;
						}

						// Pre-read per-slot extras
						const localSlotWhat =
							localConfig?.slot?.[
								slotName as keyof typeof localConfig.slot
							];
						const configSlotWhat =
							config.slot?.[slotName as keyof typeof config.slot];
						const localOverrideWhat =
							localConfig?.override?.[
								slotName as keyof typeof localConfig.override
							];
						const configOverrideWhat =
							config.override?.[
								slotName as keyof typeof config.override
							];

						const slotRules = rulesBySlot[slotKeyStr] ?? [];
						const len = slotRules.length;

						// Fast bail: nothing contributes at all
						if (
							len === 0 &&
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
						let lastOverrideIdx = -1;
						let anyMatch = false;
						const matches: boolean[] = new Array(len);
						for (let i = 0; i < len; i++) {
							const m = slotRules[i]!.predicate(localEffective);
							matches[i] = m;
							if (m) {
								anyMatch = true;
								if (slotRules[i]!.override) {
									lastOverrideIdx = i;
								}
							}
						}

						let acc: ClassName[] = [];

						// If at least one rule matches, accumulate from last matched override
						if (anyMatch) {
							const start =
								lastOverrideIdx >= 0 ? lastOverrideIdx : 0;

							const sharedTokenSet = new Set<string>();

							for (let i = start; i < len; i++) {
								if (!matches[i]) {
									continue;
								}
								const entry = slotRules[i]!;
								pushAll(
									acc,
									resolveWhat(
										entry.what,
										activeTokens,
										sharedTokenSet,
										localResolvedCache,
									),
								);
							}
						}

						// Append slot configurations
						if (localSlotWhat) {
							const sharedTokenSet = new Set<string>();
							pushAll(
								acc,
								resolveWhat(
									localSlotWhat as What.Any<
										Contract.Type<
											Token.Type,
											CoolSlot.Type,
											Variant.Type
										>
									>,
									activeTokens,
									sharedTokenSet,
									localResolvedCache,
								),
							);
						}
						if (configSlotWhat) {
							const sharedTokenSet = new Set<string>();
							pushAll(
								acc,
								resolveWhat(
									configSlotWhat as What.Any<
										Contract.Type<
											Token.Type,
											CoolSlot.Type,
											Variant.Type
										>
									>,
									activeTokens,
									sharedTokenSet,
									localResolvedCache,
								),
							);
						}

						// Apply overrides (clear and replace)
						if (localOverrideWhat) {
							acc = [];
							const sharedTokenSet = new Set<string>();
							pushAll(
								acc,
								resolveWhat(
									localOverrideWhat as What.Any<
										Contract.Type<
											Token.Type,
											CoolSlot.Type,
											Variant.Type
										>
									>,
									activeTokens,
									sharedTokenSet,
									localResolvedCache,
								),
							);
						}
						if (configOverrideWhat) {
							acc = [];
							const sharedTokenSet = new Set<string>();
							pushAll(
								acc,
								resolveWhat(
									configOverrideWhat as What.Any<
										Contract.Type<
											Token.Type,
											CoolSlot.Type,
											Variant.Type
										>
									>,
									activeTokens,
									sharedTokenSet,
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
