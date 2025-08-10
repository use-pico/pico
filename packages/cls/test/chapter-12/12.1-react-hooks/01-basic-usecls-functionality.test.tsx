import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Basic useCls - Basic Functionality", () => {
	it("should handle basic useCls functionality with cls instance", () => {
		const ButtonCls = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
						"secondary",
						"accent",
					],
					"color.text": [
						"primary",
						"secondary",
						"accent",
					],
					"spacing.padding": [
						"sm",
						"md",
						"lg",
					],
					"spacing.margin": [
						"sm",
						"md",
						"lg",
					],
					"border.radius": [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {
					variant: [
						"primary",
						"secondary",
						"accent",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
				},
				defaults: {},
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
					},
					"spacing.padding": {
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
					},
					"spacing.margin": {
						sm: [
							"m-1",
						],
						md: [
							"m-2",
						],
						lg: [
							"m-3",
						],
					},
					"border.radius": {
						sm: [
							"rounded",
						],
						md: [
							"rounded-md",
						],
						lg: [
							"rounded-lg",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
							"spacing.padding.md",
							"spacing.margin.md",
							"border.radius.md",
						]),
						label: what.token([
							"color.text.primary",
						]),
					}),
					def.rule(
						{
							variant: "secondary",
						},
						{
							root: what.token([
								"color.bg.secondary",
								"color.text.secondary",
							]),
							label: what.token([
								"color.text.secondary",
							]),
						},
					),
					def.rule(
						{
							variant: "accent",
						},
						{
							root: what.token([
								"color.bg.accent",
								"color.text.accent",
							]),
							label: what.token([
								"color.text.accent",
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
								"spacing.margin.sm",
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
								"spacing.margin.lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					variant: "primary",
					size: "md",
				}),
			}),
		);

		// Test useCls with basic configuration
		const { result } = renderHook(() =>
			useCls(ButtonCls, ({ what }) => ({
				variant: what.variant({
					variant: "secondary",
					size: "lg",
				}),
			})),
		);

		const classes = result.current;

		// Should apply secondary variant and large size
		expect(classes.root()).toBe(
			"rounded-md bg-gray-600 text-gray-900 px-6 py-3 m-3",
		);
		expect(classes.label()).toBe("text-gray-900");
	});
});
