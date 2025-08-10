import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("6.2 Complex Token Overrides - Token Replacement Semantics", () => {
	it("should handle token replacement vs append semantics in inheritance correctly", () => {
		// Base component with comprehensive token structure
		const BaseComponent = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
					],
					"color.text": [
						"default",
						"primary",
					],
					spacing: [
						"tight",
						"normal",
						"loose",
					],
					typography: [
						"body",
						"heading",
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
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-500",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-white",
						],
					},
					spacing: {
						tight: [
							"p-2",
						],
						normal: [
							"p-4",
						],
						loose: [
							"p-6",
						],
					},
					typography: {
						body: [
							"text-base",
						],
						heading: [
							"text-lg",
							"font-bold",
						],
					},
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
						{
							size: "sm",
						},
						{
							root: what.token([
								"spacing.tight",
								"typography.body",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
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
				tokens: {
					"color.bg": [
						"default",
						"primary",
						"success",
					],
					"color.text": [
						"default",
						"primary",
						"success",
					],
					spacing: [
						"tight",
						"normal",
						"loose",
						"xl",
					],
					typography: [
						"body",
						"heading",
						"caption",
					],
					border: [
						"none",
						"rounded",
						"pill",
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
						"xl",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						default: [
							"bg-green-100",
						],
						primary: [
							"bg-green-500",
						],
						success: [
							"bg-green-600",
						],
					},
					"color.text": {
						default: [
							"text-green-900",
						],
						primary: [
							"text-white",
						],
						success: [
							"text-white",
						],
					},
					spacing: {
						tight: [
							"p-1",
						],
						normal: [
							"p-3",
						],
						loose: [
							"p-5",
						],
						xl: [
							"p-8",
						],
					},
					typography: {
						body: [
							"text-sm",
						],
						heading: [
							"text-xl",
							"font-semibold",
						],
						caption: [
							"text-xs",
							"text-gray-500",
						],
					},
					border: {
						none: [],
						rounded: [
							"rounded-md",
						],
						pill: [
							"rounded-full",
						],
					},
				}),
				rules: [
					def.rule(
						{
							size: "xl",
						},
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
