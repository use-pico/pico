import { tvc } from "./tvc";
import type {
	AllTokenGroups,
	Cls,
	Contract,
	Definition,
	Slot,
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

	// Create the component function that optionally accepts a group
	const createFn = (group?: AllTokenGroups<TContract>) => {
		// Handle defaults for variants
		const defaults = resolvedDefinition.defaults;

		// Return the component function
		return (variants: any = {}) => {
			const finalVariants = {
				...defaults,
				...variants,
			};

			return {
				slots: Object.fromEntries(
					Object.entries(
						resolvedDefinition.slot as Record<string, any>,
					).map(([slotName, slotConfig]) => [
						slotName,
						() => {
							const classes: string[] = [];

							// Add base slot classes
							if (slotConfig.class) {
								classes.push(...slotConfig.class);
							}

							// Add token classes if specified
							if (
								slotConfig.token &&
								resolvedDefinition.tokens &&
								group
							) {
								const tokenDefinition =
									resolvedDefinition.tokens as Record<
										string,
										any
									>;
								const groupTokens =
									tokenDefinition[group as string];

								if (groupTokens) {
									for (const tokenName of slotConfig.token) {
										if (groupTokens[tokenName]) {
											const tokenClasses =
												groupTokens[tokenName];
											if (Array.isArray(tokenClasses)) {
												classes.push(...tokenClasses);
											} else {
												classes.push(tokenClasses);
											}
										}
									}
								}
							}

							// Add variant classes
							if (resolvedDefinition.variant) {
								const variantEntries = Object.entries(
									resolvedDefinition.variant as Record<
										string,
										any
									>,
								);
								for (const [
									variantName,
									variantConfig,
								] of variantEntries) {
									const variantValue =
										finalVariants[variantName];
									if (variantConfig?.[String(variantValue)]) {
										const variantSlotClass =
											variantConfig[String(variantValue)][
												slotName
											];
										if (variantSlotClass) {
											if (
												Array.isArray(variantSlotClass)
											) {
												classes.push(
													...variantSlotClass,
												);
											} else {
												classes.push(variantSlotClass);
											}
										}
									}
								}
							}

							// Merge all classes using tvc
							return tvc(classes);
						},
					]),
				),
			};
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
