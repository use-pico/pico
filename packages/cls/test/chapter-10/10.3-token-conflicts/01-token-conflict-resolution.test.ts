import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("10.3 Token Conflicts", () => {
	it("should handle token conflicts and resolve them with proper precedence", () => {
		// Base component with basic tokens
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.text.default",
					"color.text.primary",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"default",
						"primary",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.text.default": [
						"text-gray-900",
					],
					"color.text.primary": [
						"text-white",
					],
					"spacing.padding.sm": [
						"px-2",
						"py-1",
					],
					"spacing.padding.md": [
						"px-4",
						"py-2",
					],
					"spacing.padding.lg": [
						"px-6",
						"py-3",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"spacing.padding.md",
						]),
					}),
					def.rule(
						{
							color: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"spacing.padding.lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					size: "md",
				}),
			}),
		);

		// Extended component that overrides some tokens
		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.success",
					"color.text.success",
					"spacing.padding.xl",
					"border.radius.none",
					"border.radius.sm",
					"border.radius.md",
					"border.radius.lg",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"default",
						"primary",
						"success",
					],
					size: [
						"sm",
						"md",
						"lg",
						"xl",
					],
					radius: [
						"none",
						"sm",
						"md",
						"lg",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.success": [
						"bg-green-500",
					], // New token
					"color.text.success": [
						"text-white",
					], // New token
					"spacing.padding.xl": [
						"px-8",
						"py-4",
					], // New size
					"border.radius.none": [
						"rounded-none",
					],
					"border.radius.sm": [
						"rounded-sm",
					],
					"border.radius.md": [
						"rounded-md",
					],
					"border.radius.lg": [
						"rounded-lg",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"spacing.padding.md",
							"border.radius.md",
						]),
					}),
					def.rule(
						{
							color: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
							]),
						},
					),
					def.rule(
						{
							color: "success",
						},
						{
							root: what.token([
								"color.bg.success",
								"color.text.success",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"spacing.padding.lg",
							]),
						},
					),
					def.rule(
						{
							size: "xl",
						},
						{
							root: what.token([
								"spacing.padding.xl",
							]),
						},
					),
					def.rule(
						{
							radius: "none",
						},
						{
							root: what.token([
								"border.radius.none",
							]),
						},
					),
					def.rule(
						{
							radius: "lg",
						},
						{
							root: what.token([
								"border.radius.lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					size: "md",
					radius: "md",
				}),
			}),
		);

		// Test base component behavior
		const baseDefault = BaseComponent.create();
		expect(baseDefault.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2",
		);

		const basePrimary = BaseComponent.create(() => ({
			variant: {
				color: "primary",
			},
		}));
		expect(basePrimary.root()).toBe("px-4 py-2 bg-blue-500 text-white");

		// Test extended component behavior - should inherit base tokens since no overrides defined
		const extendedDefault = ExtendedComponent.create();
		expect(extendedDefault.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 rounded-md",
		);

		const extendedPrimary = ExtendedComponent.create(() => ({
			variant: {
				color: "primary",
			},
		}));
		expect(extendedPrimary.root()).toBe(
			"px-4 py-2 rounded-md bg-blue-500 text-white",
		);

		// Test new tokens in extended component
		const extendedSuccess = ExtendedComponent.create(() => ({
			variant: {
				color: "success",
			},
		}));
		expect(extendedSuccess.root()).toBe(
			"px-4 py-2 rounded-md bg-green-500 text-white",
		);

		// Test size variants with overridden tokens
		const extendedSmall = ExtendedComponent.create(() => ({
			variant: {
				size: "sm",
			},
		}));
		expect(extendedSmall.root()).toBe(
			"bg-gray-100 text-gray-900 rounded-md px-2 py-1",
		);

		const extendedLarge = ExtendedComponent.create(() => ({
			variant: {
				size: "lg",
			},
		}));
		expect(extendedLarge.root()).toBe(
			"bg-gray-100 text-gray-900 rounded-md px-6 py-3",
		);

		// Test new size variant
		const extendedXl = ExtendedComponent.create(() => ({
			variant: {
				size: "xl",
			},
		}));
		expect(extendedXl.root()).toBe(
			"bg-gray-100 text-gray-900 rounded-md px-8 py-4",
		);

		// Test radius variants
		const extendedNoRadius = ExtendedComponent.create(() => ({
			variant: {
				radius: "none",
			},
		}));
		expect(extendedNoRadius.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 rounded-none",
		);

		const extendedLargeRadius = ExtendedComponent.create(() => ({
			variant: {
				radius: "lg",
			},
		}));
		expect(extendedLargeRadius.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 rounded-lg",
		);

		// Test complex combinations
		const extendedComplex = ExtendedComponent.create(() => ({
			variant: {
				color: "success",
				size: "xl",
				radius: "lg",
			},
		}));
		expect(extendedComplex.root()).toBe(
			"bg-green-500 text-white px-8 py-4 rounded-lg",
		);

		// Test that use method preserves token conflicts resolution
		const ComponentGroup = BaseComponent.use(ExtendedComponent);
		expect(typeof ComponentGroup.create).toBe("function");

		// Test runtime access to extended tokens
		const groupInstance = ComponentGroup as any;
		const groupSuccess = groupInstance.create(() => ({
			variant: {
				color: "success",
			},
		}));
		expect(groupSuccess.root()).toBe(
			"px-4 py-2 rounded-md bg-green-500 text-white",
		);

		const groupXl = groupInstance.create(() => ({
			variant: {
				size: "xl",
			},
		}));
		expect(groupXl.root()).toBe(
			"bg-gray-100 text-gray-900 rounded-md px-8 py-4",
		);
	});
});
