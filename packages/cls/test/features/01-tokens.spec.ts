import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("tokens feature", () => {
	it("resolves basic tokens", () => {
		const TokenTest = cls(
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

		const slots = TokenTest.create();
		expect(slots.root()).toBe("block text-gray-900 bg-white");
	});

	it("resolves tokens with multiple variants", () => {
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

		const slots = TokenTest.create();
		expect(slots.root()).toBe("block text-gray-900 bg-white");
		expect(
			slots.root({
				variant: {
					variant: "primary",
				},
			}),
		).toBe("block text-blue-600 bg-blue-50");
		expect(
			slots.root({
				variant: {
					variant: "secondary",
				},
			}),
		).toBe("block text-green-600 bg-green-50");
	});

	it("handles token overrides in create()", () => {
		const TokenTest = cls(
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

		const slots = TokenTest.create({
			token: {
				"color.text": {
					default: [
						"text-red-900",
					],
					primary: [
						"text-red-600",
					],
				},
			},
		});
		expect(slots.root()).toBe("block text-red-900 bg-white");
	});

	it("handles token overrides with variant combinations", () => {
		const TokenTest = cls(
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

		const slots = TokenTest.create({
			variant: {
				variant: "primary",
			},
			token: {
				"color.text": {
					primary: [
						"text-red-600",
					],
				},
				"color.bg": {
					primary: [
						"bg-red-50",
					],
				},
			},
		});
		expect(slots.root()).toBe("block text-red-600 bg-red-50");
	});

	it("handles complex token structures", () => {
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
				},
				slot: [
					"root",
				],
				variant: {
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
							"m-4",
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
								"spacing.padding.md",
								"spacing.margin.md",
							],
						},
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								token: [
									"spacing.padding.sm",
									"spacing.margin.sm",
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
									"spacing.margin.lg",
								],
							},
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const slots = TokenTest.create();
		expect(slots.root()).toBe("block text-gray-900 bg-white p-4 m-2");
		expect(
			slots.root({
				variant: {
					size: "sm",
				},
			}),
		).toBe("block text-gray-900 bg-white p-2 m-1");
		expect(
			slots.root({
				variant: {
					size: "lg",
				},
			}),
		).toBe("block text-gray-900 bg-white p-6 m-4");
	});

	it("handles token inheritance and overrides", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
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
				},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
							],
							token: [
								"color.text.default",
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
						"secondary",
					], // Override with new variant
					"color.bg": [
						"default",
						"primary",
					], // Add new token group
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
						], // Inherit from base
						primary: [
							"text-blue-600",
						], // Inherit from base
						secondary: [
							"text-green-600",
						], // New variant
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

		const slots = Extended.create();
		expect(slots.root()).toBe("block text-gray-900 bg-white");
	});
});
