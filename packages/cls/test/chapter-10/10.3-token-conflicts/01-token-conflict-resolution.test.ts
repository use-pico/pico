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
					"spacing.padding.sm": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"spacing.padding.md": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"spacing.padding.lg": {
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
								token: [
									"color.bg.default",
									"color.text.default",
									"spacing.padding.md",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
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
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								token: [
									"spacing.padding.sm",
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
									"spacing.padding.lg",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
					size: "md",
				},
			},
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
			{
				token: {
					"color.bg.success": {
						class: [
							"bg-green-500",
						],
					}, // New token
					"color.text.success": {
						class: [
							"text-white",
						],
					}, // New token
					"spacing.padding.xl": {
						class: [
							"px-8",
							"py-4",
						],
					}, // New size
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
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.default",
									"spacing.padding.md",
									"border.radius.md",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
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
					{
						match: {
							color: "success",
						},
						slot: {
							root: {
								token: [
									"color.bg.success",
									"color.text.success",
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
									"spacing.padding.sm",
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
									"spacing.padding.lg",
								],
							},
						},
					},
					{
						match: {
							size: "xl",
						},
						slot: {
							root: {
								token: [
									"spacing.padding.xl",
								],
							},
						},
					},
					{
						match: {
							radius: "none",
						},
						slot: {
							root: {
								token: [
									"border.radius.none",
								],
							},
						},
					},
					{
						match: {
							radius: "lg",
						},
						slot: {
							root: {
								token: [
									"border.radius.lg",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
					size: "md",
					radius: "md",
				},
			},
		);

		// Test base component behavior
		const { slots: baseDefault } = BaseComponent.create();
		expect(baseDefault.root()).toBe("bg-gray-100 text-gray-900 px-4 py-2");

		const { slots: basePrimary } = BaseComponent.create({
			variant: {
				color: "primary",
			},
		});
		expect(basePrimary.root()).toBe("px-4 py-2 bg-blue-500 text-white");

		// Test extended component behavior - should inherit base tokens since no overrides defined
		const { slots: extendedDefault } = ExtendedComponent.create();
		expect(extendedDefault.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 rounded-md",
		);

		const { slots: extendedPrimary } = ExtendedComponent.create({
			variant: {
				color: "primary",
			},
		});
		expect(extendedPrimary.root()).toBe(
			"px-4 py-2 rounded-md bg-blue-500 text-white",
		);

		// Test new tokens in extended component
		const { slots: extendedSuccess } = ExtendedComponent.create({
			variant: {
				color: "success",
			},
		});
		expect(extendedSuccess.root()).toBe(
			"px-4 py-2 rounded-md bg-green-500 text-white",
		);

		// Test size variants with overridden tokens
		const { slots: extendedSmall } = ExtendedComponent.create({
			variant: {
				size: "sm",
			},
		});
		expect(extendedSmall.root()).toBe(
			"bg-gray-100 text-gray-900 rounded-md px-2 py-1",
		);

		const { slots: extendedLarge } = ExtendedComponent.create({
			variant: {
				size: "lg",
			},
		});
		expect(extendedLarge.root()).toBe(
			"bg-gray-100 text-gray-900 rounded-md px-6 py-3",
		);

		// Test new size variant
		const { slots: extendedXl } = ExtendedComponent.create({
			variant: {
				size: "xl",
			},
		});
		expect(extendedXl.root()).toBe(
			"bg-gray-100 text-gray-900 rounded-md px-8 py-4",
		);

		// Test radius variants
		const { slots: extendedNoRadius } = ExtendedComponent.create({
			variant: {
				radius: "none",
			},
		});
		expect(extendedNoRadius.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 rounded-none",
		);

		const { slots: extendedLargeRadius } = ExtendedComponent.create({
			variant: {
				radius: "lg",
			},
		});
		expect(extendedLargeRadius.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 rounded-lg",
		);

		// Test complex combinations
		const { slots: extendedComplex } = ExtendedComponent.create({
			variant: {
				color: "success",
				size: "xl",
				radius: "lg",
			},
		});
		expect(extendedComplex.root()).toBe(
			"bg-green-500 text-white px-8 py-4 rounded-lg",
		);

		// Test that use method preserves token conflicts resolution
		const ComponentGroup = BaseComponent.use(ExtendedComponent);
		expect(typeof ComponentGroup.create).toBe("function");

		// Test runtime access to extended tokens
		const groupInstance = ComponentGroup as any;
		const { slots: groupSuccess } = groupInstance.create({
			variant: {
				color: "success",
			},
		});
		expect(groupSuccess.root()).toBe(
			"px-4 py-2 rounded-md bg-green-500 text-white",
		);

		const { slots: groupXl } = groupInstance.create({
			variant: {
				size: "xl",
			},
		});
		expect(groupXl.root()).toBe(
			"bg-gray-100 text-gray-900 rounded-md px-8 py-4",
		);
	});
});
