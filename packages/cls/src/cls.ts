import { classes } from "./classes";
import { match } from "./match";
import { merge } from "./merge";
import { tvc } from "./tvc";
import type {
	Cls,
	ClsSlotFn,
	Contract,
	Definition,
	RuleDefinition,
	SlotContract,
	TokenContract,
	VariantContract,
	What,
} from "./types";

// TODO Vibe variable extraction (create PicoCls with tokens)

// Local types for internal use (not exposed)
type InternalContractIndex = {
	contract: Contract<any, any, any>;
	definition: Definition<any>;
};

type InternalTokenIndex = Record<string, string[]>;

type InternalVariantValues = Record<string, unknown>;

type InternalSlotWhat = {
	class?: unknown;
	token?: string[];
};

type InternalCreateConfig = {
	variant?: Record<string, unknown>;
	slot?: Record<string, InternalSlotWhat>;
	override?: Record<string, InternalSlotWhat>;
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
	const contractIndex = (
		contract: Contract<any, any, any>,
		definition: Definition<any>,
	): InternalContractIndex[] => {
		const index: InternalContractIndex[] = [];

		let $contract: Contract<any, any, any> | undefined = contract;
		let $definition: Definition<any> | undefined = definition;

		while ($contract && $definition) {
			index.push({
				contract: $contract,
				definition: $definition,
			});

			// IMPORTANT:
			// "~definition" is stored on the CHILD contract as a reference to the PARENT'S definition.
			// Therefore, when walking the chain upwards, we must read the next definition
			// from the CURRENT contract before advancing $contract to its parent.
			const nextContract = $contract["~use"] as
				| Contract<any, any, any>
				| undefined;
			const nextDefinition = $contract["~definition"] as
				| Definition<any>
				| undefined;

			$contract = nextContract;
			$definition = nextDefinition;
		}

		return index.reverse();
	};

	const tokenIndex = (
		contractIndex: InternalContractIndex[],
	): InternalTokenIndex => {
		const index: InternalTokenIndex = {};

		for (const { contract } of contractIndex) {
			for (const [group, values] of Object.entries(contract.tokens) as [
				string,
				readonly string[],
			][]) {
				for (const value of values) {
					index[`${group}.${value}`] = [];
				}
			}
		}

		return index;
	};

	const buildTokenIndex = (
		tokenIndex: InternalTokenIndex,
		contractIndex: InternalContractIndex[],
	): InternalTokenIndex => {
		// For each layer, decide REPLACE vs APPEND semantics based on whether
		// the layer's contract explicitly declares the token variant.
		for (const { contract, definition } of contractIndex) {
			const declaredGroups: Record<string, Set<string>> = {};
			for (const [group, values] of Object.entries(contract.tokens) as [
				string,
				readonly string[],
			][]) {
				declaredGroups[group] = new Set(values as string[]);
			}

			for (const [group, values] of Object.entries(
				(definition.token ?? {}) as Record<
					string,
					Record<string, string[]>
				>,
			)) {
				for (const [variant, classes] of Object.entries(values)) {
					const key = `${group}.${variant}`;
					const groupDeclared = declaredGroups[group];
					if (groupDeclared?.has(variant)) {
						// REPLACE
						tokenIndex[key] = classes;
					} else {
						// APPEND
						const prev = tokenIndex[key] ?? [];
						tokenIndex[key] = prev.concat(classes);
					}
				}
			}
		}

		return tokenIndex;
	};

	const applyCreateTokenOverrides = (
		tokenIndex: InternalTokenIndex,
		overrides: Record<string, Record<string, string[]>> | undefined,
	): InternalTokenIndex => {
		if (!overrides) {
			return tokenIndex;
		}
		for (const [group, variants] of Object.entries(overrides)) {
			for (const [variant, classes] of Object.entries(variants ?? {})) {
				const key = `${group}.${variant}`;
				tokenIndex[key] = Array.isArray(classes) ? classes : [];
			}
		}
		return tokenIndex;
	};

	const buildMergedDefaults = (
		contractIndex: InternalContractIndex[],
	): InternalVariantValues => {
		const result: InternalVariantValues = {};
		for (const { definition } of contractIndex) {
			Object.assign(result, definition.defaults ?? {});
		}
		return result;
	};

	const buildMergedRules = (
		contractIndex: InternalContractIndex[],
	): RuleDefinition<any>[] => {
		const rules: RuleDefinition<any>[] = [];
		for (const { definition } of contractIndex) {
			const steps = definition.rules({
				root: (slot, override = false) =>
					match(undefined, slot, override),
				rule: match,
				classes,
			});
			rules.push(...steps);
		}
		return rules;
	};

	const collectAllSlots = (
		contractIndex: InternalContractIndex[],
	): Set<string> => {
		const slots = new Set<string>();
		for (const { contract } of contractIndex) {
			for (const slot of contract.slot as string[]) {
				slots.add(slot);
			}
		}
		return slots;
	};

	const createSlotFunction = (
		slotName: string,
		baseConfig: InternalCreateConfig,
		baseDefaults: InternalVariantValues,
		baseRules: RuleDefinition<any>[],
		baseTokenIndex: InternalTokenIndex,
	): ClsSlotFn<TContract> => {
		return (variantOverrides) => {
			// Merge base defaults with create config variants and provided variant overrides
			const effectiveVariant: Record<string, unknown> = {
				...baseDefaults,
				...baseConfig?.variant,
				...variantOverrides,
			};

			const resolveTokensToClasses = (
				tokens: string[] | undefined,
			): string[] => {
				if (!tokens || tokens.length === 0) {
					return [];
				}
				const out: string[] = [];
				for (const token of tokens) {
					const classes = baseTokenIndex[token] ?? [];
					if (classes?.length) {
						out.push(...classes);
					}
				}
				return out;
			};

			const applyWhat = (
				acc: string[],
				what: InternalSlotWhat | undefined,
			): string[] => {
				if (!what) return acc;
				if (what.class) {
					if (Array.isArray(what.class)) {
						acc.push(...(what.class as string[]));
					} else {
						acc.push(what.class as string);
					}
				}
				if (what.token) {
					acc.push(...resolveTokensToClasses(what.token));
				}
				return acc;
			};

			const matches = (
				match: Record<string, unknown> | undefined,
			): boolean => {
				if (!match) return true;
				for (const [key, value] of Object.entries(match)) {
					if (effectiveVariant[key] !== value) {
						return false;
					}
				}
				return true;
			};

			let classes: string[] = [];

			// Apply rules based on effective variants
			for (const rule of baseRules) {
				if (!matches(rule.match)) {
					continue;
				}
				const slotMap = (rule.slot ?? {}) as Record<string, What<any>>;
				const what = slotMap[slotName];
				if (!what) {
					continue;
				}
				if (rule.override === true) {
					classes = [];
				}
				classes = applyWhat(classes, what as InternalSlotWhat);
			}

			// Apply base config slot overrides
			const createSlot = baseConfig?.slot?.[slotName];
			if (createSlot) {
				classes = applyWhat(classes, createSlot);
			}

			// Apply base config override (hard override)
			const createOverride = baseConfig?.override?.[slotName];
			if (createOverride) {
				classes = [];
				classes = applyWhat(classes, createOverride);
			}

			return tvc(classes);
		};
	};

	return {
		create(userConfig, internalConfig) {
			const _config = merge(
				userConfig,
				internalConfig,
			) as InternalCreateConfig;

			const $contractIndex = contractIndex(contract, definition);
			const $tokenIndex = tokenIndex($contractIndex);
			const _resolvedTokenIndex = buildTokenIndex(
				$tokenIndex,
				$contractIndex,
			);
			applyCreateTokenOverrides(_resolvedTokenIndex, _config?.token);
			const _defaults = buildMergedDefaults($contractIndex);
			const _rules = buildMergedRules($contractIndex);
			const $slots = collectAllSlots($contractIndex);

			const cache: Record<string | symbol, ClsSlotFn<TContract>> = {};

			const handler: ProxyHandler<Record<string, ClsSlotFn<TContract>>> =
				{
					get(_, prop) {
						if (prop in cache) {
							return cache[prop];
						}
						const slotName = prop as string;
						if ($slots.has(slotName)) {
							const slotFn = createSlotFunction(
								slotName,
								_config,
								_defaults,
								_rules,
								_resolvedTokenIndex,
							);
							cache[prop] = slotFn;
							return cache[prop];
						}
						return undefined as unknown as ClsSlotFn<TContract>;
					},
					ownKeys() {
						return Array.from($slots);
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
			/**
			 * Nothing hard, we'll carry contract we're extending from
			 */
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
