import { tvc } from "./tvc";
import type {
	Cls,
	Contract,
	CreateConfig,
	Definition,
	SlotContract,
	TokenContract,
	VariantContract,
} from "./types";

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
	// Helper function to build complete token index with inheritance and overrides
	const buildTokenIndex = (
		contract: Contract<any, any, any>,
		definition: Definition<any>,
		tokenOverrides: Record<string, Record<string, any>> = {},
	): Record<string, string[]> => {
		// Step 1: Build initial index from contract tokens
		const tokenIndex: Record<string, string[]> = {};

		// Helper function to expand contract tokens into full index
		const expandContractTokens = (
			contractTokens: Record<string, readonly string[]>,
		) => {
			for (const [tokenGroup, variants] of Object.entries(
				contractTokens,
			)) {
				for (const variant of variants) {
					const fullKey = `${tokenGroup}.${variant}`;
					tokenIndex[fullKey] = [];
				}
			}
		};

		// Step 2: Expand all contract tokens (inheritance is already handled in extend method)
		expandContractTokens(contract.tokens);

		// Step 3: Apply definition values to the index (inheritance is already merged)
		const applyDefinitionValues = (def: Definition<any>) => {
			if (def.token) {
				for (const [tokenGroup, groupVariants] of Object.entries(
					def.token,
				)) {
					for (const [variant, classes] of Object.entries(
						groupVariants,
					)) {
						const fullKey = `${tokenGroup}.${variant}`;
						if (tokenIndex[fullKey]) {
							// Convert ClassName to string[]
							const classArray = Array.isArray(classes)
								? classes
								: [
										classes,
									];
							tokenIndex[fullKey] = classArray.filter(
								Boolean,
							) as string[];
						}
					}
				}
			}
		};

		// Step 4: Apply token overrides (highest priority)
		const applyTokenOverrides = (
			overrides: Record<string, Record<string, any>>,
		) => {
			for (const [tokenGroup, groupVariants] of Object.entries(
				overrides,
			)) {
				for (const [variant, classes] of Object.entries(
					groupVariants,
				)) {
					const fullKey = `${tokenGroup}.${variant}`;
					if (tokenIndex[fullKey]) {
						// Convert ClassName to string[]
						const classArray = Array.isArray(classes)
							? classes
							: [
									classes,
								];
						tokenIndex[fullKey] = classArray.filter(
							Boolean,
						) as string[];
					}
				}
			}
		};

		// Execute the steps in order
		applyDefinitionValues(definition);
		applyTokenOverrides(tokenOverrides);

		return tokenIndex;
	};

	// Helper function to resolve token classes using the token index
	const resolveTokenClasses = (
		tokenReferences: string[],
		targetClasses: string[],
		tokenIndex: Record<string, string[]>,
	): void => {
		for (const tokenReference of tokenReferences) {
			const classes = tokenIndex[tokenReference];
			if (classes) {
				targetClasses.push(...classes);
			}
		}
	};

	// Helper function to generate classes for a specific slot
	const generateSlotClasses = (
		slotName: string,
		finalVariants: Record<string, any>,
		slotOverrides: Record<string, any> = {},
		hardOverrides: Record<string, any> = {},
		tokenOverrides: Record<string, Record<string, any>> = {},
	): string => {
		// Build the complete token index with inheritance and overrides
		const tokenIndex = buildTokenIndex(
			contract,
			definition,
			tokenOverrides,
		);

		const classes: string[] = [];

		// Apply rules in order
		if (definition.rule) {
			for (const rule of definition.rule) {
				// Check if this rule applies to the current slot
				const slotConfig = (rule.slot as Record<string, any>)[slotName];
				if (!slotConfig) continue;

				// Check if variant conditions match
				if (rule.match) {
					let shouldApply = true;
					for (const [variantName, expectedValue] of Object.entries(
						rule.match,
					)) {
						const actualValue = finalVariants[variantName];
						if (actualValue !== expectedValue) {
							shouldApply = false;
							break;
						}
					}
					if (!shouldApply) continue;
				}

				// If override is true, clear previous classes
				if (rule.override) {
					classes.length = 0;
				}

				// Apply the rule
				if (slotConfig.class) {
					classes.push(...slotConfig.class);
				}
				if (slotConfig.token) {
					resolveTokenClasses(slotConfig.token, classes, tokenIndex);
				}
			}
		}

		// Apply slot overrides (append mode)
		const slotOverride = slotOverrides[slotName];
		if (slotOverride) {
			if (slotOverride.class) {
				classes.push(...slotOverride.class);
			}
			if (slotOverride.token) {
				resolveTokenClasses(slotOverride.token, classes, tokenIndex);
			}
		}

		// Apply hard overrides (replace mode)
		const hardOverride = hardOverrides[slotName];
		if (hardOverride) {
			classes.length = 0; // Clear all previous classes
			if (hardOverride.class) {
				classes.push(...hardOverride.class);
			}
			if (hardOverride.token) {
				resolveTokenClasses(hardOverride.token, classes, tokenIndex);
			}
		}

		return tvc(classes);
	};

	// Create function that returns slots directly
	const createFn = (config: CreateConfig<TContract>) => {
		// Extract configuration
		const variantOverrides = config.variant || {};
		const slotsOverride = config.slot || {};
		const hardOverrides = config.override || {};
		const tokenOverrides = config.token || {};

		// Handle defaults for variants
		const defaults = definition.defaults;

		// Merge all variants immediately
		const finalVariants = {
			...defaults,
			...variantOverrides,
		};

		// Create a proxy that generates slots on-demand
		const result = new Proxy({} as Record<string, string>, {
			get(target, prop) {
				const slotName = prop as string;

				// Check if the slot exists in the contract
				if (!contract.slot.includes(slotName)) {
					return undefined;
				}

				// If the slot is already generated, return it
				if (target[slotName] !== undefined) {
					return target[slotName];
				}

				// Generate the slot classes on-demand
				const slotClasses = generateSlotClasses(
					slotName,
					finalVariants,
					slotsOverride,
					hardOverrides,
					tokenOverrides,
				);

				// Cache the result
				target[slotName] = slotClasses;

				return slotClasses;
			},
		});

		return result;
	};

	return {
		create: createFn,
		extend(childContract, childDefinition) {
			// Helper function to merge token definitions with inheritance
			const mergeTokenDefinitions = (
				parentTokens: Record<string, Record<string, string[]>>,
				childTokens: Record<string, Record<string, string[]>>,
			): Record<string, Record<string, string[]>> => {
				const merged = {
					...parentTokens,
				};

				for (const [groupName, groupVariants] of Object.entries(
					childTokens,
				)) {
					merged[groupName] = merged[groupName]
						? {
								...merged[groupName],
								...groupVariants,
							}
						: {
								...groupVariants,
							};
				}

				return merged;
			};

			// Helper function to merge contract tokens
			const mergeContractTokens = (
				parentTokens: Record<string, readonly string[]>,
				childTokens: Record<string, readonly string[]>,
			): Record<string, readonly string[]> => {
				const merged = {
					...parentTokens,
				};

				for (const [groupName, variants] of Object.entries(
					childTokens,
				)) {
					merged[groupName] = merged[groupName]
						? ([
								...merged[groupName],
								...variants,
							] as readonly string[])
						: variants;
				}

				return merged;
			};

			// Merge parent and child token definitions with proper inheritance
			const mergedTokenDefinition = mergeTokenDefinitions(
				(definition.token || {}) as Record<
					string,
					Record<string, string[]>
				>,
				(childDefinition.token || {}) as Record<
					string,
					Record<string, string[]>
				>,
			);

			// Merge parent and child contract tokens
			const mergedContractTokens = mergeContractTokens(
				contract.tokens as Record<string, readonly string[]>,
				childContract.tokens as Record<string, readonly string[]>,
			);

			// Merge parent and child slots
			const mergedSlots = [
				...(contract.slot || []),
				...(childContract.slot || []),
			];

			// Create merged definition and contract
			const mergedDefinition = {
				token: mergedTokenDefinition,
				rule: [
					...(definition.rule || []),
					...(childDefinition.rule || []),
				],
				defaults: {
					...definition.defaults,
					...childDefinition.defaults,
				},
			};

			const mergedContract = {
				...childContract,
				tokens: mergedContractTokens,
				slot: mergedSlots,
				"~use": contract,
			};

			return cls(mergedContract as any, mergedDefinition as any);
		},
		use(sub) {
			return sub as unknown as Cls<TContract>;
		},
		contract,
	};
}
