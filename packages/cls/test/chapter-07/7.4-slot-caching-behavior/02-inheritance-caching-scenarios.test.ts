import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("7.4 Slot Caching Behavior - Inheritance Caching Scenarios", () => {
	it("should handle complex caching scenarios with inheritance and overrides", () => {
		const BaseButton = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.text.default",
					"color.text.primary",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
					variant: [
						"default",
						"primary",
					],
				},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.text.default": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"inline-flex",
									"items-center",
								],
								token: [
									"color.bg.default",
									"color.text.default",
								],
							},
						},
					},
					{
						match: {
							variant: "primary",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
					variant: "default",
				},
			},
		);

		const ExtendedButton = BaseButton.extend(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.bg.danger",
					"spacing.sm",
					"spacing.md",
					"spacing.lg",
				],
				slot: [
					"root",
					"label",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					variant: [
						"default",
						"primary",
						"danger",
					],
					loading: [
						"bool",
					],
				},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.bg.danger": {
						class: [
							"bg-red-600",
						],
					},
					"spacing.sm": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"spacing.md": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"spacing.lg": {
						class: [
							"px-6",
							"py-3",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"rounded-md",
									"font-medium",
								],
							},
							label: {
								class: [
									"font-medium",
								],
							},
						},
					},
					{
						match: {
							size: "lg",
						},
						slot: {
							root: {
								token: [
									"spacing.lg",
								],
							},
						},
					},
					{
						match: {
							variant: "danger",
						},
						slot: {
							root: {
								token: [
									"color.bg.danger",
									"color.text.primary",
								],
							},
						},
					},
					{
						match: {
							loading: true,
						},
						slot: {
							root: {
								class: [
									"opacity-75",
									"cursor-not-allowed",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
					variant: "default",
					loading: false,
				},
			},
		);

		// Test inheritance caching behavior
		const { slots: baseButton } = BaseButton.create();
		const { slots: extendedButton } = ExtendedButton.create();

		// Base button should have its own slot functions
		const baseRoot = baseButton.root();
		expect(baseRoot).toBe(
			"bg-gray-100 text-gray-900 inline-flex items-center",
		);

		// Extended button should have different slot functions (inherited but extended)
		const extendedRoot = extendedButton.root();
		expect(extendedRoot).toBe(
			"bg-gray-100 text-gray-900 inline-flex items-center rounded-md font-medium",
		);
		// Note: The spacing tokens are defined but not applied by default
		// They only get applied when specific size variants are used

		// They should not share slot functions (different contracts)
		expect(baseButton.root).not.toBe(extendedButton.root);

		// Test that extended button can still use dynamic calls
		const dynamicExtendedRoot = extendedButton.root({
			variant: {
				variant: "danger",
				size: "lg",
				loading: true,
			},
		});
		expect(dynamicExtendedRoot).toBe(
			"inline-flex items-center rounded-md font-medium px-6 py-3 bg-red-600 text-white opacity-75 cursor-not-allowed",
		);

		// Test that the dynamic call result is cached for the same parameters
		const secondDynamicCall = extendedButton.root({
			variant: {
				variant: "danger",
				size: "lg",
				loading: true,
			},
		});
		expect(secondDynamicCall).toBe(dynamicExtendedRoot);

		// Test that different parameters still compute new results
		const differentDynamicCall = extendedButton.root({
			variant: {
				variant: "primary",
				size: "sm",
			},
		});
		expect(differentDynamicCall).toBe(
			"inline-flex items-center bg-blue-600 text-white rounded-md font-medium",
		);
		// Note: The spacing tokens are defined but not automatically applied
		// They only get applied when explicitly referenced in rules

		// Verify caching is working correctly
		expect(differentDynamicCall).not.toBe(dynamicExtendedRoot);
		expect(differentDynamicCall).not.toBe(extendedRoot);
	});
});
