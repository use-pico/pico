import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("6.3 Slot Inheritance - Slot Inheritance and Overrides", () => {
	it("should handle slot inheritance with proper override and extension behavior", () => {
		// Base component with multiple slots
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.text.default",
					"color.text.primary",
					"spacing.sm",
					"spacing.md",
					"spacing.lg",
				],
				slot: [
					"root",
					"header",
					"content",
					"footer",
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
					"spacing.sm": {
						class: [
							"p-2",
						],
					},
					"spacing.md": {
						class: [
							"p-4",
						],
					},
					"spacing.lg": {
						class: [
							"p-6",
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
									"spacing.md",
								],
							},
							header: {
								class: [
									"border-b",
									"border-gray-200",
									"pb-2",
									"mb-2",
								],
							},
							content: {
								class: [
									"min-h-0",
									"flex-1",
								],
							},
							footer: {
								class: [
									"border-t",
									"border-gray-200",
									"pt-2",
									"mt-2",
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
									"spacing.sm",
								],
							},
							header: {
								class: [
									"text-sm",
								],
							},
							content: {
								class: [
									"text-sm",
								],
							},
							footer: {
								class: [
									"text-sm",
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
								class: [
									"spacing.lg",
								],
							},
							header: {
								class: [
									"text-lg",
									"font-semibold",
								],
							},
							content: {
								class: [
									"text-lg",
								],
							},
							footer: {
								class: [
									"text-lg",
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

		// Extended component that adds new slots and overrides existing ones
		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.bg.success",
					"color.text.default",
					"color.text.primary",
					"color.text.success",
					"spacing.sm",
					"spacing.md",
					"spacing.lg",
					"spacing.xl",
				],
				slot: [
					"root",
					"header",
					"content",
					"footer",
					"sidebar",
					"actions",
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
					"spacing.sm": {
						class: [
							"p-1",
						],
					},
					"spacing.md": {
						class: [
							"p-3",
						],
					},
					"spacing.lg": {
						class: [
							"p-5",
						],
					},
					"spacing.xl": {
						class: [
							"p-8",
						],
					},
				},
				rules: [
					{
						slot: {
							header: {
								class: [
									"bg-green-50",
									"border-green-200",
								],
							},
							sidebar: {
								class: [
									"w-64",
									"bg-gray-50",
									"border-r",
									"border-gray-200",
								],
							},
							actions: {
								class: [
									"flex",
									"gap-2",
									"justify-end",
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
									"spacing.xl",
								],
							},
							header: {
								class: [
									"text-xl",
									"font-bold",
								],
							},
							sidebar: {
								class: [
									"w-80",
								],
							},
							actions: {
								class: [
									"gap-3",
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
		expect(baseInstance.root()).toBe("bg-gray-100 text-gray-900 p-4");
		expect(baseInstance.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2",
		);
		expect(baseInstance.content()).toBe("min-h-0 flex-1");
		expect(baseInstance.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2",
		);

		// Test base component with small size
		const { slots: baseSmallInstance } = BaseComponent.create({
			variant: {
				size: "sm",
			},
		});
		expect(baseSmallInstance.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2 text-sm",
		);
		expect(baseSmallInstance.content()).toBe("min-h-0 flex-1 text-sm");
		expect(baseSmallInstance.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm",
		);

		// Test extended component with default size (should inherit and override slots)
		const { slots: extendedInstance } = ExtendedComponent.create();
		expect(extendedInstance.root()).toBe("bg-green-100 text-green-900 p-3");
		expect(extendedInstance.header()).toBe(
			"border-b pb-2 mb-2 bg-green-50 border-green-200",
		);
		expect(extendedInstance.content()).toBe("min-h-0 flex-1");
		expect(extendedInstance.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2",
		);
		expect(extendedInstance.sidebar()).toBe(
			"w-64 bg-gray-50 border-r border-gray-200",
		);
		expect(extendedInstance.actions()).toBe("flex gap-2 justify-end");

		// Test extended component with xl size (should use new spacing and typography)
		const { slots: extendedXlInstance } = ExtendedComponent.create({
			variant: {
				size: "xl",
			},
		});
		expect(extendedXlInstance.root()).toBe(
			"bg-green-100 text-green-900 p-8",
		);
		expect(extendedXlInstance.header()).toBe(
			"border-b pb-2 mb-2 bg-green-50 border-green-200 text-xl font-bold",
		);
		expect(extendedXlInstance.sidebar()).toBe(
			"bg-gray-50 border-r border-gray-200 w-80",
		);
		expect(extendedXlInstance.actions()).toBe("flex justify-end gap-3");
	});
});
