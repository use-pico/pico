import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("advanced token scenarios", () => {
	it("handles token conflicts when extending with same token names", () => {
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

		// Extended overrides the same token names with different values
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
							"text-gray-800", // Override base default
						],
						primary: [
							"text-indigo-600", // Override base primary
						],
						success: [
							"text-green-600", // New token
						],
					},
					"color.bg": {
						default: [
							"bg-gray-50", // Override base default
						],
						primary: [
							"bg-indigo-50", // Override base primary
						],
						success: [
							"bg-green-50", // New token
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

		// Test that overrides work correctly
		const baseSlots = Base.create();
		expect(baseSlots.root()).toBe("block text-gray-900 bg-white");

		const basePrimarySlots = Base.create(() => ({
			variant: {
				variant: "primary",
			},
		}));
		expect(basePrimarySlots.root()).toBe("block text-blue-600 bg-blue-50");

		const extendedSlots = Extended.create();
		expect(extendedSlots.root()).toBe("block text-gray-800 bg-gray-50");

		const extendedPrimarySlots = Extended.create(() => ({
			variant: {
				variant: "primary",
			},
		}));
		expect(extendedPrimarySlots.root()).toBe(
			"block text-indigo-600 bg-indigo-50",
		);

		const extendedSuccessSlots = Extended.create(() => ({
			variant: {
				variant: "success",
			},
		}));
		expect(extendedSuccessSlots.root()).toBe(
			"block text-green-600 bg-green-50",
		);
	});

	it("handles token resolution order in complex inheritance chains", () => {
		const Level1 = cls(
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

		const Level2 = Level1.extend(
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
							"text-gray-800", // Override Level1
						],
						primary: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-gray-50", // Override Level1
						],
						primary: [
							"bg-blue-50",
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
				],
				defaults: {
					variant: "default",
				},
			},
		);

		const Level3 = Level2.extend(
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
							"text-gray-700", // Override Level2
						],
						primary: [
							"text-indigo-600", // Override Level2
						],
						success: [
							"text-green-600",
						],
					},
					"color.bg": {
						default: [
							"bg-gray-100", // Override Level2
						],
						primary: [
							"bg-indigo-50", // Override Level2
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

		// Test resolution order: Level3 overrides Level2 overrides Level1
		const level1Slots = Level1.create(() => ({}));
		expect(level1Slots.root()).toBe("block text-gray-900 bg-white");

		const level2Slots = Level2.create(() => ({}));
		expect(level2Slots.root()).toBe("block text-gray-800 bg-gray-50");

		const level3Slots = Level3.create(() => ({}));
		expect(level3Slots.root()).toBe("block text-gray-700 bg-gray-100");

		// Test variant resolution order
		const level2PrimarySlots = Level2.create(() => ({
			variant: {
				variant: "primary",
			},
		}));
		expect(level2PrimarySlots.root()).toBe(
			"block text-blue-600 bg-blue-50",
		);

		const level3PrimarySlots = Level3.create(() => ({
			variant: {
				variant: "primary",
			},
		}));
		expect(level3PrimarySlots.root()).toBe(
			"block text-indigo-600 bg-indigo-50",
		);

		const level3SuccessSlots = Level3.create(() => ({
			variant: {
				variant: "success",
			},
		}));
		expect(level3SuccessSlots.root()).toBe(
			"block text-green-600 bg-green-50",
		);
	});

	it("handles token overrides with partial definitions", () => {
		const Base = cls(
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
							variant: "secondary",
						},
						{
							root: {
								token: [
									"color.text.secondary",
									"color.bg.secondary",
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

		// Test partial token overrides in create config
		const partialOverrideSlots = Base.create(() => ({
			variant: {
				variant: "primary",
			},
			token: {
				"color.text": {
					primary: [
						"text-red-600", // Override only primary text
					],
				},
				// Note: not overriding color.bg.primary, so it should use the default
			},
		}));
		expect(partialOverrideSlots.root()).toBe(
			"block text-red-600 bg-blue-50",
		);

		// Test partial token overrides in inheritance
		const Extended = Base.extend(
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
							"text-gray-800", // Override only default
						],
						primary: [
							"text-blue-600", // Keep original
						],
						secondary: [
							"text-green-600", // Keep original
						],
					},
					"color.bg": {
						default: [
							"bg-white", // Keep original
						],
						primary: [
							"bg-purple-50", // Override only primary background
						],
						secondary: [
							"bg-green-50", // Keep original
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
				],
				defaults: {
					variant: "default",
				},
			},
		);

		const extendedDefaultSlots = Extended.create();
		expect(extendedDefaultSlots.root()).toBe(
			"block text-gray-800 bg-white",
		);

		const extendedPrimarySlots = Extended.create(() => ({
			variant: {
				variant: "primary",
			},
		}));
		expect(extendedPrimarySlots.root()).toBe(
			"block text-blue-600 bg-purple-50",
		);

		const extendedSecondarySlots = Extended.create(() => ({
			variant: {
				variant: "secondary",
			},
		}));
		expect(extendedSecondarySlots.root()).toBe(
			"block text-green-600 bg-green-50",
		);
	});

	it("handles dynamic token generation based on variants", () => {
		const DynamicTokens = cls(
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
					spacing: [
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
								"spacing.md",
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
								"spacing.sm",
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
									"spacing.sm",
								],
							},
							icon: {
								token: [
									"spacing.sm",
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
							icon: {
								token: [
									"spacing.md",
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

		// Test dynamic token combinations
		const defaultSlots = DynamicTokens.create();
		expect(defaultSlots.root()).toBe(
			"block border rounded text-gray-900 bg-white border-gray-200 p-4",
		);
		expect(defaultSlots.label()).toBe("block text-gray-900");
		expect(defaultSlots.icon()).toBe("inline-block p-2");

		const primarySmallSlots = DynamicTokens.create(() => ({
			variant: {
				variant: "primary",
				size: "sm",
			},
		}));
		expect(primarySmallSlots.root()).toBe(
			"block border rounded text-blue-600 bg-blue-50 border-blue-200 p-2",
		);
		expect(primarySmallSlots.label()).toBe("block text-blue-600");
		expect(primarySmallSlots.icon()).toBe("inline-block p-2");

		const dangerLargeSlots = DynamicTokens.create(() => ({
			variant: {
				variant: "danger",
				size: "lg",
			},
		}));
		expect(dangerLargeSlots.root()).toBe(
			"block border rounded text-red-600 bg-red-50 border-red-200 p-6",
		);
		expect(dangerLargeSlots.label()).toBe("block text-red-600");
		expect(dangerLargeSlots.icon()).toBe("inline-block p-4");

		const secondaryMediumSlots = DynamicTokens.create(() => ({
			variant: {
				variant: "secondary",
				size: "md",
			},
		}));
		expect(secondaryMediumSlots.root()).toBe(
			"block border rounded p-4 text-green-600 bg-green-50 border-green-200",
		);
		expect(secondaryMediumSlots.label()).toBe("block text-green-600");
		expect(secondaryMediumSlots.icon()).toBe("inline-block p-2");
	});
});
