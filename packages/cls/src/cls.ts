import { match } from "./match";
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
	token?: Record<string, Record<string, string[]>>;
};

/**
 * Creates a cls instance for component styling with tokens, slots, and variants.
 *
 * cls is the main function for creating type-safe, composable styling systems.
 * It combines a contract (defining structure) with a definition (providing values)
 * to create a cls instance that can generate CSS classes based on variants.
 *
 * @template TTokenContract - Token definitions for design tokens
 * @template TSlotContract - Available slots for the component
 * @template TVariantContract - Available variants for the component
 * @template TContract - The complete contract type
 *
 * @param contract - Defines the structure: tokens, slots, and variants
 * @param definition - Provides the styling values: token classes, rules, and defaults
 *
 * @returns A cls instance with create(), extend(), use(), and contract properties
 *
 * @example
 * ```typescript
 * // Basic button with variants
 * const Button = cls(
 *   {
 *     tokens: {
 *       "color.text": ["default", "primary"],
 *       "color.bg": ["default", "primary"]
 *     },
 *     slot: ["root", "label"],
 *     variant: {
 *       size: ["sm", "md", "lg"],
 *       variant: ["default", "primary"]
 *     }
 *   },
 *   {
 *     token: {
 *       "color.text": {
 *         default: ["text-gray-900"],
 *         primary: ["text-white"]
 *       },
 *       "color.bg": {
 *         default: ["bg-gray-100"],
 *         primary: ["bg-blue-600"]
 *       }
 *     },
 *     rules: ({ root, rule }) => [
 *       root({
 *         root: {
 *           class: ["inline-flex", "items-center"],
 *           token: ["color.text.default", "color.bg.default"]
 *         },
 *         label: {
 *           class: ["font-medium"]
 *         }
 *       }),
 *       rule(
 *         { size: "lg" },
 *         {
 *           root: {
 *             class: ["px-6", "py-3"]
 *           }
 *         }
 *       ),
 *       rule(
 *         { variant: "primary" },
 *         {
 *           root: {
 *             token: ["color.text.primary", "color.bg.primary"]
 *           }
 *         }
 *       )
 *     ],
 *     defaults: {
 *       size: "md",
 *       variant: "default"
 *     }
 *   }
 * );
 *
 * // Usage
 * const classes = Button.create({ variant: "primary", size: "lg" });
 * // classes.root() -> "inline-flex items-center text-white bg-blue-600 px-6 py-3"
 * // classes.label() -> "font-medium"
 * ```
 *
 * @example
 * ```typescript
 * // Simple component without tokens
 * const Card = cls(
 *   {
 *     tokens: {},
 *     slot: ["root", "header", "content"],
 *     variant: {
 *       padding: ["sm", "md", "lg"]
 *     }
 *   },
 *   {
 *     token: {},
 *     rules: ({ root, rule }) => [
 *       root({
 *         root: { class: ["bg-white", "rounded-lg", "shadow"] },
 *         header: { class: ["font-semibold"] },
 *         content: { class: ["text-gray-600"] }
 *       }),
 *       rule(
 *         { padding: "lg" },
 *         {
 *           root: { class: ["p-6"] },
 *           header: { class: ["mb-4"] }
 *         }
 *       )
 *     ],
 *     defaults: {
 *       padding: "md"
 *     }
 *   }
 * );
 * ```
 */
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
>(contract: TContract, definition: Definition<TContract>): Cls<TContract> {
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
			const steps = d.rules({
				root: (slot, override = false) =>
					match(undefined, slot, override),
				rule: match,
				what: what(),
			});
			out.push(...steps);
		}
		return out;
	})();

	// Build base token index table (REPLACE/APPEND semantics handled per layer)
	const baseTokenIndex: InternalTokenIndex = (() => {
		const index: InternalTokenIndex = {};

		// Seed all known keys so unresolved references still map to []
		for (const { contract: c } of layers) {
			for (const [group, variants] of Object.entries(c.tokens) as [
				string,
				readonly string[],
			][]) {
				for (const v of variants) index[`${group}.${v}`] = [];
			}
		}

		for (const { contract: c, definition: d } of layers) {
			const declared: Record<string, Set<string>> = {};
			for (const [group, variants] of Object.entries(c.tokens) as [
				string,
				readonly string[],
			][]) {
				declared[group] = new Set(variants as string[]);
			}

			for (const [group, values] of Object.entries(
				(d.token ?? {}) as Record<string, Record<string, string[]>>,
			)) {
				for (const [variant, classes] of Object.entries(values)) {
					const key = `${group}.${variant}`;
					if (declared[group]?.has(variant)) {
						// REPLACE when the layer declares this token variant
						index[key] = classes;
					} else {
						// APPEND otherwise
						index[key] = (index[key] ?? []).concat(classes);
					}
				}
			}
		}

		return index;
	})();

	// Helpers shared by slot invocations
	const applyTokenOverrides = (
		target: InternalTokenIndex,
		overrides: Record<string, Record<string, string[]>> | undefined,
	) => {
		if (!overrides) return;
		for (const [group, variants] of Object.entries(overrides)) {
			for (const [variant, values] of Object.entries(variants ?? {})) {
				target[`${group}.${variant}`] = Array.isArray(values)
					? values
					: [];
			}
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
			if (effective[k] !== v) return false;
		}
		return true;
	};

	// Public API
	return {
		create(userConfig, internalConfig) {
			const config = merge(
				userConfig,
				internalConfig,
			) as InternalCreateConfig;

			// Effective variants: defaults <- create.variant
			const effectiveVariant: Record<string, unknown> = {
				...mergedDefaults,
				...(config.variant ?? {}),
			};

			// Build per-create token index (base + create.token)
			const tokenTable: InternalTokenIndex = {
				...baseTokenIndex,
			};
			applyTokenOverrides(tokenTable, config.token);

			const cache: Record<string | symbol, ClsSlotFn<TContract>> = {};
			// Shared result cache across all slots for this create() instance
			const resultCache = new Map<string, string>();
			const computeKey = (
				slot: string,
				call?: Partial<CreateConfig<TContract>>,
			): string => {
				if (call === undefined) return `${slot}|__no_config__`;
				try {
					return `${slot}|${JSON.stringify(call)}`;
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
							const local = call as
								| Partial<CreateConfig<TContract>>
								| undefined;
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
										token: local.token as
											| Record<
													string,
													Record<string, string[]>
											  >
											| undefined,
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
							if (localConfig?.token)
								applyTokenOverrides(
									localTokenTable,
									localConfig.token,
								);

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
		extend(childContract, childDefinition) {
			childContract["~use"] = contract;
			childContract["~definition"] = definition;

			return cls(
				childContract as Contract<any, any, any>,
				childDefinition as Definition<any>,
			);
		},
		use<Sub extends Contract<any, any, any>>(
			sub: Cls<Sub>,
		): Cls<TContract> {
			return sub as unknown as Cls<TContract>;
		},
		contract,
		definition,
	};
}
