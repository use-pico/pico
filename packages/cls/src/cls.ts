import { tvc } from "./tvc";
import type {
	ClassName,
	Cls,
	Contract,
	CreateConfig,
	Definition,
	SlotContract,
	TokenContract,
	VariantContract,
} from "./types";
import { proxyOf } from "./utils/proxyOf";

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
	const proxy = proxyOf();
	const resolvedDefinition = definition;

	// Create function that returns slots directly
	const createFn = (config: CreateConfig<TContract>) => {
		// Extract configuration
		const variant = config.token;
		const variantsOverride = config.variant || {};
		const slotsOverride = config.slot || {};

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
			if (!resolvedDefinition.token) return;

			for (const tokenReference of tokenReferences) {
				const [tokenGroup, tokenVariant] = tokenReference.split(".");
				if (tokenGroup && tokenVariant) {
					const groupTokens = (
						resolvedDefinition.token as Record<
							string,
							Record<string, ClassName[]>
						>
					)[tokenGroup];
					if (groupTokens?.[tokenVariant]) {
						targetClasses.push(...groupTokens[tokenVariant]);
					}
				}
			}
		};

		// Helper function to generate classes for a specific slot
		const generateSlotClasses = (slotName: string): string => {
			const classes: ClassName[] = [];

			// Apply rules in order
			if (resolvedDefinition.rule) {
				for (const rule of resolvedDefinition.rule) {
					// Check if this rule applies to the current slot
					const slotConfig = (rule.slot as Record<string, any>)[
						slotName
					];
					if (!slotConfig) continue;

					// Check if variant conditions match
					if (rule.match) {
						let shouldApply = true;
						for (const [
							variantName,
							expectedValue,
						] of Object.entries(rule.match)) {
							const actualValue = finalVariants[variantName];
							if (actualValue !== expectedValue) {
								shouldApply = false;
								break;
							}
						}
						if (!shouldApply) continue;
					}

					// Apply the rule
					if (slotConfig.class) {
						classes.push(...slotConfig.class);
					}
					if (slotConfig.token) {
						resolveTokenClasses(slotConfig.token, classes);
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
			),
		};
	};

	return {
		create: createFn,
		extend(childContract, childDefinition) {
			const childProps = {
				contract: childContract,
				definition: childDefinition,
			};
			return cls(
				{
					...childProps.contract,
					"~use": contract,
				},
				childProps.definition,
			);
		},
		use(sub) {
			return sub as unknown as Cls<TContract>;
		},
		contract,
	};
}
