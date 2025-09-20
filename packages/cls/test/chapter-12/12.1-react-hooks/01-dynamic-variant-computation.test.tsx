import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Dynamic Variant Computation", () => {
	it("should handle dynamic variant computation in useCls", () => {
		// Create the cls instance
		const DynamicCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.accent",
					"color.bg.error",
					"color.text.primary",
					"color.text.secondary",
					"color.text.accent",
					"color.text.error",
					"spacing.padding.xs",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
					"spacing.padding.xl",
					"border.width.thin",
					"border.width.medium",
					"border.width.thick",
				],
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"accent",
						"error",
					],
					size: [
						"xs",
						"sm",
						"md",
						"lg",
						"xl",
					],
					state: [
						"normal",
						"hover",
						"active",
						"disabled",
						"loading",
					],
					theme: [
						"light",
						"dark",
						"auto",
					],
				},
			},
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-600",
						],
					},
					"color.bg.accent": {
						class: [
							"bg-purple-600",
						],
					},
					"color.bg.error": {
						class: [
							"bg-red-600",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.accent": {
						class: [
							"text-white",
						],
					},
					"color.text.error": {
						class: [
							"text-white",
						],
					},
					"spacing.padding.xs": {
						class: [
							"px-1",
							"py-0.5",
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
					"spacing.padding.xl": {
						class: [
							"px-8",
							"py-4",
						],
					},
					"border.width.thin": {
						class: [
							"border",
						],
					},
					"border.width.medium": {
						class: [
							"border-2",
						],
					},
					"border.width.thick": {
						class: [
							"border-4",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.md",
									"border.width.thin",
								],
							},
							icon: {
								token: [
									"color.text.primary",
									"spacing.padding.xs",
								],
							},
							label: {
								token: [
									"color.text.primary",
									"spacing.padding.sm",
								],
							},
						},
					},
					{
						match: {
							color: "secondary",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
								],
							},
							icon: {
								token: [
									"color.text.secondary",
								],
							},
							label: {
								token: [
									"color.text.secondary",
								],
							},
						},
					},
					{
						match: {
							color: "accent",
						},
						slot: {
							root: {
								token: [
									"color.bg.accent",
									"color.text.accent",
								],
							},
							icon: {
								token: [
									"color.text.accent",
								],
							},
							label: {
								token: [
									"color.text.accent",
								],
							},
						},
					},
					{
						match: {
							color: "error",
						},
						slot: {
							root: {
								token: [
									"color.bg.error",
									"color.text.error",
								],
							},
							icon: {
								token: [
									"color.text.error",
								],
							},
							label: {
								token: [
									"color.text.error",
								],
							},
						},
					},
					{
						match: {
							size: "xs",
						},
						slot: {
							root: {
								token: [
									"spacing.padding.xs",
								],
							},
							icon: {
								token: [
									"spacing.padding.xs",
								],
							},
							label: {
								token: [
									"spacing.padding.xs",
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
							icon: {
								token: [
									"spacing.padding.xs",
								],
							},
							label: {
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
							icon: {
								token: [
									"spacing.padding.sm",
								],
							},
							label: {
								token: [
									"spacing.padding.md",
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
							icon: {
								token: [
									"spacing.padding.md",
								],
							},
							label: {
								token: [
									"spacing.padding.lg",
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
					{
						match: {
							state: "loading",
						},
						slot: {
							root: {
								class: [
									"animate-pulse",
									"cursor-wait",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "md",
					state: "normal",
					theme: "light",
				},
			},
		);

		// Test dynamic variant computation
		const { result } = renderHook(() =>
			useCls(DynamicCls, {
				variant: {
					color: "accent",
					size: "xl",
					state: "loading",
					theme: "dark",
				},
			}),
		);

		const { slots } = result.current;

		// Should apply accent color, xl size, and loading state
		expect(slots.root()).toBe(
			"border bg-purple-600 text-white px-8 py-4 animate-pulse cursor-wait",
		);
		expect(slots.icon()).toBe("text-white px-4 py-2");
		expect(slots.label()).toBe("text-white px-6 py-3");
	});
});
