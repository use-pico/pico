import { tvc } from "./tvc";
import type {
	AllTokenGroups,
	Cls,
	Contract,
	Props,
	Slot,
	TokenObject,
	TokenSchema,
	VariantRecord,
} from "./types";
import { proxyOf } from "./utils/proxyOf";

export function cls<const TContract extends Contract<any, any, any>>(
	props: Props<TContract>,
): Cls<TContract> {
	const proxy = proxyOf();
	const { contract, definition } = props;

	// Create the component function that accepts a group
	const createFn = (group: AllTokenGroups<TContract>) => {
		// First, get a preliminary definition to access token definitions
		const preliminaryTokens: TokenObject<TContract> =
			{} as TokenObject<TContract>;
		const tokenValues = contract.tokens.value as readonly string[];

		// Initialize with placeholder values to get the definition
		for (const tokenValue of tokenValues) {
			(preliminaryTokens as any)[tokenValue] =
				`placeholder-${tokenValue}`;
		}

		// Get the definition with placeholders
		const preliminaryDefinition = definition(preliminaryTokens);

		// Now build the actual tokens object from the definition
		const actualTokens: TokenObject<TContract> =
			{} as TokenObject<TContract>;
		const tokenDefinition = preliminaryDefinition.tokens as Record<
			string,
			any
		>;

		if (tokenDefinition[group as string]) {
			const groupTokens = tokenDefinition[group as string];
			for (const tokenValue of tokenValues) {
				if (groupTokens[tokenValue]) {
					const tokenClasses = groupTokens[tokenValue];
					// Join token classes into a single string for the tokens object
					if (Array.isArray(tokenClasses)) {
						(actualTokens as any)[tokenValue] =
							tokenClasses.join(" ");
					} else {
						(actualTokens as any)[tokenValue] = tokenClasses;
					}
				} else {
					// Fallback if token not defined for this group
					(actualTokens as any)[tokenValue] = "";
				}
			}
		} else {
			// Fallback if group not found
			for (const tokenValue of tokenValues) {
				(actualTokens as any)[tokenValue] = "";
			}
		}

		// Call the definition function with the actual resolved tokens
		const resolvedDefinition = definition(actualTokens);

		// Create the component function with resolved definition
		const componentFn = (variantOverrides?: any, slotOverrides?: any) => {
			// Merge defaults with overrides
			const finalVariants = {
				...resolvedDefinition.defaults,
				...variantOverrides,
			};

			// Build slot functions
			const slots: Record<string, () => string> = {};

			// Get all slot names from the definition
			const slotEntries = Object.entries(
				resolvedDefinition.slot as Record<string, any>,
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
						resolvedDefinition.variant as Record<string, any>,
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
					if (resolvedDefinition.match) {
						for (const rule of resolvedDefinition.match) {
							if (rule.if) {
								const matches = Object.entries(rule.if).every(
									([key, value]) =>
										finalVariants[key] === value,
								);
								const ruleSlots = rule.do as
									| Record<string, any>
									| undefined;
								if (matches && ruleSlots?.[slotName]) {
									const matchClass = ruleSlots[slotName];
									if (Array.isArray(matchClass)) {
										classes.push(
											...matchClass.filter(Boolean),
										);
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

					// Token classes are now included directly in slot definitions
					// since the definition function receives resolved tokens

					// Filter out empty/falsy classes and merge with tailwind-merge
					const validClasses = classes.filter(
						(cls) => cls && cls !== "",
					);
					return tvc(...validClasses);
				};
			}

			return {
				slots,
			};
		};

		return componentFn;
	};

	return {
		create: createFn,
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
