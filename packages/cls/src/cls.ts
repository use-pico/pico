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
	};
}
