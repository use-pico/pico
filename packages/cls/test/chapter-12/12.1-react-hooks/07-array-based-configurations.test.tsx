import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Array-Based Configurations", () => {
	it("should handle useCls with array-based configurations", () => {
		// Create the cls instance
		const ArrayCls = cls(
			{
				tokens: [
					"color.bg.base",
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.accent",
					"color.text.base",
					"color.text.primary",
					"color.text.secondary",
					"color.text.accent",
					"spacing.margin.none",
					"spacing.margin.xs",
					"spacing.margin.sm",
					"spacing.margin.md",
					"spacing.margin.lg",
					"spacing.margin.xl",
					"spacing.padding.none",
					"spacing.padding.xs",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
					"spacing.padding.xl",
				],
				slot: [
					"root",
					"header",
					"content",
					"footer",
				],
				variant: {
					layout: [
						"stacked",
						"horizontal",
						"grid",
					],
					spacing: [
						"compact",
						"comfortable",
						"spacious",
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
					"color.bg.base": {
						class: [
							"bg-white",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-50",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-50",
						],
					},
					"color.bg.accent": {
						class: [
							"bg-purple-50",
						],
					},
					"color.text.base": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.primary": {
						class: [
							"text-blue-900",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-700",
						],
					},
					"color.text.accent": {
						class: [
							"text-purple-900",
						],
					},
					"spacing.margin.none": {
						class: [
							"m-0",
						],
					},
					"spacing.margin.xs": {
						class: [
							"m-1",
						],
					},
					"spacing.margin.sm": {
						class: [
							"m-2",
						],
					},
					"spacing.margin.md": {
						class: [
							"m-4",
						],
					},
					"spacing.margin.lg": {
						class: [
							"m-6",
						],
					},
					"spacing.margin.xl": {
						class: [
							"m-8",
						],
					},
					"spacing.padding.none": {
						class: [
							"p-0",
						],
					},
					"spacing.padding.xs": {
						class: [
							"p-1",
						],
					},
					"spacing.padding.sm": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.md": {
						class: [
							"p-4",
						],
					},
					"spacing.padding.lg": {
						class: [
							"p-6",
						],
					},
					"spacing.padding.xl": {
						class: [
							"p-8",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.base",
									"color.text.base",
									"spacing.margin.md",
									"spacing.padding.md",
								],
							},
							header: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.sm",
								],
							},
							content: {
								token: [
									"color.bg.base",
									"color.text.base",
									"spacing.padding.md",
								],
							},
							footer: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
									"spacing.padding.sm",
								],
							},
						},
					},
					{
						match: {
							layout: "horizontal",
						},
						slot: {
							root: {
								class: [
									"flex",
									"flex-row",
									"items-center",
								],
							},
							header: {
								class: [
									"flex-shrink-0",
								],
							},
							content: {
								class: [
									"flex-1",
								],
							},
							footer: {
								class: [
									"flex-shrink-0",
								],
							},
						},
					},
					{
						match: {
							layout: "grid",
						},
						slot: {
							root: {
								class: [
									"grid",
									"grid-cols-3",
									"gap-4",
								],
							},
						},
					},
					{
						match: {
							spacing: "compact",
						},
						slot: {
							root: {
								token: [
									"spacing.margin.sm",
									"spacing.padding.sm",
								],
							},
							header: {
								token: [
									"spacing.padding.xs",
								],
							},
							content: {
								token: [
									"spacing.padding.sm",
								],
							},
							footer: {
								token: [
									"spacing.padding.xs",
								],
							},
						},
					},
					{
						match: {
							spacing: "spacious",
						},
						slot: {
							root: {
								token: [
									"spacing.margin.lg",
									"spacing.padding.lg",
								],
							},
							header: {
								token: [
									"spacing.padding.md",
								],
							},
							content: {
								token: [
									"spacing.padding.lg",
								],
							},
							footer: {
								token: [
									"spacing.padding.md",
								],
							},
						},
					},
				],
				defaults: {
					layout: "stacked",
					spacing: "comfortable",
					theme: "light",
				},
			},
		);

		// Test with array-based configuration
		const { result } = renderHook(() =>
			useCls(ArrayCls, {
				variant: {
					layout: "horizontal",
					spacing: "spacious",
					theme: "dark",
				},
			}),
		);

		const { slots } = result.current;

		// Should apply horizontal layout and spacious spacing
		expect(slots.root()).toBe(
			"bg-white text-gray-900 flex flex-row items-center m-6 p-6",
		);
		expect(slots.header()).toBe(
			"bg-blue-50 text-blue-900 flex-shrink-0 p-4",
		);
		expect(slots.content()).toBe("bg-white text-gray-900 flex-1 p-6");
		expect(slots.footer()).toBe(
			"bg-gray-50 text-gray-700 flex-shrink-0 p-4",
		);
	});
});
