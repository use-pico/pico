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
					"state.focus.default": {
						class: [],
					},
					"state.focus.focused": {
						class: [
							"ring-2",
							"ring-blue-500",
							"ring-offset-2",
						],
					},
					"state.hover.default": {
						class: [],
					},
					"state.hover.hovered": {
						class: [
							"hover:bg-opacity-90",
						],
					},
					"size.spacing.sm": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"size.spacing.md": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"size.spacing.lg": {
						class: [
							"px-6",
							"py-3",
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
							icon: {
								class: [
									"inline-block",
									"align-middle",
								],
							},
							label: {
								class: [
									"font-medium",
								],
							},
						},
					},
					// Conditional token application based on color
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
							color: "warning",
						},
						slot: {
							root: {
								token: [
									"color.bg.warning",
									"color.text.warning",
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
						},
					},
					// Conditional token application based on size
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
							icon: {
								class: [
									"w-4",
									"h-4",
								],
							},
							label: {
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
								token: [
									"size.spacing.lg",
									"size.typography.lg",
								],
							},
							icon: {
								class: [
									"w-6",
									"h-6",
								],
							},
							label: {
								class: [
									"text-lg",
								],
							},
						},
					},
					// Conditional token application based on interactive state
					{
						match: {
							interactive: true,
						},
						slot: {
							root: {
								class: [
									"cursor-pointer",
									"transition-colors",
									"duration-200",
								],
							},
						},
					},
					// Combined conditional rules
					{
						match: {
							color: "primary",
							interactive: true,
						},
						slot: {
							root: {
								token: [
									"state.hover.hovered",
								],
							},
						},
					},
					{
						match: {
							color: "primary",
							interactive: true,
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"shadow-lg",
									"hover:shadow-xl",
								],
							},
						},
					},
					// Conditional focus state for interactive components
					{
						match: {
							interactive: true,
							color: "primary",
						},
						slot: {
							root: {
								token: [
									"state.focus.focused",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
					size: "md",
					interactive: false,
				},
			},
		);

		// Test default state
		const { slots: defaultInstance } = ConditionalComponent.create();
		expect(defaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-4 py-2 text-base",
		);
		expect(defaultInstance.icon()).toBe("inline-block align-middle");
		expect(defaultInstance.label()).toBe("font-medium");

		// Test primary color with conditional hover state
		const { slots: primaryInteractive } = ConditionalComponent.create({
			variant: {
				color: "primary",
				interactive: true,
			},
		});
		expect(primaryInteractive.root()).toBe(
			"px-4 py-2 text-base bg-blue-500 text-white cursor-pointer transition-colors duration-200 hover:bg-opacity-90 ring-2 ring-blue-500 ring-offset-2",
		);

		// Test small size with conditional typography and spacing
		const { slots: smallInstance } = ConditionalComponent.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-2 py-1 text-sm",
		);
		expect(smallInstance.icon()).toBe("inline-block align-middle w-4 h-4");
		expect(smallInstance.label()).toBe("font-medium text-sm");

		// Test large size with conditional spacing and typography
		const { slots: largeInstance } = ConditionalComponent.create({
			variant: {
				size: "lg",
			},
		});
		expect(largeInstance.root()).toBe(
			"bg-gray-100 text-gray-900 px-6 py-3 text-lg",
		);
		expect(largeInstance.icon()).toBe("inline-block align-middle w-6 h-6");
		expect(largeInstance.label()).toBe("font-medium text-lg");

		// Test success color with conditional styling
		const { slots: successInstance } = ConditionalComponent.create({
			variant: {
				color: "success",
			},
		});
		expect(successInstance.root()).toBe(
			"px-4 py-2 text-base bg-green-500 text-white",
		);

		// Test combined conditional rules
		const { slots: primaryLargeInteractive } = ConditionalComponent.create({
			variant: {
				color: "primary",
				size: "lg",
				interactive: true,
			},
		});
		expect(primaryLargeInteractive.root()).toBe(
			"bg-blue-500 text-white px-6 py-3 text-lg cursor-pointer transition-colors duration-200 hover:bg-opacity-90 shadow-lg hover:shadow-xl ring-2 ring-blue-500 ring-offset-2",
		);

		// Test warning color (should not have hover state since not interactive)
		const { slots: warningInstance } = ConditionalComponent.create({
			variant: {
				color: "warning",
			},
		});
		expect(warningInstance.root()).toBe(
			"px-4 py-2 text-base bg-yellow-500 text-gray-900",
		);

		// Test danger color with conditional focus state
		const { slots: dangerInteractive } = ConditionalComponent.create({
			variant: {
				color: "danger",
				interactive: true,
			},
		});
		expect(dangerInteractive.root()).toBe(
			"px-4 py-2 text-base bg-red-500 text-white cursor-pointer transition-colors duration-200",
		);
	});
});
