import { tvc } from "./tvc";
import type {
	AllTokenGroups,
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
	const { contract, definition } = props;

	// Create the component function that accepts a group
	const createFn = (group: AllTokenGroups<TContract>) => {
		// Handle defaults for variants
		const defaults = definition.defaults;

		// Return the component function
		return (variants: any = {}) => {
			const finalVariants = {
				...defaults,
				...variants,
			};

			return {
				slots: Object.fromEntries(
					Object.entries(definition.slot as Record<string, any>).map(
						([slotName, slotConfig]) => [
							slotName,
							() => {
								const classes: string[] = [];

								// Add base slot classes
								if (slotConfig.class) {
									classes.push(...slotConfig.class);
								}

								// Add token classes if specified
								if (slotConfig.token && definition.tokens) {
									const tokenDefinition =
										definition.tokens as Record<
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
												if (
													Array.isArray(tokenClasses)
												) {
													classes.push(
														...tokenClasses,
													);
												} else {
													classes.push(tokenClasses);
												}
											}
										}
									}
								}

								// Add variant classes
								if (definition.variant) {
									const variantEntries = Object.entries(
										definition.variant as Record<
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
										if (
											variantConfig?.[
												String(variantValue)
											]
										) {
											const variantSlotClass =
												variantConfig[
													String(variantValue)
												][slotName];
											if (variantSlotClass) {
												if (
													Array.isArray(
														variantSlotClass,
													)
												) {
													classes.push(
														...variantSlotClass,
													);
												} else {
													classes.push(
														variantSlotClass,
													);
												}
											}
										}
									}
								}

								// Merge all classes using tvc
								return tvc(classes);
							},
						],
					),
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
			childProps: Props<Contract<TSlot, TVariant, TTokens, TContract>>,
		): Cls<Contract<TSlot, TVariant, TTokens, TContract>> {
			const inheritedContract: Contract<
				TSlot,
				TVariant,
				TTokens,
				TContract
			> = {
				...childProps.contract,
				use: contract, // Set up the inheritance chain
			};
			const inheritedProps: Props<
				Contract<TSlot, TVariant, TTokens, TContract>
			> = {
				...childProps,
				contract: inheritedContract,
			};
			return cls(inheritedProps);
		},
		contract: proxy,
	};
}
