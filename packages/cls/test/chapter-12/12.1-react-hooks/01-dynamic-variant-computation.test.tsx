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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-600",
					]),
					"color.bg.accent": what.css([
						"bg-purple-600",
					]),
					"color.bg.error": what.css([
						"bg-red-600",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.secondary": what.css([
						"text-gray-900",
					]),
					"color.text.accent": what.css([
						"text-white",
					]),
					"color.text.error": what.css([
						"text-white",
					]),
					"spacing.padding.xs": what.css([
						"px-1",
						"py-0.5",
					]),
					"spacing.padding.sm": what.css([
						"px-2",
						"py-1",
					]),
					"spacing.padding.md": what.css([
						"px-4",
						"py-2",
					]),
					"spacing.padding.lg": what.css([
						"px-6",
						"py-3",
					]),
					"spacing.padding.xl": what.css([
						"px-8",
						"py-4",
					]),
					"border.width.thin": what.css([
						"border",
					]),
					"border.width.medium": what.css([
						"border-2",
					]),
					"border.width.thick": what.css([
						"border-4",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
							"spacing.padding.md",
							"border.width.thin",
						]),
						icon: what.token([
							"color.text.primary",
							"spacing.padding.xs",
						]),
						label: what.token([
							"color.text.primary",
							"spacing.padding.sm",
						]),
					}),
					def.rule(
						{
							color: "secondary",
						},
						{
							root: what.token([
								"color.bg.secondary",
								"color.text.secondary",
							]),
							icon: what.token([
								"color.text.secondary",
							]),
							label: what.token([
								"color.text.secondary",
							]),
						},
					),
					def.rule(
						{
							color: "accent",
						},
						{
							root: what.css([
								"color.bg.accent",
								"color.text.accent",
							]),
							icon: what.css([
								"color.text.accent",
							]),
							label: what.css([
								"color.text.accent",
							]),
						},
					),
					def.rule(
						{
							color: "error",
						},
						{
							root: what.css([
								"color.bg.error",
								"color.text.error",
							]),
							icon: what.css([
								"color.text.error",
							]),
							label: what.css([
								"color.text.error",
							]),
						},
					),
					def.rule(
						{
							size: "xs",
						},
						{
							root: what.css([
								"spacing.padding.xs",
							]),
							icon: what.css([
								"spacing.padding.xs",
							]),
							label: what.css([
								"spacing.padding.xs",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.css([
								"spacing.padding.sm",
							]),
							icon: what.css([
								"spacing.padding.xs",
							]),
							label: what.css([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.css([
								"spacing.padding.lg",
							]),
							icon: what.css([
								"spacing.padding.sm",
							]),
							label: what.css([
								"spacing.padding.md",
							]),
						},
					),
					def.rule(
						{
							size: "xl",
						},
						{
							root: what.css([
								"spacing.padding.xl",
							]),
							icon: what.css([
								"spacing.padding.md",
							]),
							label: what.css([
								"spacing.padding.lg",
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
					def.rule(
						{
							state: "loading",
						},
						{
							root: what.css([
								"animate-pulse",
								"cursor-wait",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "primary",
					size: "md",
					state: "normal",
					theme: "light",
				}),
			}),
		);

		// Test dynamic variant computation
		const { result } = renderHook(() =>
			useCls(DynamicCls, ({ what }) => ({
				variant: what.variant({
					color: "accent",
					size: "xl",
					state: "loading",
					theme: "dark",
				}),
			})),
		);

		const classes = result.current;

		// Should apply accent color, xl size, and loading state
		expect(classes.root()).toBe(
			"border bg-purple-600 text-white px-8 py-4 animate-pulse cursor-wait",
		);
		expect(classes.icon()).toBe("text-white px-4 py-2");
		expect(classes.label()).toBe("text-white px-6 py-3");
	});
});
