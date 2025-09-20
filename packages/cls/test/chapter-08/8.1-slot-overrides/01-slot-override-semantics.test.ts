import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("8.1 Slot Overrides", () => {
	it("should allow overriding specific slots while preserving others", () => {
		// Base component with multiple slots
		const MultiSlotComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.bg.success",
					"color.bg.warning",
					"color.bg.danger",
					"color.text.default",
					"color.text.primary",
					"color.text.success",
					"color.text.warning",
					"color.text.danger",
					"size.spacing.sm",
					"size.spacing.md",
					"size.spacing.lg",
					"size.typography.sm",
					"size.typography.md",
					"size.typography.lg",
					"border.style.none",
					"border.style.solid",
					"border.style.dashed",
					"border.width.0",
					"border.width.1",
					"border.width.2",
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
					color: [
						"default",
						"primary",
						"success",
						"warning",
						"danger",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
					border: [
						"none",
						"solid",
						"dashed",
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
					"color.bg.success": {
						class: [
							"bg-green-500",
						],
					},
					"color.bg.warning": {
						class: [
							"bg-yellow-500",
						],
					},
					"color.bg.danger": {
						class: [
							"bg-red-500",
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
					"color.text.success": {
						class: [
							"text-white",
						],
					},
					"color.text.warning": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.danger": {
						class: [
							"text-white",
						],
					},
					"size.spacing.sm": {
						class: [
							"p-2",
						],
					},
					"size.spacing.md": {
						class: [
							"p-4",
						],
					},
					"size.spacing.lg": {
						class: [
							"p-6",
						],
					},
					"size.typography.sm": {
						class: [
							"text-sm",
						],
					},
					"size.typography.md": {
						class: [
							"text-base",
						],
					},
					"size.typography.lg": {
						class: [
							"text-lg",
						],
					},
					"border.style.none": {
						class: [],
					},
					"border.style.solid": {
						class: [
							"border",
						],
					},
					"border.style.dashed": {
						class: [
							"border-dashed",
						],
					},
					"border.width.0": {
						class: [],
					},
					"border.width.1": {
						class: [
							"border",
						],
					},
					"border.width.2": {
						class: [
							"border-2",
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
									"size.spacing.md",
									"size.typography.md",
								],
							},
							header: {
								class: [
									"border-b",
									"border-gray-200",
									"pb-2",
									"mb-2",
									"font-semibold",
								],
							},
							content: {
								class: [
									"min-h-0",
									"flex-1",
									"leading-relaxed",
								],
							},
							footer: {
								class: [
									"border-t",
									"border-gray-200",
									"pt-2",
									"mt-2",
									"text-sm",
									"text-gray-600",
								],
							},
							sidebar: {
								class: [
									"w-64",
									"bg-gray-50",
									"p-4",
									"border-r",
									"border-gray-200",
								],
							},
							actions: {
								class: [
									"flex",
									"gap-2",
									"justify-end",
									"mt-4",
								],
							},
						},
					},
					// Color variant rules
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
							header: {
								class: [
									"border-blue-200",
								],
							},
							footer: {
								class: [
									"border-blue-200",
									"text-blue-600",
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
							header: {
								class: [
									"border-green-200",
								],
							},
							footer: {
								class: [
									"border-green-200",
									"text-green-600",
								],
							},
						},
					},
					{
						match: {
							color: "warning",
						},
						slot: {
							root: {
								token: [
									"color.bg.warning",
									"color.text.warning",
								],
							},
							header: {
								class: [
									"border-yellow-200",
								],
							},
							footer: {
								class: [
									"border-yellow-200",
									"text-yellow-600",
								],
							},
						},
					},
					{
						match: {
							color: "danger",
						},
						slot: {
							root: {
								token: [
									"color.bg.danger",
									"color.text.danger",
								],
							},
							header: {
								class: [
									"border-red-200",
								],
							},
							footer: {
								class: [
									"border-red-200",
									"text-red-600",
								],
							},
						},
					},
					// Size variant rules
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								token: [
									"size.spacing.sm",
									"size.typography.sm",
								],
							},
							header: {
								class: [
									"text-sm",
									"pb-1",
									"mb-1",
								],
							},
							content: {
								class: [
									"text-sm",
								],
							},
							footer: {
								class: [
									"text-xs",
									"pt-1",
									"mt-1",
								],
							},
							sidebar: {
								class: [
									"w-48",
									"p-2",
								],
							},
							actions: {
								class: [
									"gap-1",
									"mt-2",
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
									"size.spacing.lg",
									"size.typography.lg",
								],
							},
							header: {
								class: [
									"text-lg",
									"pb-3",
									"mb-3",
								],
							},
							content: {
								class: [
									"text-lg",
								],
							},
							footer: {
								class: [
									"text-base",
									"pt-3",
									"mt-3",
								],
							},
							sidebar: {
								class: [
									"w-80",
									"p-6",
								],
							},
							actions: {
								class: [
									"gap-3",
									"mt-6",
								],
							},
						},
					},
					// Border variant rules
					{
						match: {
							border: "solid",
						},
						slot: {
							root: {
								token: [
									"border.style.solid",
									"border.width.1",
								],
							},
							header: {
								class: [
									"border-b-2",
								],
							},
							footer: {
								class: [
									"border-t-2",
								],
							},
							sidebar: {
								class: [
									"border-r-2",
								],
							},
						},
					},
					{
						match: {
							border: "dashed",
						},
						slot: {
							root: {
								token: [
									"border.style.dashed",
									"border.width.1",
								],
							},
							header: {
								class: [
									"border-b-2",
									"border-dashed",
								],
							},
							footer: {
								class: [
									"border-t-2",
									"border-dashed",
								],
							},
							sidebar: {
								class: [
									"border-r-2",
									"border-dashed",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
					size: "md",
					border: "none",
				},
			},
		);

		// Test default state
		const { slots: defaultInstance } = MultiSlotComponent.create();
		expect(defaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 p-4 text-base",
		);
		expect(defaultInstance.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2 font-semibold",
		);
		expect(defaultInstance.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(defaultInstance.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm text-gray-600",
		);
		expect(defaultInstance.sidebar()).toBe(
			"w-64 bg-gray-50 p-4 border-r border-gray-200",
		);
		expect(defaultInstance.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test slot override - only override the header slot
		const { slots: headerOverride } = MultiSlotComponent.create({
			slot: {
				header: {
					class: [
						"bg-blue-50",
						"text-blue-900",
						"border-b-2",
						"border-blue-300",
						"pb-3",
						"mb-3",
						"font-bold",
						"text-lg",
					],
				},
			},
		});
		expect(headerOverride.root()).toBe(
			"bg-gray-100 text-gray-900 p-4 text-base",
		);
		expect(headerOverride.header()).toBe(
			"bg-blue-50 text-blue-900 border-b-2 border-blue-300 pb-3 mb-3 font-bold text-lg",
		);
		expect(headerOverride.content()).toBe("min-h-0 flex-1 leading-relaxed");
		expect(headerOverride.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm text-gray-600",
		);
		expect(headerOverride.sidebar()).toBe(
			"w-64 bg-gray-50 p-4 border-r border-gray-200",
		);
		expect(headerOverride.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test slot override - override multiple slots while preserving others
		const { slots: multipleSlotOverride } = MultiSlotComponent.create({
			slot: {
				content: {
					class: [
						"bg-gray-50",
						"p-4",
						"rounded-lg",
						"border",
						"border-gray-200",
					],
				},
				actions: {
					class: [
						"bg-blue-100",
						"p-3",
						"rounded-md",
						"border",
						"border-blue-200",
					],
				},
			},
		});
		expect(multipleSlotOverride.root()).toBe(
			"bg-gray-100 text-gray-900 p-4 text-base",
		);
		expect(multipleSlotOverride.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2 font-semibold",
		);
		expect(multipleSlotOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200",
		);
		expect(multipleSlotOverride.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm text-gray-600",
		);
		expect(multipleSlotOverride.sidebar()).toBe(
			"w-64 bg-gray-50 p-4 border-r border-gray-200",
		);
		expect(multipleSlotOverride.actions()).toBe(
			"flex gap-2 justify-end mt-4 bg-blue-100 p-3 rounded-md border border-blue-200",
		);

		// Test slot override with token references
		const { slots: tokenSlotOverride } = MultiSlotComponent.create({
			slot: {
				root: {
					token: [
						"color.bg.warning",
						"color.text.warning",
					],
				},
				sidebar: {
					class: [
						"p-6",
					],
				},
			},
		});
		expect(tokenSlotOverride.root()).toBe(
			"p-4 text-base bg-yellow-500 text-gray-900",
		);
		expect(tokenSlotOverride.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2 font-semibold",
		);
		expect(tokenSlotOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(tokenSlotOverride.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm text-gray-600",
		);
		expect(tokenSlotOverride.sidebar()).toBe(
			"w-64 bg-gray-50 border-r border-gray-200 p-6",
		);
		expect(tokenSlotOverride.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test slot override with mixed CSS and tokens
		const { slots: mixedSlotOverride } = MultiSlotComponent.create({
			slot: {
				header: {
					class: [
						"bg-gradient-to-r",
						"from-blue-500",
						"to-purple-500",
						"text-white",
					],
				},
				footer: {
					token: [
						"color.bg.danger",
						"color.text.danger",
					],
				},
			},
		});
		expect(mixedSlotOverride.root()).toBe(
			"bg-gray-100 text-gray-900 p-4 text-base",
		);
		expect(mixedSlotOverride.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white",
		);
		expect(mixedSlotOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(mixedSlotOverride.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm bg-red-500 text-white",
		);
		expect(mixedSlotOverride.sidebar()).toBe(
			"w-64 bg-gray-50 p-4 border-r border-gray-200",
		);
		expect(mixedSlotOverride.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test that non-overridden slots still inherit variant styles
		const { slots: variantPreservation } = MultiSlotComponent.create({
			variant: {
				color: "danger",
				size: "lg",
			},
			slot: {
				// Only override actions, leave others to inherit
				actions: {
					class: [
						"bg-red-100",
						"text-red-800",
						"border-red-300",
					],
				},
			},
		});
		expect(variantPreservation.root()).toBe(
			"bg-red-500 text-white p-6 text-lg",
		);
		expect(variantPreservation.header()).toBe(
			"border-b font-semibold border-red-200 text-lg pb-3 mb-3",
		);
		expect(variantPreservation.content()).toBe("min-h-0 flex-1 text-lg");
		expect(variantPreservation.footer()).toBe(
			"border-t border-red-200 text-red-600 text-base pt-3 mt-3",
		);
		expect(variantPreservation.sidebar()).toBe(
			"bg-gray-50 border-r border-gray-200 w-80 p-6",
		);
		expect(variantPreservation.actions()).toBe(
			"flex justify-end gap-3 mt-6 bg-red-100 text-red-800 border-red-300",
		);
	});
});
