import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("7.1 Complex Match Conditions - Nested Variant Matching", () => {
	it("should handle complex nested variant matching with multiple conditions", () => {
		const Component = cls(
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
					"size.sm",
					"size.md",
					"size.lg",
					"size.xl",
					"state.default",
					"state.hover",
					"state.active",
					"state.disabled",
				],
				slot: [
					"root",
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
						"xl",
					],
					state: [
						"default",
						"hover",
						"active",
						"disabled",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": what.css([
						"bg-gray-100",
					]),
					"color.bg.primary": what.css([
						"bg-blue-500",
					]),
					"color.bg.success": what.css([
						"bg-green-500",
					]),
					"color.bg.warning": what.css([
						"bg-yellow-500",
					]),
					"color.bg.danger": what.css([
						"bg-red-500",
					]),
					"color.text.default": what.css([
						"text-gray-900",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.success": what.css([
						"text-white",
					]),
					"color.text.warning": what.css([
						"text-white",
					]),
					"color.text.danger": what.css([
						"text-white",
					]),
					"size.sm": what.css([
						"text-xs",
						"px-2",
						"py-1",
					]),
					"size.md": what.css([
						"text-sm",
						"px-3",
						"py-2",
					]),
					"size.lg": what.css([
						"text-base",
						"px-4",
						"py-2",
					]),
					"size.xl": what.css([
						"text-lg",
						"px-6",
						"py-3",
					]),
					"state.default": what.css([]),
					"state.hover": what.css([]),
					"state.active": what.css([]),
					"state.disabled": what.css([]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"size.md",
						]),
					}),
					// Color-specific rules
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
							color: "warning",
						},
						{
							root: what.token([
								"color.bg.warning",
								"color.text.warning",
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
						},
					),
					// Size-specific rules
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"size.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"size.lg",
							]),
						},
					),
					def.rule(
						{
							size: "xl",
						},
						{
							root: what.token([
								"size.xl",
							]),
						},
					),
					// State-specific rules
					def.rule(
						{
							state: "hover",
						},
						{
							root: what.css([
								"hover:bg-opacity-90",
								"transition-colors",
							]),
						},
					),
					def.rule(
						{
							state: "active",
						},
						{
							root: what.css([
								"active:bg-opacity-75",
								"transform",
								"scale-95",
							]),
						},
					),
					def.rule(
						{
							state: "disabled",
						},
						{
							root: what.css([
								"opacity-50",
								"cursor-not-allowed",
							]),
						},
					),
					// Complex nested matching - color + size combinations
					def.rule(
						{
							color: "primary",
							size: "lg",
						},
						{
							root: what.css([
								"shadow-lg",
								"border-2",
								"border-blue-600",
							]),
						},
					),
					def.rule(
						{
							color: "success",
							size: "xl",
						},
						{
							root: what.css([
								"shadow-xl",
								"border-2",
								"border-green-600",
								"rounded-xl",
							]),
						},
					),
					// Complex nested matching - color + state combinations
					def.rule(
						{
							color: "danger",
							state: "hover",
						},
						{
							root: what.css([
								"hover:bg-red-600",
								"hover:shadow-md",
							]),
						},
					),
					def.rule(
						{
							color: "warning",
							state: "active",
						},
						{
							root: what.css([
								"active:bg-yellow-600",
								"active:shadow-inner",
							]),
						},
					),
					// Triple nested matching - color + size + state
					def.rule(
						{
							color: "primary",
							size: "lg",
							state: "hover",
						},
						{
							root: what.css([
								"hover:shadow-2xl",
								"hover:border-blue-700",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					size: "md",
					state: "default",
				}),
			}),
		);

		// Test default state
		const defaultInstance = Component.create();
		expect(defaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-sm px-3 py-2",
		);

		// Test color variants
		const primaryInstance = Component.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
			}),
		}));
		expect(primaryInstance.root()).toBe(
			"text-sm px-3 py-2 bg-blue-500 text-white",
		);

		const successInstance = Component.create(({ what }) => ({
			variant: what.variant({
				color: "success",
			}),
		}));
		expect(successInstance.root()).toBe(
			"text-sm px-3 py-2 bg-green-500 text-white",
		);

		// Test size variants
		const largeInstance = Component.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
		}));
		expect(largeInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-base px-4 py-2",
		);

		const xlInstance = Component.create(({ what }) => ({
			variant: what.variant({
				size: "xl",
			}),
		}));
		expect(xlInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-lg px-6 py-3",
		);

		// Test state variants
		const hoverInstance = Component.create(({ what }) => ({
			variant: what.variant({
				state: "hover",
			}),
		}));
		expect(hoverInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-sm px-3 py-2 hover:bg-opacity-90 transition-colors",
		);

		const activeInstance = Component.create(({ what }) => ({
			variant: what.variant({
				state: "active",
			}),
		}));
		expect(activeInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-sm px-3 py-2 active:bg-opacity-75 transform scale-95",
		);

		// Test complex nested matching - color + size
		const primaryLargeInstance = Component.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
				size: "lg",
			}),
		}));
		expect(primaryLargeInstance.root()).toBe(
			"bg-blue-500 text-white text-base px-4 py-2 shadow-lg border-2 border-blue-600",
		);

		const successXlInstance = Component.create(({ what }) => ({
			variant: what.variant({
				color: "success",
				size: "xl",
			}),
		}));
		expect(successXlInstance.root()).toBe(
			"bg-green-500 text-white text-lg px-6 py-3 shadow-xl border-2 border-green-600 rounded-xl",
		);

		// Test complex nested matching - color + state
		const dangerHoverInstance = Component.create(({ what }) => ({
			variant: what.variant({
				color: "danger",
				state: "hover",
			}),
		}));
		expect(dangerHoverInstance.root()).toBe(
			"text-sm px-3 py-2 bg-red-500 text-white transition-colors hover:bg-red-600 hover:shadow-md",
		);

		// Test triple nested matching - color + size + state
		const primaryLargeHoverInstance = Component.create(({ what }) => ({
			variant: what.variant({
				color: "primary",
				size: "lg",
				state: "hover",
			}),
		}));
		expect(primaryLargeHoverInstance.root()).toBe(
			"bg-blue-500 text-white text-base px-4 py-2 hover:bg-opacity-90 transition-colors shadow-lg border-2 border-blue-600 hover:shadow-2xl hover:border-blue-700",
		);
	});
});
