import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("rule system edge cases", () => {
	it("handles complex rule matching with multiple conditions", () => {
		const ComplexRules = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"secondary",
					],
					"color.bg": [
						"default",
						"primary",
						"secondary",
					],
				},
				slot: [
					"root",
					"label",
					"icon",
				],
				variant: {
					variant: [
						"default",
						"primary",
						"secondary",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
					disabled: [
						"bool",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-blue-600",
						],
						secondary: [
							"text-green-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
						secondary: [
							"bg-green-50",
						],
					},
				},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
								"border",
								"rounded",
							],
							token: [
								"color.text.default",
								"color.bg.default",
							],
						},
						label: {
							class: [
								"block",
							],
							token: [
								"color.text.default",
							],
						},
						icon: {
							class: [
								"inline-block",
							],
						},
					}),
					// Rule with multiple conditions
					rule(
						{
							variant: "primary",
							size: "lg",
						},
						{
							root: {
								class: [
									"text-lg",
									"font-bold",
								],
								token: [
									"color.text.primary",
									"color.bg.primary",
								],
							},
							label: {
								token: [
									"color.text.primary",
								],
							},
						},
					),
					// Rule with single condition that should not match the above
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								token: [
									"color.text.primary",
									"color.bg.primary",
								],
							},
							label: {
								token: [
									"color.text.primary",
								],
							},
						},
					),
					// Rule with different multiple conditions
					rule(
						{
							variant: "secondary",
							disabled: true,
						},
						{
							root: {
								class: [
									"opacity-50",
									"cursor-not-allowed",
								],
								token: [
									"color.text.secondary",
									"color.bg.secondary",
								],
							},
							label: {
								token: [
									"color.text.secondary",
								],
							},
						},
					),
					// Rule with size only
					rule(
						{
							size: "sm",
						},
						{
							root: {
								class: [
									"text-sm",
								],
							},
							icon: {
								class: [
									"w-4",
									"h-4",
								],
							},
						},
					),
					// Rule with disabled only
					rule(
						{
							disabled: true,
						},
						{
							root: {
								class: [
									"opacity-50",
									"cursor-not-allowed",
								],
							},
						},
					),
				],
				defaults: {
					variant: "default",
					size: "md",
					disabled: false,
				},
			},
		);

		// Test complex rule matching
		const defaultSlots = ComplexRules.create();
		expect(defaultSlots.root()).toBe(
			"block border rounded text-gray-900 bg-white",
		);
		expect(defaultSlots.label()).toBe("block text-gray-900");
		expect(defaultSlots.icon()).toBe("inline-block");

		// Test single condition rule
		const primarySlots = ComplexRules.create({
			variant: {
				variant: "primary",
			},
		});
		expect(primarySlots.root()).toBe(
			"block border rounded text-blue-600 bg-blue-50",
		);
		expect(primarySlots.label()).toBe("block text-blue-600");
		expect(primarySlots.icon()).toBe("inline-block");

		// Test multiple condition rule (primary + lg)
		const primaryLargeSlots = ComplexRules.create({
			variant: {
				variant: "primary",
				size: "lg",
			},
		});
		expect(primaryLargeSlots.root()).toBe(
			"block border rounded text-lg font-bold text-blue-600 bg-blue-50",
		);
		expect(primaryLargeSlots.label()).toBe("block text-blue-600");
		expect(primaryLargeSlots.icon()).toBe("inline-block");

		// Test multiple condition rule (secondary + disabled)
		const secondaryDisabledSlots = ComplexRules.create({
			variant: {
				variant: "secondary",
				disabled: true,
			},
		});
		expect(secondaryDisabledSlots.root()).toBe(
			"block border rounded text-green-600 bg-green-50 opacity-50 cursor-not-allowed",
		);
		expect(secondaryDisabledSlots.label()).toBe("block text-green-600");
		expect(secondaryDisabledSlots.icon()).toBe("inline-block");

		// Test single condition rule (size only)
		const smallSlots = ComplexRules.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallSlots.root()).toBe(
			"block border rounded text-gray-900 bg-white text-sm",
		);
		expect(smallSlots.label()).toBe("block text-gray-900");
		expect(smallSlots.icon()).toBe("inline-block w-4 h-4");

		// Test single condition rule (disabled only)
		const disabledSlots = ComplexRules.create({
			variant: {
				disabled: true,
			},
		});
		expect(disabledSlots.root()).toBe(
			"block border rounded text-gray-900 bg-white opacity-50 cursor-not-allowed",
		);
		expect(disabledSlots.label()).toBe("block text-gray-900");
		expect(disabledSlots.icon()).toBe("inline-block");
	});

	it("handles rule precedence when multiple rules match", () => {
		const PrecedenceRules = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
					],
					"color.bg": [
						"default",
						"primary",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"primary",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
					},
				},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
							],
							token: [
								"color.text.default",
								"color.bg.default",
							],
						},
					}),
					// Rule 1: variant only
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								class: [
									"border-blue-200",
								],
								token: [
									"color.text.primary",
									"color.bg.primary",
								],
							},
						},
					),
					// Rule 2: size only
					rule(
						{
							size: "lg",
						},
						{
							root: {
								class: [
									"text-lg",
									"p-6",
								],
							},
						},
					),
					// Rule 3: variant + size (more specific)
					rule(
						{
							variant: "primary",
							size: "lg",
						},
						{
							root: {
								class: [
									"font-bold",
									"shadow-lg",
								],
							},
						},
					),
				],
				defaults: {
					variant: "default",
					size: "md",
				},
			},
		);

		// Test rule precedence: more specific rules should apply
		const defaultSlots = PrecedenceRules.create();
		expect(defaultSlots.root()).toBe("block text-gray-900 bg-white");

		// Test single condition rule (variant only)
		const primarySlots = PrecedenceRules.create({
			variant: {
				variant: "primary",
			},
		});
		expect(primarySlots.root()).toBe(
			"block border-blue-200 text-blue-600 bg-blue-50",
		);

		// Test single condition rule (size only)
		const largeSlots = PrecedenceRules.create({
			variant: {
				size: "lg",
			},
		});
		expect(largeSlots.root()).toBe(
			"block text-gray-900 bg-white text-lg p-6",
		);

		// Test multiple condition rule (variant + size) - should apply both rules
		const primaryLargeSlots = PrecedenceRules.create({
			variant: {
				variant: "primary",
				size: "lg",
			},
		});
		expect(primaryLargeSlots.root()).toBe(
			"block border-blue-200 text-blue-600 bg-blue-50 text-lg p-6 font-bold shadow-lg",
		);
	});

	it("handles rule override behavior in inheritance chains", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
					],
					"color.bg": [
						"default",
						"primary",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"primary",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
					},
				},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
								"border",
							],
							token: [
								"color.text.default",
								"color.bg.default",
							],
						},
					}),
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								class: [
									"border-blue-200",
								],
								token: [
									"color.text.primary",
									"color.bg.primary",
								],
							},
						},
					),
				],
				defaults: {
					variant: "default",
				},
			},
		);

		const Extended = Base.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
					],
					"color.bg": [
						"default",
						"primary",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"primary",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-800",
						],
						primary: [
							"text-indigo-600",
						],
					},
					"color.bg": {
						default: [
							"bg-gray-50",
						],
						primary: [
							"bg-indigo-50",
						],
					},
				},
				rules: ({ rule }) => [
					// Override rule with override: true
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								class: [
									"border-indigo-300",
									"rounded-lg",
								],
								token: [
									"color.text.primary",
									"color.bg.primary",
								],
							},
						},
					),
				],
				defaults: {
					variant: "default",
				},
			},
		);

		// Test that extended rules override base rules
		const baseSlots = Base.create();
		expect(baseSlots.root()).toBe("block border text-gray-900 bg-white");

		const basePrimarySlots = Base.create({
			variant: {
				variant: "primary",
			},
		});
		expect(basePrimarySlots.root()).toBe(
			"block border border-blue-200 text-blue-600 bg-blue-50",
		);

		const extendedSlots = Extended.create();
		expect(extendedSlots.root()).toBe(
			"block border text-gray-800 bg-gray-50",
		);

		const extendedPrimarySlots = Extended.create({
			variant: {
				variant: "primary",
			},
		});
		expect(extendedPrimarySlots.root()).toBe(
			"block border border-indigo-300 rounded-lg text-indigo-600 bg-indigo-50",
		);
	});

	it("handles conditional rules based on token values", () => {
		const ConditionalRules = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"secondary",
					],
					"color.bg": [
						"default",
						"primary",
						"secondary",
					],
					state: [
						"default",
						"hover",
						"active",
						"disabled",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {
					variant: [
						"default",
						"primary",
						"secondary",
					],
					state: [
						"default",
						"hover",
						"active",
						"disabled",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-blue-600",
						],
						secondary: [
							"text-green-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
						secondary: [
							"bg-green-50",
						],
					},
					state: {
						default: [],
						hover: [
							"hover:opacity-80",
						],
						active: [
							"active:scale-95",
						],
						disabled: [
							"opacity-50",
							"cursor-not-allowed",
						],
					},
				},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
								"border",
								"rounded",
								"transition-all",
							],
							token: [
								"color.text.default",
								"color.bg.default",
								"state.default",
							],
						},
						label: {
							class: [
								"block",
							],
							token: [
								"color.text.default",
							],
						},
					}),
					// Conditional rule: primary variant
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								token: [
									"color.text.primary",
									"color.bg.primary",
								],
							},
							label: {
								token: [
									"color.text.primary",
								],
							},
						},
					),
					// Conditional rule: secondary variant
					rule(
						{
							variant: "secondary",
						},
						{
							root: {
								token: [
									"color.text.secondary",
									"color.bg.secondary",
								],
							},
							label: {
								token: [
									"color.text.secondary",
								],
							},
						},
					),
					// Conditional rule: hover state
					rule(
						{
							state: "hover",
						},
						{
							root: {
								token: [
									"state.hover",
								],
							},
						},
					),
					// Conditional rule: active state
					rule(
						{
							state: "active",
						},
						{
							root: {
								token: [
									"state.active",
								],
							},
						},
					),
					// Conditional rule: disabled state
					rule(
						{
							state: "disabled",
						},
						{
							root: {
								token: [
									"state.disabled",
								],
							},
						},
					),
					// Complex conditional rule: primary + hover
					rule(
						{
							variant: "primary",
							state: "hover",
						},
						{
							root: {
								class: [
									"hover:shadow-md",
								],
							},
						},
					),
					// Complex conditional rule: secondary + disabled
					rule(
						{
							variant: "secondary",
							state: "disabled",
						},
						{
							root: {
								class: [
									"border-green-300",
								],
							},
						},
					),
				],
				defaults: {
					variant: "default",
					state: "default",
				},
			},
		);

		// Test conditional rules
		const defaultSlots = ConditionalRules.create();
		expect(defaultSlots.root()).toBe(
			"block border rounded transition-all text-gray-900 bg-white",
		);
		expect(defaultSlots.label()).toBe("block text-gray-900");

		// Test variant conditional
		const primarySlots = ConditionalRules.create({
			variant: {
				variant: "primary",
			},
		});
		expect(primarySlots.root()).toBe(
			"block border rounded transition-all text-blue-600 bg-blue-50",
		);
		expect(primarySlots.label()).toBe("block text-blue-600");

		// Test state conditional
		const hoverSlots = ConditionalRules.create({
			variant: {
				state: "hover",
			},
		});
		expect(hoverSlots.root()).toBe(
			"block border rounded transition-all text-gray-900 bg-white hover:opacity-80",
		);
		expect(hoverSlots.label()).toBe("block text-gray-900");

		// Test complex conditional (primary + hover)
		const primaryHoverSlots = ConditionalRules.create({
			variant: {
				variant: "primary",
				state: "hover",
			},
		});
		expect(primaryHoverSlots.root()).toBe(
			"block border rounded transition-all text-blue-600 bg-blue-50 hover:opacity-80 hover:shadow-md",
		);
		expect(primaryHoverSlots.label()).toBe("block text-blue-600");

		// Test complex conditional (secondary + disabled)
		const secondaryDisabledSlots = ConditionalRules.create({
			variant: {
				variant: "secondary",
				state: "disabled",
			},
		});
		expect(secondaryDisabledSlots.root()).toBe(
			"block border rounded transition-all text-green-600 bg-green-50 opacity-50 cursor-not-allowed border-green-300",
		);
		expect(secondaryDisabledSlots.label()).toBe("block text-green-600");
	});
});
