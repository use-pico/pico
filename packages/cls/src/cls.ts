import { tvc } from "./tvc";
import type {
	Cls,
	Contract,
	Props,
	Slot,
	TokenSchema,
	VariantRecord,
} from "./types";
import { proxyOf } from "./utils/proxyOf";

export function cls<const TContract extends Contract<any, any, any>>(
	props: Props<TContract>,
): Cls<TContract> {
	const proxy = proxyOf();

	// Extract the definition from props
	const { definition } = props;

	// Create the component function
	const componentFn = (variantOverrides?: any, slotOverrides?: any) => {
		// Merge defaults with overrides
		const finalVariants = {
			...definition.defaults,
			...variantOverrides,
		};

		// Build slot functions
		const slots: Record<string, () => string> = {};

		// Get all slot names from the definition (use type assertion for dynamic access)
		const slotEntries = Object.entries(
			definition.slot as Record<string, any>,
		);

		for (const [slotName, baseClass] of slotEntries) {
			slots[slotName] = () => {
				const classes: string[] = [];

				// Add base slot class
				if (baseClass) {
					if (Array.isArray(baseClass)) {
						classes.push(...baseClass.filter(Boolean));
					} else {
						classes.push(baseClass);
					}
				}

				// Add variant classes
				const variantEntries = Object.entries(
					definition.variant as Record<string, any>,
				);
				for (const [variantName, variantConfig] of variantEntries) {
					const variantValue = finalVariants[variantName];
					if (variantConfig?.[String(variantValue)]) {
						const variantSlotClass =
							variantConfig[String(variantValue)][slotName];
						if (variantSlotClass) {
							if (Array.isArray(variantSlotClass)) {
								classes.push(
									...variantSlotClass.filter(Boolean),
								);
							} else {
								classes.push(variantSlotClass);
							}
						}
					}
				}

				// Apply match rules
				if (definition.match) {
					for (const rule of definition.match) {
						if (rule.if) {
							const matches = Object.entries(rule.if).every(
								([key, value]) => finalVariants[key] === value,
							);
							const ruleSlots = rule.do as
								| Record<string, any>
								| undefined;
							if (matches && ruleSlots?.[slotName]) {
								const matchClass = ruleSlots[slotName];
								if (Array.isArray(matchClass)) {
									classes.push(...matchClass.filter(Boolean));
								} else if (matchClass) {
									classes.push(matchClass);
								}
							}
						}
					}
				}

				// Add slot overrides
				if (slotOverrides?.[slotName]) {
					const override = slotOverrides[slotName];
					if (Array.isArray(override)) {
						classes.push(...override.filter(Boolean));
					} else if (override) {
						classes.push(override);
					}
				}

				// Filter out empty/falsy classes and merge with tailwind-merge
				const validClasses = classes.filter((cls) => cls && cls !== "");
				return tvc(...validClasses);
			};
		}

		return {
			slots,
		};
	};

	return {
		create: componentFn,
		use<
			const TSlot extends Slot,
			const TVariant extends VariantRecord,
			const TTokens extends TokenSchema,
		>(
			childProps: Props<Contract<TSlot, TVariant, TTokens, TContract>>,
		): Cls<Contract<TSlot, TVariant, TTokens, TContract>> {
			return cls(childProps);
		},
		contract: proxy,
	};
}
