import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("6.2 Complex Token Overrides - Complex Token Override Semantics", () => {
	it("should handle complex token overrides with proper precedence and merging", () => {
		// Base component with comprehensive token system
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.neutral",
					"color.text.primary",
					"color.text.secondary",
					"color.text.neutral",
					"spacing.padding.xs",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.margin.xs",
					"spacing.margin.sm",
					"spacing.margin.md",
					"border.width.thin",
					"border.width.medium",
					"border.width.thick",
					"border.radius.none",
					"border.radius.sm",
					"border.radius.md",
					"border.radius.lg",
				],
				slot: [
					"root",
					"header",
					"content",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"neutral",
					],
					size: [
						"small",
						"medium",
						"large",
					],
					theme: [
						"light",
						"dark",
					],
				},
			},
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-blue-500",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-500",
						],
					},
					"color.bg.neutral": {
						class: [
							"bg-gray-100",
						],
					},
					"color.text.primary": {
						class: [
							"text-blue-900",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.neutral": {
						class: [
							"text-gray-600",
						],
					},
					"spacing.padding.xs": {
						class: [
							"p-1",
						],
					},
					"spacing.padding.sm": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.md": {
						class: [
							"p-4",
						],
					},
					"spacing.margin.xs": {
						class: [
							"m-1",
						],
					},
					"spacing.margin.sm": {
						class: [
							"m-2",
						],
					},
					"spacing.margin.md": {
						class: [
							"m-4",
						],
					},
					"border.width.thin": {
						class: [
							"border",
						],
					},
					"border.width.medium": {
						class: [
							"border-2",
						],
					},
					"border.width.thick": {
						class: [
							"border-4",
						],
					},
					"border.radius.none": {
						class: [
							"rounded-none",
						],
					},
					"border.radius.sm": {
						class: [
							"rounded-sm",
						],
					},
					"border.radius.md": {
						class: [
							"rounded-md",
						],
					},
					"border.radius.lg": {
						class: [
							"rounded-lg",
						],
					},
				},
				rules: [
					{
						match: {
							color: "primary",
							size: "medium",
							theme: "light",
						},
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.md",
									"spacing.margin.md",
									"border.width.thin",
									"border.radius.md",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "medium",
					theme: "light",
				},
			},
		);

		// Extended component that overrides and extends tokens
		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.neutral",
					"color.bg.accent",
					"color.bg.warning",
					"color.text.primary",
					"color.text.secondary",
					"color.text.neutral",
					"color.text.accent",
					"color.text.warning",
					"spacing.padding.xs",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
					"spacing.padding.xl",
					"spacing.margin.xs",
					"spacing.margin.sm",
					"spacing.margin.md",
					"spacing.margin.lg",
					"spacing.margin.xl",
					"border.width.thin",
					"border.width.medium",
					"border.width.thick",
					"border.width.dashed",
					"border.radius.none",
					"border.radius.sm",
					"border.radius.md",
					"border.radius.lg",
					"border.radius.xl",
					"border.radius.full",
					"shadow.depth.none",
					"shadow.depth.sm",
					"shadow.depth.md",
					"shadow.depth.lg",
					"shadow.depth.xl",
				],
				slot: [
					"root",
					"header",
					"content",
					"footer",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"neutral",
						"accent",
						"warning",
					],
					size: [
						"small",
						"medium",
						"large",
						"xl",
					],
					theme: [
						"light",
						"dark",
						"auto",
					],
				},
			},
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-600",
						],
					},
					"color.bg.neutral": {
						class: [
							"bg-gray-200",
						],
					},
					"color.bg.accent": {
						class: [
							"bg-purple-500",
						],
					},
					"color.bg.warning": {
						class: [
							"bg-yellow-500",
						],
					},
					"color.text.primary": {
						class: [
							"text-blue-800",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-800",
						],
					},
					"color.text.neutral": {
						class: [
							"text-gray-700",
						],
					},
					"color.text.accent": {
						class: [
							"text-purple-900",
						],
					},
					"color.text.warning": {
						class: [
							"text-yellow-900",
						],
					},
					"spacing.padding.xs": {
						class: [
							"p-1",
						],
					},
					"spacing.padding.sm": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.md": {
						class: [
							"p-4",
						],
					},
					"spacing.padding.lg": {
						class: [
							"p-6",
						],
					},
					"spacing.padding.xl": {
						class: [
							"p-8",
						],
					},
					"spacing.margin.xs": {
						class: [
							"m-1",
						],
					},
					"spacing.margin.sm": {
						class: [
							"m-2",
						],
					},
					"spacing.margin.md": {
						class: [
							"m-4",
						],
					},
					"spacing.margin.lg": {
						class: [
							"m-6",
						],
					},
					"spacing.margin.xl": {
						class: [
							"m-8",
						],
					},
					"border.width.thin": {
						class: [
							"border",
						],
					},
					"border.width.medium": {
						class: [
							"border-2",
						],
					},
					"border.width.thick": {
						class: [
							"border-4",
						],
					},
					"border.width.dashed": {
						class: [
							"border-dashed",
						],
					},
					"border.radius.none": {
						class: [
							"rounded-none",
						],
					},
					"border.radius.sm": {
						class: [
							"rounded-sm",
						],
					},
					"border.radius.md": {
						class: [
							"rounded-md",
						],
					},
					"border.radius.lg": {
						class: [
							"rounded-lg",
						],
					},
					"border.radius.xl": {
						class: [
							"rounded-xl",
						],
					},
					"border.radius.full": {
						class: [
							"rounded-full",
						],
					},
					"shadow.depth.none": {
						class: [
							"shadow-none",
						],
					},
					"shadow.depth.sm": {
						class: [
							"shadow-sm",
						],
					},
					"shadow.depth.md": {
						class: [
							"shadow-md",
						],
					},
					"shadow.depth.lg": {
						class: [
							"shadow-lg",
						],
					},
					"shadow.depth.xl": {
						class: [
							"shadow-xl",
						],
					},
				},
				rules: [
					{
						match: {
							color: "accent",
							size: "large",
							theme: "dark",
						},
						slot: {
							root: {
								token: [
									"color.bg.accent",
									"color.text.accent",
									"spacing.padding.lg",
									"spacing.margin.lg",
									"border.width.medium",
									"border.radius.lg",
									"shadow.depth.md",
								],
							},
						},
					},
					{
						match: {
							color: "warning",
							size: "xl",
							theme: "auto",
						},
						slot: {
							root: {
								token: [
									"color.bg.warning",
									"color.text.warning",
									"spacing.padding.xl",
									"spacing.margin.xl",
									"border.width.dashed",
									"border.radius.full",
									"shadow.depth.xl",
								],
							},
						},
					},
				],
				defaults: {
					color: "accent",
					size: "large",
					theme: "dark",
				},
			},
		);

		// Test BaseComponent default behavior
		const { slots: baseDefault } = BaseComponent.create();
		expect(baseDefault.root()).toBe(
			"bg-blue-500 text-blue-900 p-4 m-4 border rounded-md",
		);

		// Test ExtendedComponent default behavior (should use overridden tokens)
		const { slots: extendedDefault } = ExtendedComponent.create();
		expect(extendedDefault.root()).toBe(
			"bg-purple-500 text-purple-900 p-6 m-6 border-2 rounded-lg shadow-md",
		);

		// Test ExtendedComponent with new variants
		const { slots: extendedAccent } = ExtendedComponent.create({
			variant: {
				color: "accent",
				size: "large",
				theme: "dark",
			},
		});
		expect(extendedAccent.root()).toBe(
			"bg-purple-500 text-purple-900 p-6 m-6 border-2 rounded-lg shadow-md",
		);

		// Test ExtendedComponent with warning variant
		const { slots: extendedWarning } = ExtendedComponent.create({
			variant: {
				color: "warning",
				size: "xl",
				theme: "auto",
			},
		});
		expect(extendedWarning.root()).toBe(
			"bg-yellow-500 text-yellow-900 p-8 m-8 border-dashed rounded-full shadow-xl",
		);

		// Test that inherited variants still work with overridden tokens
		const { slots: extendedInherited } = ExtendedComponent.create({
			variant: {
				color: "primary",
				size: "medium",
				theme: "light",
			},
		});
		expect(extendedInherited.root()).toBe(
			"bg-blue-600 text-blue-800 p-4 m-4 border rounded-md",
		);
	});
});
