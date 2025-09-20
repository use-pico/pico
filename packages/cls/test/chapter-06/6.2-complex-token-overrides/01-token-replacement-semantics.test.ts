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
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-500",
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
					"spacing.tight": {
						class: [
							"p-2",
						],
					},
					"spacing.normal": {
						class: [
							"p-4",
						],
					},
					"spacing.loose": {
						class: [
							"p-6",
						],
					},
					"typography.body": {
						class: [
							"text-base",
						],
					},
					"typography.heading": {
						class: [
							"text-lg",
							"font-bold",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.default",
									"spacing.normal",
									"typography.body",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								token: [
									"spacing.tight",
									"typography.body",
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
									"spacing.loose",
									"typography.heading",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
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
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-green-100",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-green-500",
						],
					},
					"color.bg.success": {
						class: [
							"bg-green-600",
						],
					},
					"color.text.default": {
						class: [
							"text-green-900",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"color.text.success": {
						class: [
							"text-white",
						],
					},
					"spacing.tight": {
						class: [
							"p-1",
						],
					},
					"spacing.normal": {
						class: [
							"p-3",
						],
					},
					"spacing.loose": {
						class: [
							"p-5",
						],
					},
					"spacing.xl": {
						class: [
							"p-8",
						],
					},
					"typography.body": {
						class: [
							"text-sm",
						],
					},
					"typography.heading": {
						class: [
							"text-xl",
							"font-semibold",
						],
					},
					"typography.caption": {
						class: [
							"text-xs",
							"text-gray-500",
						],
					},
					"border.none": {
						class: [],
					},
					"border.rounded": {
						class: [
							"rounded-md",
						],
					},
					"border.pill": {
						class: [
							"rounded-full",
						],
					},
				},
				rules: [
					{
						match: {
							size: "xl",
						},
						slot: {
							root: {
								token: [
									"spacing.xl",
									"typography.heading",
									"border.rounded",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		// Test base component with default size
		const { slots: baseInstance } = BaseComponent.create();
		expect(baseInstance.root()).toBe(
			"bg-gray-100 text-gray-900 p-4 text-base",
		);

		// Test base component with small size
		const { slots: baseSmallInstance } = BaseComponent.create({
			variant: {
				size: "sm",
			},
		});
		expect(baseSmallInstance.root()).toBe(
			"bg-gray-100 text-gray-900 p-2 text-base",
		);

		// Test extended component with default size (should use overridden tokens)
		const { slots: extendedInstance } = ExtendedComponent.create();
		expect(extendedInstance.root()).toBe(
			"bg-green-100 text-green-900 p-3 text-sm",
		);

		// Test extended component with small size (should use overridden spacing and typography)
		const { slots: extendedSmallInstance } = ExtendedComponent.create({
			variant: {
				size: "sm",
			},
		});
		expect(extendedSmallInstance.root()).toBe(
			"bg-green-100 text-green-900 p-1 text-sm",
		);

		// Test extended component with xl size (should use new spacing, typography, and border tokens)
		const { slots: extendedXlInstance } = ExtendedComponent.create({
			variant: {
				size: "xl",
			},
		});
		expect(extendedXlInstance.root()).toBe(
			"bg-green-100 text-green-900 p-8 text-xl font-semibold rounded-md",
		);
	});
});
