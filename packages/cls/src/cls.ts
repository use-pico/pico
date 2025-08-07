import { tvc } from "./tvc";
import type {
	ClassName,
	Cls,
	Contract,
	CreateConfig,
	Definition,
	ResolvedSlotConfig,
	ResolvedTokenDefinition,
	Slot,
	SlotsOverrideConfig,
	SlotsProxy,
	TokenSchema,
	VariantRecord,
} from "./types";
import { proxyOf } from "./utils/proxyOf";

export function cls<const TContract extends Contract<any, any, any>>(
	contract: TContract,
	definition: Definition<TContract>,
): Cls<TContract> {
	const proxy = proxyOf();
	const resolvedDefinition = definition;

	// Create function that returns slots directly
	const createFn = (config: CreateConfig<TContract>) => {
		// Extract configuration
		const variant = config.tokens;
		const variantsOverride = config.variants || {};
		const slotsOverride = (config.slots || {}) as SlotsOverrideConfig;

		// Handle defaults for variants
		const defaults = resolvedDefinition.defaults;

		// Merge all variants immediately
		const finalVariants = {
			...defaults,
			...variantsOverride,
		};

		// Helper function to resolve token classes
		const resolveTokenClasses = (
			tokenReferences: string[],
			targetClasses: ClassName[],
		): void => {
			if (!resolvedDefinition.tokens || !variant) return;

			const tokenDefinition =
				resolvedDefinition.tokens as ResolvedTokenDefinition;

			const variantTokens = tokenDefinition[variant as string];
			if (!variantTokens) return;

			for (const tokenReference of tokenReferences) {
				const [tokenGroup, tokenValue] = tokenReference.split(".");

				if (tokenGroup && tokenValue) {
					const groupTokens = variantTokens[tokenGroup];
					if (groupTokens?.[tokenValue]) {
						const tokenClasses = groupTokens[tokenValue];
						targetClasses.push(...tokenClasses);
					}
				}
			}
		};

		// Helper function to generate classes for a specific slot
		const generateSlotClasses = (slotName: string): string => {
			const classes: ClassName[] = [];
			const slotConfig = (resolvedDefinition.slot as ResolvedSlotConfig)[
				slotName
			];

			if (!slotConfig) return "";

			// Add base slot classes
			if (slotConfig.class) {
				classes.push(...slotConfig.class);
			}

			// Add token classes from slot configuration
			if (slotConfig.token) {
				resolveTokenClasses(slotConfig.token, classes);
			}

			// Add variant classes
			if (resolvedDefinition.variant) {
				for (const [variantName, variantConfig] of Object.entries(
					resolvedDefinition.variant as Record<string, any>,
				)) {
					const variantValue = finalVariants[variantName];
					const variantSlotValue =
						variantConfig?.[String(variantValue)]?.[slotName];

					if (variantSlotValue) {
						// Only {class, token} object format supported
						if (variantSlotValue.class) {
							classes.push(...variantSlotValue.class);
						}
						if (variantSlotValue.token) {
							resolveTokenClasses(
								variantSlotValue.token,
								classes,
							);
						}
					}
				}
			}

			// Add slot override classes (applied last for precedence)
			const slotOverride = slotsOverride[slotName];
			if (slotOverride) {
				if (slotOverride.class) {
					classes.push(...slotOverride.class);
				}
				if (slotOverride.token) {
					resolveTokenClasses(slotOverride.token, classes);
				}
			}

			return tvc(classes);
		};

		// Return slots directly
		return {
			slots: new Proxy(
				{},
				{
					get: (_, slotName: string) => {
						return generateSlotClasses(slotName);
					},
				},
			) as SlotsProxy<TContract>,
		};
	};

	return {
		create: createFn,
		use<
			const TSlot extends Slot,
			const TVariant extends VariantRecord,
			const TTokens extends TokenSchema,
		>(
			childContract: Contract<TSlot, TVariant, TTokens>,
			childDefinition: Definition<
				Contract<TSlot, TVariant, TTokens, TContract>
			>,
		): Cls<Contract<TSlot, TVariant, TTokens, TContract>> {
			const childProps = {
				contract: childContract,
				definition: childDefinition,
			};

			const inheritedContract: Contract<
				TSlot,
				TVariant,
				TTokens,
				TContract
			> = {
				...childProps.contract,
				use: contract, // Set up the inheritance chain
			};
			return cls(inheritedContract, childProps.definition);
		},
		contract: proxy,
	};
}
