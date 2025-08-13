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
					"spacing.sm": [
						"p-2",
					],
					"spacing.md": [
						"p-4",
					],
					"spacing.lg": [
						"p-6",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"spacing.md",
						]),
						header: what.css([
							"border-b",
							"border-gray-200",
							"pb-2",
							"mb-2",
						]),
						content: what.css([
							"min-h-0",
							"flex-1",
						]),
						footer: what.css([
							"border-t",
							"border-gray-200",
							"pt-2",
							"mt-2",
						]),
					}),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"spacing.sm",
							]),
							header: what.css([
								"text-sm",
							]),
							content: what.css([
								"text-sm",
							]),
							footer: what.css([
								"text-sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"spacing.lg",
							]),
							header: what.css([
								"text-lg",
								"font-semibold",
							]),
							content: what.css([
								"text-lg",
							]),
							footer: what.css([
								"text-lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": [
						"bg-green-100",
					],
					"color.bg.primary": [
						"bg-green-500",
					],
					"color.bg.success": [
						"bg-green-600",
					],
					"color.text.default": [
						"text-green-900",
					],
					"color.text.primary": [
						"text-white",
					],
					"color.text.success": [
						"text-white",
					],
					"spacing.sm": [
						"p-1",
					],
					"spacing.md": [
						"p-3",
					],
					"spacing.lg": [
						"p-5",
					],
					"spacing.xl": [
						"p-8",
					],
				}),
				rules: [
					def.root({
						header: what.css([
							"bg-green-50",
							"border-green-200",
						]),
						sidebar: what.css([
							"w-64",
							"bg-gray-50",
							"border-r",
							"border-gray-200",
						]),
						actions: what.css([
							"flex",
							"gap-2",
							"justify-end",
						]),
					}),
					def.rule(
						{
							size: "xl",
						},
						{
							root: what.token([
								"spacing.xl",
							]),
							header: what.css([
								"text-xl",
								"font-bold",
							]),
							sidebar: what.css([
								"w-80",
							]),
							actions: what.css([
								"gap-3",
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
		expect(baseInstance.root()).toBe("bg-gray-100 text-gray-900 p-4");
		expect(baseInstance.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2",
		);
		expect(baseInstance.content()).toBe("min-h-0 flex-1");
		expect(baseInstance.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2",
		);

		// Test base component with small size
		const baseSmallInstance = BaseComponent.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(baseSmallInstance.header()).toBe(
			"border-b border-gray-200 pb-2 mb-2 text-sm",
		);
		expect(baseSmallInstance.content()).toBe("min-h-0 flex-1 text-sm");
		expect(baseSmallInstance.footer()).toBe(
			"border-t border-gray-200 pt-2 mt-2 text-sm",
		);

		// Test extended component with default size (should inherit and override slots)
		const extendedInstance = ExtendedComponent.create();
		expect(extendedInstance.root()).toBe(
			"bg-green-100 text-green-900 p-3",
		);
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
		const extendedXlInstance = ExtendedComponent.create(({ what }) => ({
			variant: what.variant({
				size: "xl",
			}),
		}));
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
