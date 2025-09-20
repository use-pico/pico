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
							"text-white",
						],
					},
					"color.text.danger": {
						class: [
							"text-white",
						],
					},
					"size.sm": {
						class: [
							"text-xs",
							"px-2",
							"py-1",
						],
					},
					"size.md": {
						class: [
							"text-sm",
							"px-3",
							"py-2",
						],
					},
					"size.lg": {
						class: [
							"text-base",
							"px-4",
							"py-2",
						],
					},
					"size.xl": {
						class: [
							"text-lg",
							"px-6",
							"py-3",
						],
					},
					"state.default": {
						class: [],
					},
					"state.hover": {
						class: [],
					},
					"state.active": {
						class: [],
					},
					"state.disabled": {
						class: [],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.default",
									"size.md",
								],
							},
						},
					},
					// Color-specific rules
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
					// Size-specific rules
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								token: [
									"size.sm",
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
									"size.lg",
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
									"size.xl",
								],
							},
						},
					},
					// State-specific rules
					{
						match: {
							state: "hover",
						},
						slot: {
							root: {
								class: [
									"hover:bg-opacity-90",
									"transition-colors",
								],
							},
						},
					},
					{
						match: {
							state: "active",
						},
						slot: {
							root: {
								class: [
									"active:bg-opacity-75",
									"transform",
									"scale-95",
								],
							},
						},
					},
					{
						match: {
							state: "disabled",
						},
						slot: {
							root: {
								class: [
									"opacity-50",
									"cursor-not-allowed",
								],
							},
						},
					},
					// Complex nested matching - color + size combinations
					{
						match: {
							color: "primary",
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"shadow-lg",
									"border-2",
									"border-blue-600",
								],
							},
						},
					},
					{
						match: {
							color: "success",
							size: "xl",
						},
						slot: {
							root: {
								class: [
									"shadow-xl",
									"border-2",
									"border-green-600",
									"rounded-xl",
								],
							},
						},
					},
					// Complex nested matching - color + state combinations
					{
						match: {
							color: "danger",
							state: "hover",
						},
						slot: {
							root: {
								class: [
									"hover:bg-red-600",
									"hover:shadow-md",
								],
							},
						},
					},
					{
						match: {
							color: "warning",
							state: "active",
						},
						slot: {
							root: {
								class: [
									"active:bg-yellow-600",
									"active:shadow-inner",
								],
							},
						},
					},
					// Triple nested matching - color + size + state
					{
						match: {
							color: "primary",
							size: "lg",
							state: "hover",
						},
						slot: {
							root: {
								class: [
									"hover:shadow-2xl",
									"hover:border-blue-700",
								],
							},
						},
					},
				],
				defaults: {
					color: "default",
					size: "md",
					state: "default",
				},
			},
		);

		// Test default state
		const { slots: defaultInstance } = Component.create();
		expect(defaultInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-sm px-3 py-2",
		);

		// Test color variants
		const { slots: primaryInstance } = Component.create({
			variant: {
				color: "primary",
			},
		});
		expect(primaryInstance.root()).toBe(
			"text-sm px-3 py-2 bg-blue-500 text-white",
		);

		const { slots: successInstance } = Component.create({
			variant: {
				color: "success",
			},
		});
		expect(successInstance.root()).toBe(
			"text-sm px-3 py-2 bg-green-500 text-white",
		);

		// Test size variants
		const { slots: largeInstance } = Component.create({
			variant: {
				size: "lg",
			},
		});
		expect(largeInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-base px-4 py-2",
		);

		const { slots: xlInstance } = Component.create({
			variant: {
				size: "xl",
			},
		});
		expect(xlInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-lg px-6 py-3",
		);

		// Test state variants
		const { slots: hoverInstance } = Component.create({
			variant: {
				state: "hover",
			},
		});
		expect(hoverInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-sm px-3 py-2 hover:bg-opacity-90 transition-colors",
		);

		const { slots: activeInstance } = Component.create({
			variant: {
				state: "active",
			},
		});
		expect(activeInstance.root()).toBe(
			"bg-gray-100 text-gray-900 text-sm px-3 py-2 active:bg-opacity-75 transform scale-95",
		);

		// Test complex nested matching - color + size
		const { slots: primaryLargeInstance } = Component.create({
			variant: {
				color: "primary",
				size: "lg",
			},
		});
		expect(primaryLargeInstance.root()).toBe(
			"bg-blue-500 text-white text-base px-4 py-2 shadow-lg border-2 border-blue-600",
		);

		const { slots: successXlInstance } = Component.create({
			variant: {
				color: "success",
				size: "xl",
			},
		});
		expect(successXlInstance.root()).toBe(
			"bg-green-500 text-white text-lg px-6 py-3 shadow-xl border-2 border-green-600 rounded-xl",
		);

		// Test complex nested matching - color + state
		const { slots: dangerHoverInstance } = Component.create({
			variant: {
				color: "danger",
				state: "hover",
			},
		});
		expect(dangerHoverInstance.root()).toBe(
			"text-sm px-3 py-2 bg-red-500 text-white transition-colors hover:bg-red-600 hover:shadow-md",
		);

		// Test triple nested matching - color + size + state
		const { slots: primaryLargeHoverInstance } = Component.create({
			variant: {
				color: "primary",
				size: "lg",
				state: "hover",
			},
		});
		expect(primaryLargeHoverInstance.root()).toBe(
			"bg-blue-500 text-white text-base px-4 py-2 hover:bg-opacity-90 transition-colors shadow-lg border-2 border-blue-600 hover:shadow-2xl hover:border-blue-700",
		);
	});
});
