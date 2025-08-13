import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("7.3 Conditional Token Application", () => {
	it("should conditionally apply tokens based on variant combinations", () => {
		// Base component with conditional token application
		const ConditionalComponent = cls(
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
					"state.focus.default",
					"state.focus.focused",
					"state.hover.default",
					"state.hover.hovered",
					"size.spacing.sm",
					"size.spacing.md",
					"size.spacing.lg",
					"size.typography.sm",
					"size.typography.md",
					"size.typography.lg",
				],
				slot: [
					"root",
					"icon",
					"label",
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
					interactive: [
						"bool",
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
					"state.focus.default": [],
					"state.focus.focused": [
						"ring-2",
						"ring-blue-500",
						"ring-offset-2",
					],
					"state.hover.default": [],
					"state.hover.hovered": [
						"hover:bg-opacity-90",
					],
					"size.spacing.sm": [
						"px-2",
						"py-1",
					],
					"size.spacing.md": [
						"px-4",
						"py-2",
					],
					"size.spacing.lg": [
						"px-6",
						"py-3",
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
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"size.spacing.md",
							"size.typography.md",
						]),
						icon: what.css([
							"inline-block",
							"align-middle",
						]),
						label: what.css([
							"font-medium",
						]),
					}),
					// Conditional token application based on color
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
					// Conditional token application based on size
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"size.spacing.sm",
								"size.typography.sm",
							]),
							icon: what.css([
								"w-4",
								"h-4",
							]),
							label: what.css([
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
								"size.spacing.lg",
								"size.typography.lg",
							]),
							icon: what.css([
								"w-6",
								"h-6",
							]),
							label: what.css([
								"text-lg",
							]),
						},
					),
					// Conditional token application based on interactive state
					def.rule(
						{
							interactive: true,
						},
						{
							root: what.css([
								"cursor-pointer",
								"transition-colors",
								"duration-200",
							]),
						},
					),
					// Combined conditional rules
					def.rule(
						{
							color: "primary",
							interactive: true,
						},
						{
							root: what.token([
								"state.hover.hovered",
							]),
						},
					),
					def.rule(
						{
							color: "primary",
							interactive: true,
							size: "lg",
						},
						{
							root: what.css([
								"shadow-lg",
								"hover:shadow-xl",
							]),
						},
					),
					// Conditional focus state for interactive components
					def.rule(
						{
							interactive: true,
							color: "primary",
						},
						{
							root: what.token([
								"state.focus.focused",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					size: "md",
					interactive: false,
				}),
			}),
		);

		// Test default state
		const defaultInstance = ConditionalComponent.create();
		expect(defaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 text-base",
		);
		expect(defaultInstance.icon()).toBe("inline-block align-middle");
		expect(defaultInstance.label()).toBe("font-medium");

		// Test primary color with conditional hover state
		const primaryInteractive = ConditionalComponent.create(
			({ what }) => ({
				variant: what.variant({
					color: "primary",
					interactive: true,
				}),
			}),
		);
		expect(primaryInteractive.root()).toBe(
			"px-4 py-2 text-base bg-blue-500 text-white cursor-pointer transition-colors duration-200 hover:bg-opacity-90 ring-2 ring-blue-500 ring-offset-2",
		);

		// Test small size with conditional typography and spacing
		const smallInstance = ConditionalComponent.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(smallInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-2 py-1 text-sm",
		);
		expect(smallInstance.icon()).toBe(
			"inline-block align-middle w-4 h-4",
		);
		expect(smallInstance.label()).toBe("font-medium text-sm");

		// Test large size with conditional spacing and typography
		const largeInstance = ConditionalComponent.create(({ what }) => ({
			variant: what.variant({
				size: "lg",
			}),
		}));
		expect(largeInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-6 py-3 text-lg",
		);
		expect(largeInstance.icon()).toBe(
			"inline-block align-middle w-6 h-6",
		);
		expect(largeInstance.label()).toBe("font-medium text-lg");

		// Test success color with conditional styling
		const successInstance = ConditionalComponent.create(({ what }) => ({
			variant: what.variant({
				color: "success",
			}),
		}));
		expect(successInstance.root()).toBe(
			"px-4 py-2 text-base bg-green-500 text-white",
		);

		// Test combined conditional rules
		const primaryLargeInteractive = ConditionalComponent.create(
			({ what }) => ({
				variant: what.variant({
					color: "primary",
					size: "lg",
					interactive: true,
				}),
			}),
		);
		expect(primaryLargeInteractive.root()).toBe(
			"bg-blue-500 text-white px-6 py-3 text-lg cursor-pointer transition-colors duration-200 hover:bg-opacity-90 shadow-lg hover:shadow-xl ring-2 ring-blue-500 ring-offset-2",
		);

		// Test warning color (should not have hover state since not interactive)
		const warningInstance = ConditionalComponent.create(({ what }) => ({
			variant: what.variant({
				color: "warning",
			}),
		}));
		expect(warningInstance.root()).toBe(
			"px-4 py-2 text-base bg-yellow-500 text-gray-900",
		);

		// Test danger color with conditional focus state
		const dangerInteractive = ConditionalComponent.create(({ what }) => ({
			variant: what.variant({
				color: "danger",
				interactive: true,
			}),
		}));
		expect(dangerInteractive.root()).toBe(
			"px-4 py-2 text-base bg-red-500 text-white cursor-pointer transition-colors duration-200",
		);
	});
});
