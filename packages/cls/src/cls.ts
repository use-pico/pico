import type { ComponentProps } from "./component";
import { merge } from "./merge";
// no-op imports removed
import { tvc } from "./tvc";
import type {
	Cls,
	Contract,
	Definition,
	SlotContract,
	TokenContract,
	VariantContract,
} from "./types";
import type { VariantProps } from "./variant";

// TODO Vibe variable extraction (create PicoCls with tokens)
// TODO Change slot from "string" to "callback" with "variant" as input - last override
// TODO Iconsistant calls 	const { slots } = tva.create(cls); vs. const classes = tva(cls);
// TODO Add default prop in cls definition for default "slot" which will be appended to "rule"?

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
	type ContractIndex = {
		contract: Contract<any, any, any>;
		definition: Definition<any>;
	};
	type TokenIndex = Record<string, string[]>;
	type VariantValues = Record<string, unknown>;

	const contractIndex = (
		contract: Contract<any, any, any>,
		definition: Definition<any>,
	) => {
		const index: ContractIndex[] = [];

		let $contract: any = contract;
		let $definition: any = definition;

		while ($contract && $definition) {
			index.push({
				contract: $contract,
				definition: $definition,
			});

			// IMPORTANT:
			// "~definition" is stored on the CHILD contract as a reference to the PARENT'S definition.
			// Therefore, when walking the chain upwards, we must read the next definition
			// from the CURRENT contract before advancing $contract to its parent.
			const nextContract = $contract["~use"];
			const nextDefinition = $contract["~definition"];

			$contract = nextContract;
			$definition = nextDefinition;
		}

		return index.reverse();
	};

	const tokenIndex = (contractIndex: ContractIndex[]) => {
		const index: TokenIndex = {};

		for (const { contract } of contractIndex) {
			for (const [group, values] of Object.entries(contract.tokens) as [
				string,
				string[],
			][]) {
				for (const value of values) {
					index[`${group}.${value}`] = [];
				}
			}
		}

		return index;
	};

	const buildTokenIndex = (
		tokenIndex: TokenIndex,
		contractIndex: ContractIndex[],
	) => {
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
		tokenIndex: TokenIndex,
		overrides: Record<string, Record<string, string[]>> | undefined,
	) => {
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

	const buildMergedDefaults = (contractIndex: ContractIndex[]) => {
		const result: VariantValues = {};
		for (const { definition } of contractIndex) {
			Object.assign(result, definition.defaults ?? {});
		}
		return result;
	};

	const buildMergedRules = (contractIndex: ContractIndex[]) => {
		const rules: any[] = [];
		for (const { definition } of contractIndex) {
			if (Array.isArray(definition.rule)) {
				rules.push(...definition.rule);
			}
		}
		return rules;
	};

	const collectAllSlots = (contractIndex: ContractIndex[]) => {
		const slots = new Set<string>();
		for (const { contract } of contractIndex) {
			for (const slot of contract.slot as string[]) {
				slots.add(slot);
			}
		}
		return slots;
	};

	return {
		create(userConfig, internalConfig) {
			const _config = merge(userConfig, internalConfig);

			const $contractIndex = contractIndex(contract, definition);
			const $tokenIndex = tokenIndex($contractIndex);
			const _resolvedTokenIndex = buildTokenIndex(
				$tokenIndex,
				$contractIndex,
			);
			applyCreateTokenOverrides(
				_resolvedTokenIndex,
				(_config as any)?.token as
					| Record<string, Record<string, string[]>>
					| undefined,
			);
			const _defaults = buildMergedDefaults($contractIndex);
			const _rules = buildMergedRules($contractIndex);
			const $slots = collectAllSlots($contractIndex);

			const effectiveVariant: Record<string, unknown> = {
				..._defaults,
				...((_config as any)?.variant ?? {}),
			};

			const cache: Record<string | symbol, string> = {};

			const resolveTokensToClasses = (tokens: string[] | undefined) => {
				if (!tokens || tokens.length === 0) {
					return [] as string[];
				}
				const out: string[] = [];
				for (const token of tokens) {
					const classes = _resolvedTokenIndex[token] ?? [];
					if (classes?.length) {
						out.push(...classes);
					}
				}
				return out;
			};

			const applyWhat = (
				acc: string[],
				what:
					| {
							class?: unknown;
							token?: string[];
					  }
					| undefined,
			) => {
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

			const matches = (match: Record<string, unknown> | undefined) => {
				if (!match) return true;
				for (const [key, value] of Object.entries(match)) {
					if (effectiveVariant[key] !== value) {
						return false;
					}
				}
				return true;
			};

			const handler: ProxyHandler<Record<string, string>> = {
				get(_, prop) {
					if (prop in cache) {
						return cache[prop];
					}
					const slotName = prop as string;
					if ($slots.has(slotName)) {
						let classes: string[] = [];
						for (const rule of _rules as any[]) {
							if (!matches(rule.match)) {
								continue;
							}
							const slotMap = (rule.slot ?? {}) as Record<
								string,
								any
							>;
							const what = slotMap[slotName];
							if (!what) {
								continue;
							}
							if (rule.override === true) {
								classes = [];
							}
							classes = applyWhat(classes, what);
						}

						const createSlot = (_config as any)?.slot?.[slotName] as
							| {
									class?: unknown;
									token?: string[];
							  }
							| undefined;
						if (createSlot) {
							classes = applyWhat(classes, createSlot);
						}

						const createOverride = (_config as any)?.override?.[
							slotName
						] as
							| {
									class?: unknown;
									token?: string[];
							  }
							| undefined;
						if (createOverride) {
							classes = [];
							classes = applyWhat(classes, createOverride);
						}

						cache[prop] = tvc(classes);
						return cache[prop];
					}
					return undefined as unknown as string;
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

			return new Proxy<Record<string, string>>({} as any, handler);
		},
		extend(childContract, childDefinition) {
			/**
			 * Nothing hard, we'll carry contract we're extending from
			 */
			childContract["~use"] = contract;
			childContract["~definition"] = definition;

			return cls(childContract as any, childDefinition as any);
		},
		component<const TSlots extends SlotContract>(
			props: ComponentProps<TSlots>,
		) {
			return this.extend(
				{
					tokens: {},
					slot: props.slots,
					variant: {},
				} as Contract<{}, TSlots, {}, any>,
				{
					token: {},
					rule: [
						{
							slot: props.slot,
						},
					],
					defaults: {},
				} as Definition<Contract<{}, TSlots, {}, any>>,
			) as any;
		},
		variant<
			const TSlots extends SlotContract,
			const TVariants extends VariantContract,
		>(props: VariantProps<TSlots, TVariants>) {
			return this.extend(
				{
					tokens: {},
					slot: props.slots,
					variant: props.variants,
				} as Contract<{}, TSlots, TVariants, any>,
				{
					token: {},
					rule: props.rule,
					defaults: props.defaults,
				} as Definition<Contract<{}, TSlots, TVariants, any>>,
			) as any;
		},
		use(sub) {
			return sub as unknown as Cls<TContract>;
		},
		contract,
	};
}
