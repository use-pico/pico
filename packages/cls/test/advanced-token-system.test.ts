import { describe, expect, it } from "bun:test";
import { cls } from "../src";

describe("Advanced Token System - Variants + Groups", () => {
	it("should support token variants and groups with proper structure", () => {
		const component = cls(
			{
				slot: [
					"root",
					"icon",
				],
				variant: {},
				tokens: {
					variant: [
						"default",
						"extra",
					], // Token variants (super-groups)
					group: {
						spacing: [
							"small",
							"medium",
						], // Group with specific values
						color: [
							"red",
							"red",
						],
					},
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
						], // Dot notation
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
					// All variants must be defined
					default: {
						// Each variant must define all groups
						spacing: {
							small: [
								"p-1",
							],
							medium: [
								"p-4",
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
						},
					},
					extra: {
						// Same groups, different implementations
						spacing: {
							small: [
								"p-2",
							],
							medium: [
								"p-8",
							],
						},
						color: {
							blue: [
								"text-blue-700",
								"bg-blue-200",
							],
							green: [
								"text-green-700",
								"bg-green-200",
							],
						},
					},
				},
				defaults: {},
			},
		);

		// Test with "default" variant
		const defaultComponent = component.create("default");
		const defaultInstance = defaultComponent();

		expect(defaultInstance.slots.root()).toBe(
			"btn p-4 text-blue-500 bg-blue-100",
		);
		expect(defaultInstance.slots.icon()).toBe(
			"icon p-1 text-blue-500 bg-blue-100",
		);

		// Test with "extra" variant
		const extraComponent = component.create("extra");
		const extraInstance = extraComponent();

		expect(extraInstance.slots.root()).toBe(
			"btn p-8 text-blue-700 bg-blue-200",
		);
		expect(extraInstance.slots.icon()).toBe(
			"icon p-2 text-blue-700 bg-blue-200",
		);
	});

	it("should support variants in component variants (not just tokens)", () => {
		const button = cls(
			{
				slot: [
					"root",
					"icon",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
				tokens: {
					variant: [
						"compact",
						"spacious",
					],
					group: {
						spacing: [
							"sm",
							"lg",
						],
						color: [
							"primary",
							"secondary",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"btn",
						],
						token: [
							"spacing.sm",
							"color.primary",
						],
					},
					icon: {
						class: [
							"icon",
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
									"color.primary",
								], // Additional tokens in variants
							},
							icon: {
								class: [
									"icon-light",
								],
								token: [
									"spacing.sm",
								],
							},
						},
						dark: {
							root: {
								class: [
									"theme-dark",
								],
								token: [
									"color.secondary",
								],
							},
							icon: {
								class: [
									"icon-dark",
								],
								token: [
									"spacing.lg",
								],
							},
						},
					},
				},
				tokens: {
					compact: {
						spacing: {
							sm: [
								"p-1",
							],
							lg: [
								"p-3",
							],
						},
						color: {
							primary: [
								"text-blue-600",
								"bg-blue-50",
							],
							secondary: [
								"text-gray-600",
								"bg-gray-50",
							],
						},
					},
					spacious: {
						spacing: {
							sm: [
								"p-3",
							],
							lg: [
								"p-6",
							],
						},
						color: {
							primary: [
								"text-blue-500",
								"bg-blue-100",
							],
							secondary: [
								"text-gray-500",
								"bg-gray-100",
							],
						},
					},
				},
				defaults: {
					theme: "light",
				},
			},
		);

		// Test compact + light theme
		const compactComponent = button.create("compact");
		const compactLightInstance = compactComponent();
		const compactDarkInstance = compactComponent({
			theme: "dark",
		});

		// Light: slot tokens (spacing.sm + color.primary) + variant tokens (color.primary)
		expect(compactLightInstance.slots.root()).toBe(
			"btn p-1 theme-light text-blue-600 bg-blue-50",
		);
		expect(compactLightInstance.slots.icon()).toBe("icon icon-light p-1");

		// Dark: slot tokens (spacing.sm + color.primary) + variant tokens (color.secondary)
		expect(compactDarkInstance.slots.root()).toBe(
			"btn p-1 theme-dark text-gray-600 bg-gray-50",
		);
		expect(compactDarkInstance.slots.icon()).toBe("icon icon-dark p-3");

		// Test spacious + dark theme
		const spaciousComponent = button.create("spacious");
		const spaciousDarkInstance = spaciousComponent({
			theme: "dark",
		});

		expect(spaciousDarkInstance.slots.root()).toBe(
			"btn p-3 theme-dark text-gray-500 bg-gray-100",
		);
		expect(spaciousDarkInstance.slots.icon()).toBe("icon icon-dark p-6");
	});

	it("should work with inheritance - extending variants and groups (explicit redefinition)", () => {
		// Base component with one variant and one group
		const base = cls(
			{
				slot: [
					"root",
				],
				variant: {},
				tokens: {
					variant: [
						"foundation",
					],
					group: {
						spacing: [
							"xs",
							"sm",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"base",
						],
						token: [
							"spacing.sm",
						],
					},
				},
				variant: {},
				tokens: {
					foundation: {
						spacing: {
							xs: [
								"p-1",
							],
							sm: [
								"p-2",
							],
						},
					},
				},
				defaults: {},
			},
		);

		// Child component extends with new variant and new group
		// Note: Inherited variants must be explicitly redefined if you want to use them
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
					variant: [
						"button",
					], // Adds new variant
					group: {
						color: [
							"primary",
							"accent",
						], // Adds new group
					},
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
							"spacing.sm",
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
									"spacing.xs",
								], // Override with inherited group
							},
						},
						large: {
							root: {
								class: [
									"btn-lg",
								],
								token: [
									"color.accent",
								], // Use own group
							},
						},
					},
				},
				tokens: {
					// Foundation variant is inherited - only new groups are required
					foundation: {
						// NEW "color" group is required
						color: {
							primary: [
								"text-blue-600",
							],
							accent: [
								"text-purple-600",
							],
						},
						// INHERITED "spacing" group is optional
						// If omitted, inherited spacing tokens won't be available
						// If included, you can override the parent's values
						spacing: {
							xs: [
								"p-1", // Override parent's "p-1" with same value
							],
							sm: [
								"p-2", // Override parent's "p-2" with same value
							],
						},
					},
					// Button variant is own - must implement required groups
					button: {
						// Own "color" group is required
						color: {
							primary: [
								"text-blue-700",
								"bg-blue-50",
							],
							accent: [
								"text-purple-700",
								"bg-purple-50",
							],
						},
						// Inherited "spacing" group is optional - we override it
						spacing: {
							xs: [
								"p-0.5",
							],
							sm: [
								"p-1.5",
							],
						},
					},
				},
				defaults: {
					size: "small",
				},
			},
		);

		// Test with foundation variant (inherited)
		const foundationComponent = button.create("foundation");
		const foundationInstance = foundationComponent();

		expect(foundationInstance.slots.root()).toBe(
			"base btn text-blue-600 btn-sm p-1",
		);
		expect(foundationInstance.slots.icon()).toBe(
			"icon p-1 text-purple-600",
		);

		// Test with button variant (own)
		const buttonComponent = button.create("button");
		const buttonInstance = buttonComponent();

		expect(buttonInstance.slots.root()).toBe(
			"base btn text-blue-700 bg-blue-50 btn-sm p-0.5",
		);
		expect(buttonInstance.slots.icon()).toBe(
			"icon p-0.5 text-purple-700 bg-purple-50",
		);
	});

	it("should provide type safety for variant and group combinations", () => {
		// This test verifies TypeScript compilation - should enforce structure
		const component = cls(
			{
				slot: [
					"root",
				],
				variant: {},
				tokens: {
					variant: [
						"theme1",
						"theme2",
					],
					group: {
						spacing: [
							"small",
							"large",
						],
						color: [
							"red",
							"red",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"test",
						],
						// Should be typed as dot notation combinations
						token: [
							"spacing.small",
							"color.red",
						],
					},
				},
				variant: {},
				tokens: {
					// TypeScript should enforce ALL variants are defined
					theme1: {
						// TypeScript should enforce ALL groups are defined in each variant
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
					theme2: {
						spacing: {
							small: [
								"p-1",
							],
							large: [
								"p-6",
							],
						},
						color: {
							red: [
								"text-red-600",
							],
							blue: [
								"text-blue-600",
							],
						},
					},
				},
				defaults: {},
			},
		);

		const theme1Instance = component.create("theme1")();
		const theme2Instance = component.create("theme2")();

		expect(theme1Instance.slots.root()).toBe("test p-2 text-red-500");
		expect(theme2Instance.slots.root()).toBe("test p-1 text-red-600");
	});

	it("should demonstrate optional inherited groups", () => {
		// Base component
		const base = cls(
			{
				slot: [
					"root",
				],
				variant: {},
				tokens: {
					variant: [
						"foundation",
					],
					group: {
						spacing: [
							"sm",
							"lg",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"base",
						],
						token: [
							"spacing.sm",
						],
					},
				},
				variant: {},
				tokens: {
					foundation: {
						spacing: {
							sm: [
								"p-2",
							],
							lg: [
								"p-6",
							],
						},
					},
				},
				defaults: {},
			},
		);

		// Child component adds color group
		const button = base.use(
			{
				slot: [
					"icon",
				],
				variant: {},
				tokens: {
					variant: [
						"enhanced",
					], // New variant
					group: {
						color: [
							"primary",
							"secondary",
						], // New group
					},
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
							"color.primary",
						], // Only use new color group
					},
					icon: {
						class: [
							"icon",
						],
						token: [
							"color.secondary",
						],
					},
				},
				variant: {},
				tokens: {
					// foundation variant is inherited - we can choose what to include
					foundation: {
						// Only define the NEW "color" group
						// Inherited "spacing" group is omitted - spacing tokens won't work for this variant
						color: {
							primary: [
								"text-blue-600",
							],
							secondary: [
								"text-gray-600",
							],
						},
					},
					// enhanced variant is own - must define all required groups
					enhanced: {
						// Own "color" group is required
						color: {
							primary: [
								"text-blue-700",
								"bg-blue-50",
							],
							secondary: [
								"text-gray-700",
								"bg-gray-50",
							],
						},
						// Inherited "spacing" group is optional - we include it
						spacing: {
							sm: [
								"p-1",
							],
							lg: [
								"p-4",
							],
						},
					},
				},
				defaults: {},
			},
		);

		// Foundation variant: only color tokens work (spacing omitted)
		const foundationComponent = button.create("foundation");
		const foundationInstance = foundationComponent();

		// No spacing token because we didn't include inherited spacing group
		expect(foundationInstance.slots.root()).toBe("base btn text-blue-600");
		expect(foundationInstance.slots.icon()).toBe("icon text-gray-600");

		// Enhanced variant: both color and spacing tokens work
		const enhancedComponent = button.create("enhanced");
		const enhancedInstance = enhancedComponent();

		// Has spacing token because we included inherited spacing group
		expect(enhancedInstance.slots.root()).toBe(
			"base btn text-blue-700 bg-blue-50",
		);
		expect(enhancedInstance.slots.icon()).toBe(
			"icon text-gray-700 bg-gray-50",
		);
	});
});
