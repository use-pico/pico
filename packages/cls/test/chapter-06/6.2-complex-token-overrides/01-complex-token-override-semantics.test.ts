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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-500",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-500",
					]),
					"color.bg.neutral": what.css([
						"bg-gray-100",
					]),
					"color.text.primary": what.css([
						"text-blue-900",
					]),
					"color.text.secondary": what.css([
						"text-gray-900",
					]),
					"color.text.neutral": what.css([
						"text-gray-600",
					]),
					"spacing.padding.xs": what.css([
						"p-1",
					]),
					"spacing.padding.sm": what.css([
						"p-2",
					]),
					"spacing.padding.md": what.css([
						"p-4",
					]),
					"spacing.margin.xs": what.css([
						"m-1",
					]),
					"spacing.margin.sm": what.css([
						"m-2",
					]),
					"spacing.margin.md": what.css([
						"m-4",
					]),
					"border.width.thin": what.css([
						"border",
					]),
					"border.width.medium": what.css([
						"border-2",
					]),
					"border.width.thick": what.css([
						"border-4",
					]),
					"border.radius.none": what.css([
						"rounded-none",
					]),
					"border.radius.sm": what.css([
						"rounded-sm",
					]),
					"border.radius.md": what.css([
						"rounded-md",
					]),
					"border.radius.lg": what.css([
						"rounded-lg",
					]),
				}),
				rules: [
					def.rule(
						{
							color: "primary",
							size: "medium",
							theme: "light",
						},
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
								"spacing.padding.md",
								"spacing.margin.md",
								"border.width.thin",
								"border.radius.md",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "primary",
					size: "medium",
					theme: "light",
				}),
			}),
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]), // Override base primary
					"color.bg.secondary": what.css([
						"bg-gray-600",
					]), // Override base secondary
					"color.bg.neutral": what.css([
						"bg-gray-200",
					]), // Override base neutral
					"color.bg.accent": what.css([
						"bg-purple-500",
					]), // New token
					"color.bg.warning": what.css([
						"bg-yellow-500",
					]), // New token
					"color.text.primary": what.css([
						"text-blue-800",
					]), // Override base primary
					"color.text.secondary": what.css([
						"text-gray-800",
					]), // Override base secondary
					"color.text.neutral": what.css([
						"text-gray-700",
					]), // Override base neutral
					"color.text.accent": what.css([
						"text-purple-900",
					]), // New token
					"color.text.warning": what.css([
						"text-yellow-900",
					]), // New token
					"spacing.padding.xs": what.css([
						"p-1",
					]),
					"spacing.padding.sm": what.css([
						"p-2",
					]),
					"spacing.padding.md": what.css([
						"p-4",
					]),
					"spacing.padding.lg": what.css([
						"p-6",
					]), // New token
					"spacing.padding.xl": what.css([
						"p-8",
					]), // New token
					"spacing.margin.xs": what.css([
						"m-1",
					]),
					"spacing.margin.sm": what.css([
						"m-2",
					]),
					"spacing.margin.md": what.css([
						"m-4",
					]),
					"spacing.margin.lg": what.css([
						"m-6",
					]), // New token
					"spacing.margin.xl": what.css([
						"m-8",
					]), // New token
					"border.width.thin": what.css([
						"border",
					]),
					"border.width.medium": what.css([
						"border-2",
					]),
					"border.width.thick": what.css([
						"border-4",
					]),
					"border.width.dashed": what.css([
						"border-dashed",
					]), // New token
					"border.radius.none": what.css([
						"rounded-none",
					]),
					"border.radius.sm": what.css([
						"rounded-sm",
					]),
					"border.radius.md": what.css([
						"rounded-md",
					]),
					"border.radius.lg": what.css([
						"rounded-lg",
					]),
					"border.radius.xl": what.css([
						"rounded-xl",
					]), // New token
					"border.radius.full": what.css([
						"rounded-full",
					]), // New token
					"shadow.depth.none": what.css([
						"shadow-none",
					]),
					"shadow.depth.sm": what.css([
						"shadow-sm",
					]),
					"shadow.depth.md": what.css([
						"shadow-md",
					]),
					"shadow.depth.lg": what.css([
						"shadow-lg",
					]),
					"shadow.depth.xl": what.css([
						"shadow-xl",
					]),
				}),
				rules: [
					def.rule(
						{
							color: "accent",
							size: "large",
							theme: "dark",
						},
						{
							root: what.token([
								"color.bg.accent",
								"color.text.accent",
								"spacing.padding.lg",
								"spacing.margin.lg",
								"border.width.medium",
								"border.radius.lg",
								"shadow.depth.md",
							]),
						},
					),
					def.rule(
						{
							color: "warning",
							size: "xl",
							theme: "auto",
						},
						{
							root: what.token([
								"color.bg.warning",
								"color.text.warning",
								"spacing.padding.xl",
								"spacing.margin.xl",
								"border.width.dashed",
								"border.radius.full",
								"shadow.depth.xl",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "accent",
					size: "large",
					theme: "dark",
				}),
			}),
		);

		// Test BaseComponent default behavior
		const baseDefault = BaseComponent.create();
		expect(baseDefault.root()).toBe(
			"bg-blue-500 text-blue-900 p-4 m-4 border rounded-md",
		);

		// Test ExtendedComponent default behavior (should use overridden tokens)
		const extendedDefault = ExtendedComponent.create();
		expect(extendedDefault.root()).toBe(
			"bg-purple-500 text-purple-900 p-6 m-6 border-2 rounded-lg shadow-md",
		);

		// Test ExtendedComponent with new variants
		const extendedAccent = ExtendedComponent.create(() => ({
			variant: {
				color: "accent",
				size: "large",
				theme: "dark",
			},
		}));
		expect(extendedAccent.root()).toBe(
			"bg-purple-500 text-purple-900 p-6 m-6 border-2 rounded-lg shadow-md",
		);

		// Test ExtendedComponent with warning variant
		const extendedWarning = ExtendedComponent.create(() => ({
			variant: {
				color: "warning",
				size: "xl",
				theme: "auto",
			},
		}));
		expect(extendedWarning.root()).toBe(
			"bg-yellow-500 text-yellow-900 p-8 m-8 border-dashed rounded-full shadow-xl",
		);

		// Test that inherited variants still work with overridden tokens
		const extendedInherited = ExtendedComponent.create(() => ({
			variant: {
				color: "primary",
				size: "medium",
				theme: "light",
			},
		}));
		expect(extendedInherited.root()).toBe(
			"bg-blue-600 text-blue-800 p-4 m-4 border rounded-md",
		);
	});
});
