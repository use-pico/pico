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
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.bg.primary": [
						"bg-blue-600",
					],
					"color.text.default": [
						"text-gray-900",
					],
					"color.text.primary": [
						"text-white",
					],
				}),
				rules: [
					def.root?.({
						root: what.both?.(
							[
								"inline-flex",
								"items-center",
							],
							[
								"color.bg.default",
								"color.text.default",
							],
						),
					}),
					def.rule?.(
						what.variant?.({
							variant: "primary",
						}),
						{
							root: what.token?.([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					size: "md",
					variant: "default",
				}),
			}),
		);

		const ExtendedButton = BaseButton.extend?.(
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
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.bg.primary": [
						"bg-blue-600",
					],
					"color.bg.danger": [
						"bg-red-600",
					],
					"spacing.sm": [
						"px-2",
						"py-1",
					],
					"spacing.md": [
						"px-4",
						"py-2",
					],
					"spacing.lg": [
						"px-6",
						"py-3",
					],
				}),
				rules: [
					def.root?.({
						root: what.css?.([
							"rounded-md",
							"font-medium",
						]),
						label: what.css?.([
							"font-medium",
						]),
					}),
					def.rule?.(
						what.variant?.({
							size: "lg",
						}),
						{
							root: what.token?.([
								"spacing.lg",
							]),
						},
					),
					def.rule?.(
						what.variant?.({
							variant: "danger",
						}),
						{
							root: what.token?.([
								"color.bg.danger",
								"color.text.primary",
							]),
						},
					),
					def.rule?.(
						what.variant?.({
							loading: true,
						}),
						{
							root: what.css?.([
								"opacity-75",
								"cursor-not-allowed",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					size: "md",
					variant: "default",
					loading: false,
				}),
			}),
		);

		// Test inheritance caching behavior
		const baseButton = BaseButton.create?.();
		const extendedButton = ExtendedButton.create?.();

		// Base button should have its own slot functions
		const baseRoot = baseButton.root?.();
		expect(baseRoot).toContain("inline-flex");
		expect(baseRoot).toContain("items-center");
		expect(baseRoot).toContain("bg-gray-100");
		expect(baseRoot).toContain("text-gray-900");

		// Extended button should have different slot functions (inherited but extended)
		const extendedRoot = extendedButton.root?.();
		expect(extendedRoot).toContain("inline-flex");
		expect(extendedRoot).toContain("items-center");
		expect(extendedRoot).toContain("bg-gray-100");
		expect(extendedRoot).toContain("text-gray-900");
		expect(extendedRoot).toContain("rounded-md");
		expect(extendedRoot).toContain("font-medium");
		// Note: The spacing tokens are defined but not applied by default
		// They only get applied when specific size variants are used

		// They should not share slot functions (different contracts)
		expect(baseButton.root).not.toBe?.(extendedButton.root);

		// Test that extended button can still use dynamic calls
		const dynamicExtendedRoot = extendedButton.root?.(({ what }) => ({
			variant: what.variant?.({
				variant: "danger",
				size: "lg",
				loading: true,
			}),
		}));
		expect(dynamicExtendedRoot).toContain("inline-flex");
		expect(dynamicExtendedRoot).toContain("items-center");
		expect(dynamicExtendedRoot).toContain("bg-red-600");
		expect(dynamicExtendedRoot).toContain("text-white");
		expect(dynamicExtendedRoot).toContain("rounded-md");
		expect(dynamicExtendedRoot).toContain("font-medium");
		expect(dynamicExtendedRoot).toContain("px-6");
		expect(dynamicExtendedRoot).toContain("py-3");
		expect(dynamicExtendedRoot).toContain("opacity-75");
		expect(dynamicExtendedRoot).toContain("cursor-not-allowed");

		// Test that the dynamic call result is cached for the same parameters
		const secondDynamicCall = extendedButton.root?.(({ what }) => ({
			variant: what.variant?.({
				variant: "danger",
				size: "lg",
				loading: true,
			}),
		}));
		expect(secondDynamicCall).toBe(dynamicExtendedRoot);

		// Test that different parameters still compute new results
		const differentDynamicCall = extendedButton.root?.(({ what }) => ({
			variant: what.variant?.({
				variant: "primary",
				size: "sm",
			}),
		}));
		expect(differentDynamicCall).toContain("inline-flex");
		expect(differentDynamicCall).toContain("items-center");
		expect(differentDynamicCall).toContain("bg-blue-600");
		expect(differentDynamicCall).toContain("text-white");
		expect(differentDynamicCall).toContain("rounded-md");
		expect(differentDynamicCall).toContain("font-medium");
		// Note: The spacing tokens are defined but not automatically applied
		// They only get applied when explicitly referenced in rules

		// Verify caching is working correctly
		expect(differentDynamicCall).not.toBe?.(dynamicExtendedRoot);
		expect(differentDynamicCall).not.toBe?.(extendedRoot);
	});
});
