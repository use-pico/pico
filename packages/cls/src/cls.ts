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

							// Add token classes if specified (dot notation: "group.value")
							if (slotConfig.token && resolvedDefinition.tokens) {
								const tokenDefinition =
									resolvedDefinition.tokens as Record<
										string,
										Record<string, any>
									>;

								for (const tokenReference of slotConfig.token) {
									// Parse dot notation: "spacing.small" -> group="spacing", value="small"
									const [tokenGroup, tokenValue] = (
										tokenReference as string
									).split(".");

									if (
										tokenGroup &&
										tokenValue &&
										tokenDefinition[tokenGroup]
									) {
										const groupTokens =
											tokenDefinition[tokenGroup];

										if (groupTokens[tokenValue]) {
											const tokenClasses =
												groupTokens[tokenValue];
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
										const variantSlotValue =
											variantConfig[String(variantValue)][
												slotName
											];
										if (variantSlotValue) {
											// Handle both legacy string format and new object format
											if (
												typeof variantSlotValue ===
												"string"
											) {
												// Legacy format: direct class name
												classes.push(variantSlotValue);
											} else if (
												Array.isArray(variantSlotValue)
											) {
												// Legacy format: array of class names
												classes.push(
													...variantSlotValue,
												);
											} else if (
												typeof variantSlotValue ===
												"object"
											) {
												// New format: {class, token} object
												if (variantSlotValue.class) {
													classes.push(
														...variantSlotValue.class,
													);
												}

												// Add variant token classes if specified (dot notation)
												if (
													variantSlotValue.token &&
													resolvedDefinition.tokens
												) {
													const tokenDefinition =
														resolvedDefinition.tokens as Record<
															string,
															Record<string, any>
														>;

													for (const tokenReference of variantSlotValue.token) {
														// Parse dot notation: "spacing.small" -> group="spacing", value="small"
														const [
															tokenGroup,
															tokenValue,
														] = (
															tokenReference as string
														).split(".");

														if (
															tokenGroup &&
															tokenValue &&
															tokenDefinition[
																tokenGroup
															]
														) {
															const groupTokens =
																tokenDefinition[
																	tokenGroup
																];

															if (
																groupTokens[
																	tokenValue
																]
															) {
																const tokenClasses =
																	groupTokens[
																		tokenValue
																	];
																if (
																	Array.isArray(
																		tokenClasses,
																	)
																) {
																	classes.push(
																		...tokenClasses,
																	);
																} else {
																	classes.push(
																		tokenClasses,
																	);
																}
															}
														}
													}
												}
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
