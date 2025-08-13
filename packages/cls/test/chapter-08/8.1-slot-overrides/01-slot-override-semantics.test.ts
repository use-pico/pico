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
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.bg.success": [
						"bg-green-500",
					],
					"color.bg.warning": [
						"bg-yellow-500",
					],
					"color.bg.danger": [
						"bg-red-500",
					],
					"color.text.default": [
						"text-gray-900",
					],
					"color.text.primary": [
						"text-white",
					],
					"color.text.success": [
						"text-white",
					],
					"color.text.warning": [
						"text-gray-900",
					],
					"color.text.danger": [
						"text-white",
					],
					"size.spacing.sm": [
						"p-2",
					],
					"size.spacing.md": [
						"p-4",
					],
					"size.spacing.lg": [
						"p-6",
					],
					"size.typography.sm": [
						"text-sm",
					],
					"size.typography.md": [
						"text-base",
					],
					"size.typography.lg": [
						"text-lg",
					],
					"border.style.none": [],
					"border.style.solid": [
						"border",
					],
					"border.style.dashed": [
						"border-dashed",
					],
					"border.width.0": [],
					"border.width.1": [
						"border",
					],
					"border.width.2": [
						"border-2",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"size.spacing.md",
							"size.typography.md",
						]),
						header: what.css([
							"border-b",
							"border-gray-200",
							"pb-2",
							"mb-2",
							"font-semibold",
						]),
						content: what.css([
							"min-h-0",
							"flex-1",
							"leading-relaxed",
						]),
						footer: what.css([
							"border-t",
							"border-gray-200",
							"pt-2",
							"mt-2",
							"text-sm",
							"text-gray-600",
						]),
						sidebar: what.css([
							"w-64",
							"bg-gray-50",
							"p-4",
							"border-r",
							"border-gray-200",
						]),
						actions: what.css([
							"flex",
							"gap-2",
							"justify-end",
							"mt-4",
						]),
					}),
					// Color variant rules
					def.rule(
						{
							color: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
								"color.text.primary",
							]),
							header: what.css([
								"border-blue-200",
							]),
							footer: what.css([
								"border-blue-200",
								"text-blue-600",
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
							header: what.css([
								"border-green-200",
							]),
							footer: what.css([
								"border-green-200",
								"text-green-600",
							]),
						},
					),
					def.rule(
						{
							color: "warning",
						},
						{
							root: what.token([
								"color.bg.warning",
								"color.text.warning",
							]),
							header: what.css([
								"border-yellow-200",
							]),
							footer: what.css([
								"border-yellow-200",
								"text-yellow-600",
							]),
						},
					),
					def.rule(
						{
							color: "danger",
						},
						{
							root: what.token([
								"color.bg.danger",
								"color.text.danger",
							]),
							header: what.css([
								"border-red-200",
							]),
							footer: what.css([
								"border-red-200",
								"text-red-600",
							]),
						},
					),
					// Size variant rules
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"size.spacing.sm",
								"size.typography.sm",
							]),
							header: what.css([
								"text-sm",
								"pb-1",
								"mb-1",
							]),
							content: what.css([
								"text-sm",
							]),
							footer: what.css([
								"text-xs",
								"pt-1",
								"mt-1",
							]),
							sidebar: what.css([
								"w-48",
								"p-2",
							]),
							actions: what.css([
								"gap-1",
								"mt-2",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"size.spacing.lg",
								"size.typography.lg",
							]),
							header: what.css([
								"text-lg",
								"pb-3",
								"mb-3",
							]),
							content: what.css([
								"text-lg",
							]),
							footer: what.css([
								"text-base",
								"pt-3",
								"mt-3",
							]),
							sidebar: what.css([
								"w-80",
								"p-6",
							]),
							actions: what.css([
								"gap-3",
								"mt-6",
							]),
						},
					),
					// Border variant rules
					def.rule(
						{
							border: "solid",
						},
						{
							root: what.token([
								"border.style.solid",
								"border.width.1",
							]),
							header: what.css([
								"border-b-2",
							]),
							footer: what.css([
								"border-t-2",
							]),
							sidebar: what.css([
								"border-r-2",
							]),
						},
					),
					def.rule(
						{
							border: "dashed",
						},
						{
							root: what.token([
								"border.style.dashed",
								"border.width.1",
							]),
							header: what.css([
								"border-b-2",
								"border-dashed",
							]),
							footer: what.css([
								"border-t-2",
								"border-dashed",
							]),
							sidebar: what.css([
								"border-r-2",
								"border-dashed",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					size: "md",
					border: "none",
				}),
			}),
		);

		// Test default state
		const defaultInstance = MultiSlotComponent.create();
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
		const headerOverride = MultiSlotComponent.create(({ what }) => ({
			slot: {
				header: what.css([
					"bg-blue-50",
					"text-blue-900",
					"border-b-2",
					"border-blue-300",
					"pb-3",
					"mb-3",
					"font-bold",
					"text-lg",
				]),
			},
		}));
		expect(headerOverride.root()).toBe(
			"bg-gray-100 text-gray-900 p-4 text-base",
		);
		expect(headerOverride.header()).toBe(
			"bg-blue-50 text-blue-900 border-b-2 border-blue-300 pb-3 mb-3 font-bold text-lg",
		);
		expect(headerOverride.content()).toBe(
			"min-h-0 flex-1 leading-relaxed",
		);
		expect(headerOverride.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm text-gray-600",
		);
		expect(headerOverride.sidebar()).toBe(
			"w-64 bg-gray-50 p-4 border-r border-gray-200",
		);
		expect(headerOverride.actions()).toBe("flex gap-2 justify-end mt-4");

		// Test slot override - override multiple slots while preserving others
		const multipleSlotOverride = MultiSlotComponent.create(
			({ what }) => ({
				slot: {
					content: what.css([
						"bg-gray-50",
						"p-4",
						"rounded-lg",
						"border",
						"border-gray-200",
					]),
					actions: what.css([
						"bg-blue-100",
						"p-3",
						"rounded-md",
						"border",
						"border-blue-200",
					]),
				},
			}),
		);
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
		const tokenSlotOverride = MultiSlotComponent.create(({ what }) => ({
			slot: {
				root: what.token([
					"color.bg.warning",
					"color.text.warning",
				]),
				sidebar: what.css([
					"p-6",
				]),
			},
		}));
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
		expect(tokenSlotOverride.actions()).toBe(
			"flex gap-2 justify-end mt-4",
		);

		// Test slot override with mixed CSS and tokens
		const mixedSlotOverride = MultiSlotComponent.create(({ what }) => ({
			slot: {
				header: what.css([
					"bg-gradient-to-r",
					"from-blue-500",
					"to-purple-500",
					"text-white",
				]),
				footer: what.token([
					"color.bg.danger",
					"color.text.danger",
				]),
			},
		}));
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
		expect(mixedSlotOverride.actions()).toBe(
			"flex gap-2 justify-end mt-4",
		);

		// Test that non-overridden slots still inherit variant styles
		const variantPreservation = MultiSlotComponent.create(({ what }) => ({
			variant: {
				color: "danger",
				size: "lg",
			},
			slot: {
				// Only override actions, leave others to inherit
				actions: what.css([
					"bg-red-100",
					"text-red-800",
					"border-red-300",
				]),
			},
		}));
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
