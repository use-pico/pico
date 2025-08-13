import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("6.2 Complex Token Overrides - Token Replacement Semantics", () => {
	it("should handle token replacement vs append semantics in inheritance correctly", () => {
		// Base component with comprehensive token structure
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.text.default",
					"color.text.primary",
					"spacing.tight",
					"spacing.normal",
					"spacing.loose",
					"typography.body",
					"typography.heading",
				],
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": what.css([
						"bg-gray-100",
					]),
					"color.bg.primary": what.css([
						"bg-blue-500",
					]),
					"color.text.default": what.css([
						"text-gray-900",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"spacing.tight": what.css([
						"p-2",
					]),
					"spacing.normal": what.css([
						"p-4",
					]),
					"spacing.loose": what.css([
						"p-6",
					]),
					"typography.body": what.css([
						"text-base",
					]),
					"typography.heading": what.css([
						"text-lg",
						"font-bold",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"spacing.normal",
							"typography.body",
						]),
					}),
					def.rule(
						what.variant({
							size: "sm",
						}),
						{
							root: what.token([
								"spacing.tight",
								"typography.body",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "lg",
						}),
						{
							root: what.token([
								"spacing.loose",
								"typography.heading",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		// Extended component that overrides some tokens and adds new ones
		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.bg.success",
					"color.text.default",
					"color.text.primary",
					"color.text.success",
					"spacing.tight",
					"spacing.normal",
					"spacing.loose",
					"spacing.xl",
					"typography.body",
					"typography.heading",
					"typography.caption",
					"border.none",
					"border.rounded",
					"border.pill",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
						"xl",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": what.css([
						"bg-green-100",
					]),
					"color.bg.primary": what.css([
						"bg-green-500",
					]),
					"color.bg.success": what.css([
						"bg-green-600",
					]),
					"color.text.default": what.css([
						"text-green-900",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.success": what.css([
						"text-white",
					]),
					"spacing.tight": what.css([
						"p-1",
					]),
					"spacing.normal": what.css([
						"p-3",
					]),
					"spacing.loose": what.css([
						"p-5",
					]),
					"spacing.xl": what.css([
						"p-8",
					]),
					"typography.body": what.css([
						"text-sm",
					]),
					"typography.heading": what.css([
						"text-xl",
						"font-semibold",
					]),
					"typography.caption": what.css([
						"text-xs",
						"text-gray-500",
					]),
					"border.none": what.css([]),
					"border.rounded": what.css([
						"rounded-md",
					]),
					"border.pill": what.css([
						"rounded-full",
					]),
				}),
				rules: [
					def.rule(
						what.variant({
							size: "xl",
						}),
						{
							root: what.token([
								"spacing.xl",
								"typography.heading",
								"border.rounded",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		// Test base component with default size
		const baseInstance = BaseComponent.create();
		expect(baseInstance.root()).toBe(
			"bg-gray-100 text-gray-900 p-4 text-base",
		);

		// Test base component with small size
		const baseSmallInstance = BaseComponent.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(baseSmallInstance.root()).toBe(
			"bg-gray-100 text-gray-900 p-2 text-base",
		);

		// Test extended component with default size (should use overridden tokens)
		const extendedInstance = ExtendedComponent.create();
		expect(extendedInstance.root()).toBe(
			"bg-green-100 text-green-900 p-3 text-sm",
		);

		// Test extended component with small size (should use overridden spacing and typography)
		const extendedSmallInstance = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(extendedSmallInstance.root()).toBe(
			"bg-green-100 text-green-900 p-1 text-sm",
		);

		// Test extended component with xl size (should use new spacing, typography, and border tokens)
		const extendedXlInstance = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				size: "xl",
			}),
		}));
		expect(extendedXlInstance.root()).toBe(
			"bg-green-100 text-green-900 p-8 text-xl font-semibold rounded-md",
		);
	});
});
