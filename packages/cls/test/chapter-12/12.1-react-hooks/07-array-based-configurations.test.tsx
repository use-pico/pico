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
			({ what, def }) => ({
				token: def.token({
					"color.bg.base": what.css([
						"bg-white",
					]),
					"color.bg.primary": what.css([
						"bg-blue-50",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-50",
					]),
					"color.bg.accent": what.css([
						"bg-purple-50",
					]),
					"color.text.base": what.css([
						"text-gray-900",
					]),
					"color.text.primary": what.css([
						"text-blue-900",
					]),
					"color.text.secondary": what.css([
						"text-gray-700",
					]),
					"color.text.accent": what.css([
						"text-purple-900",
					]),
					"spacing.margin.none": what.css([
						"m-0",
					]),
					"spacing.margin.xs": what.css([
						"m-1",
					]),
					"spacing.margin.sm": what.css([
						"m-2",
					]),
					"spacing.margin.md": what.css([
						"m-4",
					]),
					"spacing.margin.lg": what.css([
						"m-6",
					]),
					"spacing.margin.xl": what.css([
						"m-8",
					]),
					"spacing.padding.none": what.css([
						"p-0",
					]),
					"spacing.padding.xs": what.css([
						"p-1",
					]),
					"spacing.padding.sm": what.css([
						"p-2",
					]),
					"spacing.padding.md": what.css([
						"p-4",
					]),
					"spacing.padding.lg": what.css([
						"p-6",
					]),
					"spacing.padding.xl": what.css([
						"p-8",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.base",
							"color.text.base",
							"spacing.margin.md",
							"spacing.padding.md",
						]),
						header: what.token([
							"color.bg.primary",
							"color.text.primary",
							"spacing.padding.sm",
						]),
						content: what.token([
							"color.bg.base",
							"color.text.base",
							"spacing.padding.md",
						]),
						footer: what.token([
							"color.bg.secondary",
							"color.text.secondary",
							"spacing.padding.sm",
						]),
					}),
					def.rule(
						what.variant({
							layout: "horizontal",
						}),
						{
							root: what.css([
								"flex",
								"flex-row",
								"items-center",
							]),
							header: what.css([
								"flex-shrink-0",
							]),
							content: what.css([
								"flex-1",
							]),
							footer: what.css([
								"flex-shrink-0",
							]),
						},
					),
					def.rule(
						what.variant({
							layout: "grid",
						}),
						{
							root: what.css([
								"grid",
								"grid-cols-3",
								"gap-4",
							]),
						},
					),
					def.rule(
						what.variant({
							spacing: "compact",
						}),
						{
							root: what.token([
								"spacing.margin.sm",
								"spacing.padding.sm",
							]),
							header: what.token([
								"spacing.padding.xs",
							]),
							content: what.token([
								"spacing.padding.sm",
							]),
							footer: what.token([
								"spacing.padding.xs",
							]),
						},
					),
					def.rule(
						what.variant({
							spacing: "spacious",
						}),
						{
							root: what.token([
								"spacing.margin.lg",
								"spacing.padding.lg",
							]),
							header: what.token([
								"spacing.padding.md",
							]),
							content: what.token([
								"spacing.padding.lg",
							]),
							footer: what.token([
								"spacing.padding.md",
							]),
						},
					),
				],
				defaults: def.defaults({
					layout: "stacked",
					spacing: "comfortable",
					theme: "light",
				}),
			}),
		);

		// Test with array-based configuration
		const { result } = renderHook(() =>
			useCls(ArrayCls, ({ what }) => ({
				variant: what.variant({
					layout: "horizontal",
					spacing: "spacious",
					theme: "dark",
				}),
			})),
		);

		const classes = result.current;

		// Should apply horizontal layout and spacious spacing
		expect(classes.root()).toBe(
			"bg-white text-gray-900 flex flex-row items-center m-6 p-6",
		);
		expect(classes.header()).toBe(
			"bg-blue-50 text-blue-900 flex-shrink-0 p-4",
		);
		expect(classes.content()).toBe("bg-white text-gray-900 flex-1 p-6");
		expect(classes.footer()).toBe(
			"bg-gray-50 text-gray-700 flex-shrink-0 p-4",
		);
	});
});
