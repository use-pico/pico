import { describe, expect, it } from "bun:test";
import { cls } from "../src";

describe("New Token System - Dot Notation", () => {
	it("should support group-specific token values with dot notation", () => {
		const button = cls(
			{
				slot: [
					"root",
					"icon",
				],
				variant: {},
				tokens: {
					spacing: [
						"small",
						"medium",
						"large",
					],
					color: [
						"blue",
						"green",
						"red",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"btn",
						],
						token: [
							"spacing.medium",
							"color.blue",
						], // Dot notation!
					},
					icon: {
						class: [
							"icon",
						],
						token: [
							"spacing.small",
							"color.blue",
						],
					},
				},
				variant: {},
				tokens: {
					spacing: {
						small: [
							"p-1",
						],
						medium: [
							"p-4",
						],
						large: [
							"p-8",
						],
					},
					color: {
						blue: [
							"text-blue-500",
							"bg-blue-100",
						],
						green: [
							"text-green-500",
							"bg-green-100",
						],
						red: [
							"text-red-500",
							"bg-red-100",
						],
					},
				},
				defaults: {},
			},
		);

		const component = button.create();
		const instance = component();

		// Should apply dot notation tokens: spacing.medium + color.blue
		expect(instance.slots.root()).toBe("btn p-4 text-blue-500 bg-blue-100");
		expect(instance.slots.icon()).toBe(
			"icon p-1 text-blue-500 bg-blue-100",
		);
	});

	it("should support dot notation in variants", () => {
		const card = cls(
			{
				slot: [
					"root",
					"header",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
				tokens: {
					spacing: [
						"small",
						"large",
					],
					color: [
						"primary",
						"secondary",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"card",
						],
						token: [],
					},
					header: {
						class: [
							"card-header",
						],
						token: [],
					},
				},
				variant: {
					theme: {
						light: {
							root: {
								class: [
									"theme-light",
								],
								token: [
									"spacing.small",
									"color.primary",
								], // Dot notation in variants!
							},
							header: {
								class: [
									"header-light",
								],
								token: [
									"color.primary",
								],
							},
						},
						dark: {
							root: {
								class: [
									"theme-dark",
								],
								token: [
									"spacing.large",
									"color.secondary",
								],
							},
							header: {
								class: [
									"header-dark",
								],
								token: [
									"color.secondary",
								],
							},
						},
					},
				},
				tokens: {
					spacing: {
						small: [
							"p-2",
						],
						large: [
							"p-6",
						],
					},
					color: {
						primary: [
							"text-slate-900",
							"bg-white",
						],
						secondary: [
							"text-slate-100",
							"bg-slate-800",
						],
					},
				},
				defaults: {
					theme: "light",
				},
			},
		);

		const component = card.create();
		const lightInstance = component();
		const darkInstance = component({
			theme: "dark",
		});

		// Light theme: spacing.small + color.primary
		expect(lightInstance.slots.root()).toBe(
			"card theme-light p-2 text-slate-900 bg-white",
		);
		expect(lightInstance.slots.header()).toBe(
			"card-header header-light text-slate-900 bg-white",
		);

		// Dark theme: spacing.large + color.secondary
		expect(darkInstance.slots.root()).toBe(
			"card theme-dark p-6 text-slate-100 bg-slate-800",
		);
		expect(darkInstance.slots.header()).toBe(
			"card-header header-dark text-slate-100 bg-slate-800",
		);
	});

	it("should work with inheritance and different token groups", () => {
		// Base component with spacing tokens
		const base = cls(
			{
				slot: [
					"root",
				],
				variant: {},
				tokens: {
					spacing: [
						"xs",
						"sm",
						"md",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"base",
						],
						token: [
							"spacing.md",
						],
					},
				},
				variant: {},
				tokens: {
					spacing: {
						xs: [
							"p-1",
						],
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
					},
				},
				defaults: {},
			},
		);

		// Child component adds color tokens
		const button = base.use(
			{
				slot: [
					"icon",
				],
				variant: {
					size: [
						"small",
						"large",
					],
				},
				tokens: {
					color: [
						"primary",
						"accent",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"base",
							"btn",
						],
						token: [
							"spacing.md",
							"color.primary",
						], // Mix inherited and own tokens
					},
					icon: {
						class: [
							"icon",
						],
						token: [
							"spacing.xs",
							"color.accent",
						],
					},
				},
				variant: {
					size: {
						small: {
							root: {
								class: [
									"btn-sm",
								],
								token: [
									"spacing.sm",
								], // Override spacing via variant
							},
							icon: {
								class: [
									"icon-sm",
								],
								token: [],
							},
						},
						large: {
							root: {
								class: [
									"btn-lg",
								],
								token: [
									"spacing.md",
								],
							},
							icon: {
								class: [
									"icon-lg",
								],
								token: [
									"spacing.sm",
								],
							},
						},
					},
				},
				tokens: {
					// Inherited spacing tokens
					spacing: {
						xs: [
							"p-1",
						],
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
					},
					// Own color tokens
					color: {
						primary: [
							"text-blue-600",
							"bg-blue-50",
						],
						accent: [
							"text-purple-600",
							"bg-purple-50",
						],
					},
				},
				defaults: {
					size: "small",
				},
			},
		);

		const component = button.create();
		const smallInstance = component();
		const largeInstance = component({
			size: "large",
		});

		// Small: base classes + slot tokens + variant classes + variant tokens
		expect(smallInstance.slots.root()).toBe(
			"base btn text-blue-600 bg-blue-50 btn-sm p-2",
		);
		expect(smallInstance.slots.icon()).toBe(
			"icon p-1 text-purple-600 bg-purple-50 icon-sm",
		);

		// Large: base classes + slot tokens + variant classes + variant tokens
		expect(largeInstance.slots.root()).toBe(
			"base btn text-blue-600 bg-blue-50 btn-lg p-4",
		);
		expect(largeInstance.slots.icon()).toBe(
			"icon text-purple-600 bg-purple-50 icon-lg p-2",
		);
	});

	it("should provide type safety for dot notation references", () => {
		// This test verifies TypeScript compilation - the types should enforce valid references
		const component = cls(
			{
				slot: [
					"root",
				],
				variant: {},
				tokens: {
					spacing: [
						"small",
						"large",
					],
					color: [
						"red",
						"blue",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"test",
						],
						// These should be typed as "spacing.small" | "spacing.large" | "color.red" | "color.blue"
						token: [
							"spacing.small",
							"color.red",
						],
					},
				},
				variant: {},
				tokens: {
					spacing: {
						small: [
							"p-2",
						],
						large: [
							"p-8",
						],
					},
					color: {
						red: [
							"text-red-500",
						],
						blue: [
							"text-blue-500",
						],
					},
				},
				defaults: {},
			},
		);

		const instance = component.create()();
		expect(instance.slots.root()).toBe("test p-2 text-red-500");
	});
});
