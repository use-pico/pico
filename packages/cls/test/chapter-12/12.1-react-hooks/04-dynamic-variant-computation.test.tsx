import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Advanced useCls - Dynamic Variant Computation", () => {
	it("should handle dynamic variant computation in useCls", () => {
		const DynamicCls = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
						"secondary",
						"accent",
						"error",
					],
					"color.text": [
						"primary",
						"secondary",
						"accent",
						"error",
					],
					"spacing.padding": [
						"xs",
						"sm",
						"md",
						"lg",
						"xl",
					],
					"border.width": [
						"thin",
						"medium",
						"thick",
					],
				},
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
					"color.bg": {
						primary: [
							"bg-blue-600",
						],
						secondary: [
							"bg-gray-600",
						],
						accent: [
							"bg-purple-600",
						],
						error: [
							"bg-red-600",
						],
					},
					"color.text": {
						primary: [
							"text-white",
						],
						secondary: [
							"text-gray-900",
						],
						accent: [
							"text-white",
						],
						error: [
							"text-white",
						],
					},
					"spacing.padding": {
						xs: [
							"px-1",
							"py-0.5",
						],
						sm: [
							"px-2",
							"py-1",
						],
						md: [
							"px-4",
							"py-2",
						],
						lg: [
							"px-6",
							"py-3",
						],
						xl: [
							"px-8",
							"py-4",
						],
					},
					"border.width": {
						thin: [
							"border",
						],
						medium: [
							"border-2",
						],
						thick: [
							"border-4",
						],
					},
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
							root: what.token([
								"color.bg.accent",
								"color.text.accent",
							]),
							icon: what.token([
								"color.text.accent",
							]),
							label: what.token([
								"color.text.accent",
							]),
						},
					),
					def.rule(
						{
							color: "error",
						},
						{
							root: what.token([
								"color.bg.error",
								"color.text.error",
							]),
							icon: what.token([
								"color.text.error",
							]),
							label: what.token([
								"color.text.error",
							]),
						},
					),
					def.rule(
						{
							size: "xs",
						},
						{
							root: what.token([
								"spacing.padding.xs",
							]),
							icon: what.token([
								"spacing.padding.xs",
							]),
							label: what.token([
								"spacing.padding.xs",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"spacing.padding.sm",
							]),
							icon: what.token([
								"spacing.padding.xs",
							]),
							label: what.token([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"spacing.padding.lg",
							]),
							icon: what.token([
								"spacing.padding.sm",
							]),
							label: what.token([
								"spacing.padding.md",
							]),
						},
					),
					def.rule(
						{
							size: "xl",
						},
						{
							root: what.token([
								"spacing.padding.xl",
							]),
							icon: what.token([
								"spacing.padding.md",
							]),
							label: what.token([
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
			"bg-purple-600 text-white px-8 py-4 border animate-pulse cursor-wait",
		);
		expect(classes.icon()).toBe("text-white px-4");
		expect(classes.label()).toBe("text-white px-6 py-3");
	});
});
