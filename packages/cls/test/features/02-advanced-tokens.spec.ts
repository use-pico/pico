import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("advanced tokens", () => {
	it("handles nested token groups", () => {
		const NestedTokens = cls(
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
					"color.border": [
						"default",
						"primary",
						"secondary",
					],
					"spacing.padding": [
						"sm",
						"md",
						"lg",
					],
					"spacing.margin": [
						"sm",
						"md",
						"lg",
					],
					"typography.size": [
						"sm",
						"md",
						"lg",
					],
					"typography.weight": [
						"normal",
						"medium",
						"bold",
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
					"color.border": {
						default: [
							"border-gray-200",
						],
						primary: [
							"border-blue-200",
						],
						secondary: [
							"border-green-200",
						],
					},
					"spacing.padding": {
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
					},
					"spacing.margin": {
						sm: [
							"m-1",
						],
						md: [
							"m-2",
						],
						lg: [
							"m-3",
						],
					},
					"typography.size": {
						sm: [
							"text-sm",
						],
						md: [
							"text-base",
						],
						lg: [
							"text-lg",
						],
					},
					"typography.weight": {
						normal: [
							"font-normal",
						],
						medium: [
							"font-medium",
						],
						bold: [
							"font-bold",
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
								"color.border.default",
								"spacing.padding.md",
								"spacing.margin.md",
								"typography.size.md",
								"typography.weight.normal",
							],
						},
						label: {
							class: [
								"block",
							],
							token: [
								"typography.weight.medium",
							],
						},
						icon: {
							class: [
								"inline-block",
							],
							token: [
								"typography.size.sm",
							],
						},
					}),
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								token: [
									"color.text.primary",
									"color.bg.primary",
									"color.border.primary",
								],
							},
						},
					),
					rule(
						{
							variant: "secondary",
						},
						{
							root: {
								token: [
									"color.text.secondary",
									"color.bg.secondary",
									"color.border.secondary",
								],
							},
						},
					),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								token: [
									"spacing.padding.sm",
									"typography.size.sm",
								],
							},
							icon: {
								token: [
									"typography.size.sm",
								],
							},
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: {
								token: [
									"spacing.padding.lg",
									"typography.size.lg",
								],
							},
							icon: {
								token: [
									"typography.size.md",
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

		const slots = NestedTokens.create();
		expect(slots.root()).toBe(
			"block border rounded text-gray-900 bg-white border-gray-200 p-4 m-2 text-base font-normal",
		);
		expect(slots.label()).toBe("block font-medium");
		expect(slots.icon()).toBe("inline-block text-sm");

		const primarySlots = NestedTokens.create({
			variant: {
				variant: "primary",
				size: "lg",
			},
		});
		expect(primarySlots.root()).toBe(
			"block border rounded m-2 font-normal text-blue-600 bg-blue-50 border-blue-200 p-6 text-lg",
		);
		expect(primarySlots.label()).toBe("block font-medium");
		expect(primarySlots.icon()).toBe("inline-block text-base");
	});

	it("handles token inheritance with overrides", () => {
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
				variant: {},
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
				rules: ({ root }) => [
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
				],
				defaults: {},
			},
		);

		const Extended = Base.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"primary",
						"success",
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
						success: [
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
						success: [
							"bg-green-50",
						],
					},
				},
				rules: ({ rule }) => [
					rule(
						{
							variant: "success",
						},
						{
							root: {
								token: [
									"color.text.success",
									"color.bg.success",
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

		const slots = Extended.create();
		expect(slots.root()).toBe("block text-gray-900 bg-white");

		const successSlots = Extended.create({
			variant: {
				variant: "success",
			},
		});
		expect(successSlots.root()).toBe("block text-green-600 bg-green-50");
	});

	it("handles token overrides in create config", () => {
		const TokenTest = cls(
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
					"color.border": [
						"default",
						"primary",
						"secondary",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"primary",
						"secondary",
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
					"color.border": {
						default: [
							"border-gray-200",
						],
						primary: [
							"border-blue-200",
						],
						secondary: [
							"border-green-200",
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
								"color.border.default",
							],
						},
					}),
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								token: [
									"color.text.primary",
									"color.bg.primary",
									"color.border.primary",
								],
							},
						},
					),
					rule(
						{
							variant: "secondary",
						},
						{
							root: {
								token: [
									"color.text.secondary",
									"color.bg.secondary",
									"color.border.secondary",
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

		// Override tokens in create config
		const slots = TokenTest.create({
			variant: {
				variant: "primary",
			},
			token: {
				"color.text": {
					primary: [
						"text-red-600",
					], // Override primary text
				},
				"color.bg": {
					primary: [
						"bg-red-50",
					], // Override primary background
				},
			},
		});
		expect(slots.root()).toBe(
			"block border rounded text-red-600 bg-red-50 border-blue-200",
		);

		// Override multiple token groups
		const slots2 = TokenTest.create({
			variant: {
				variant: "secondary",
			},
			token: {
				"color.text": {
					secondary: [
						"text-purple-600",
					],
				},
				"color.bg": {
					secondary: [
						"bg-purple-50",
					],
				},
				"color.border": {
					secondary: [
						"border-purple-200",
					],
				},
			},
		});
		expect(slots2.root()).toBe(
			"block border rounded text-purple-600 bg-purple-50 border-purple-200",
		);
	});

	it("handles complex token combinations", () => {
		const ComplexTokens = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"secondary",
						"danger",
					],
					"color.bg": [
						"default",
						"primary",
						"secondary",
						"danger",
					],
					"color.border": [
						"default",
						"primary",
						"secondary",
						"danger",
					],
					state: [
						"default",
						"hover",
						"active",
						"disabled",
					],
					size: [
						"sm",
						"md",
						"lg",
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
						"danger",
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
						danger: [
							"text-red-600",
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
						danger: [
							"bg-red-50",
						],
					},
					"color.border": {
						default: [
							"border-gray-200",
						],
						primary: [
							"border-blue-200",
						],
						secondary: [
							"border-green-200",
						],
						danger: [
							"border-red-200",
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
					size: {
						sm: [
							"text-sm",
							"px-2",
							"py-1",
						],
						md: [
							"text-base",
							"px-4",
							"py-2",
						],
						lg: [
							"text-lg",
							"px-6",
							"py-3",
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
								"color.border.default",
								"state.default",
								"size.md",
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
							token: [
								"size.sm",
							],
						},
					}),
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								token: [
									"color.text.primary",
									"color.bg.primary",
									"color.border.primary",
								],
							},
							label: {
								token: [
									"color.text.primary",
								],
							},
						},
					),
					rule(
						{
							variant: "secondary",
						},
						{
							root: {
								token: [
									"color.text.secondary",
									"color.bg.secondary",
									"color.border.secondary",
								],
							},
							label: {
								token: [
									"color.text.secondary",
								],
							},
						},
					),
					rule(
						{
							variant: "danger",
						},
						{
							root: {
								token: [
									"color.text.danger",
									"color.bg.danger",
									"color.border.danger",
								],
							},
							label: {
								token: [
									"color.text.danger",
								],
							},
						},
					),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								token: [
									"size.sm",
								],
							},
							icon: {
								token: [
									"size.sm",
								],
							},
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: {
								token: [
									"size.lg",
								],
							},
							icon: {
								token: [
									"size.md",
								],
							},
						},
					),
					rule(
						{
							disabled: true,
						},
						{
							root: {
								token: [
									"state.disabled",
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

		// Test default state
		const defaultSlots = ComplexTokens.create();
		expect(defaultSlots.root()).toBe(
			"block border rounded transition-all text-gray-900 bg-white border-gray-200 text-base px-4 py-2",
		);
		expect(defaultSlots.label()).toBe("block text-gray-900");
		expect(defaultSlots.icon()).toBe("inline-block text-sm px-2 py-1");

		// Test primary variant with large size
		const primaryLargeSlots = ComplexTokens.create({
			variant: {
				variant: "primary",
				size: "lg",
			},
		});
		expect(primaryLargeSlots.root()).toBe(
			"block border rounded transition-all text-blue-600 bg-blue-50 border-blue-200 text-lg px-6 py-3",
		);
		expect(primaryLargeSlots.label()).toBe("block text-blue-600");
		expect(primaryLargeSlots.icon()).toBe(
			"inline-block text-base px-4 py-2",
		);

		// Test danger variant with small size and disabled
		const dangerSmallDisabledSlots = ComplexTokens.create({
			variant: {
				variant: "danger",
				size: "sm",
				disabled: true,
			},
		});
		expect(dangerSmallDisabledSlots.root()).toBe(
			"block border rounded transition-all text-red-600 bg-red-50 border-red-200 text-sm px-2 py-1 opacity-50 cursor-not-allowed",
		);
		expect(dangerSmallDisabledSlots.label()).toBe("block text-red-600");
		expect(dangerSmallDisabledSlots.icon()).toBe(
			"inline-block text-sm px-2 py-1",
		);
	});

	it("handles token inheritance in multilevel chains", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
						"default",
					],
					"color.bg": [
						"default",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
					},
				},
				rules: ({ root }) => [
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
				],
				defaults: {},
			},
		);

		const Level1 = Base.extend(
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
					spacing: [
						"sm",
						"md",
						"lg",
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
					spacing: {
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
					},
				},
				rules: ({ rule }) => [
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
						},
					),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								token: [
									"spacing.sm",
								],
							},
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: {
								token: [
									"spacing.md",
								],
							},
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: {
								token: [
									"spacing.lg",
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

		const Level2 = Level1.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
					],
					spacing: [
						"sm",
						"md",
						"lg",
					],
					typography: [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"primary",
						"success",
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
						success: [
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
						success: [
							"bg-green-50",
						],
					},
					spacing: {
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
					},
					typography: {
						sm: [
							"text-sm",
						],
						md: [
							"text-base",
						],
						lg: [
							"text-lg",
						],
					},
				},
				rules: ({ rule }) => [
					rule(
						{
							variant: "success",
						},
						{
							root: {
								token: [
									"color.text.success",
									"color.bg.success",
								],
							},
						},
					),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								token: [
									"typography.sm",
								],
							},
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: {
								token: [
									"typography.md",
								],
							},
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: {
								token: [
									"typography.lg",
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

		// Test all levels
		const baseSlots = Base.create();
		expect(baseSlots.root()).toBe("block text-gray-900 bg-white");

		const level1Slots = Level1.create({
			variant: {
				variant: "primary",
				size: "lg",
			},
		});
		expect(level1Slots.root()).toBe("block text-blue-600 bg-blue-50 p-6");

		const level2Slots = Level2.create({
			variant: {
				variant: "success",
				size: "sm",
			},
		});
		expect(level2Slots.root()).toBe(
			"block p-2 text-green-600 bg-green-50 text-sm",
		);
	});
});
