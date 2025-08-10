import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Advanced useCls - Computed Values and Functions", () => {
	it("should handle useCls with computed values and functions", () => {
		const ComputedCls = cls(
			{
				tokens: {
					"color.bg": [
						"base",
						"computed",
					],
					"color.text": [
						"base",
						"computed",
					],
					"spacing.padding": [
						"base",
						"computed",
					],
				},
				slot: [
					"root",
				],
				variant: {
					intensity: [
						"low",
						"medium",
						"high",
					],
					scale: [
						"small",
						"medium",
						"large",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						base: [
							"bg-gray-100",
						],
						computed: [
							"bg-blue-100",
						],
					},
					"color.text": {
						base: [
							"text-gray-900",
						],
						computed: [
							"text-blue-900",
						],
					},
					"spacing.padding": {
						base: [
							"p-2",
						],
						computed: [
							"p-4",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.base",
							"color.text.base",
							"spacing.padding.base",
						]),
					}),
					def.rule(
						{
							intensity: "high",
						},
						{
							root: what.token([
								"color.bg.computed",
								"color.text.computed",
								"spacing.padding.computed",
							]),
						},
					),
				],
				defaults: def.defaults({
					intensity: "low",
					scale: "medium",
				}),
			}),
		);

		// Test with computed values
		const { result } = renderHook(() =>
			useCls(ComputedCls, ({ what }) => ({
				variant: what.variant({
					intensity: "high",
					scale: "large",
				}),
			})),
		);

		const classes = result.current;

		// Should apply computed styling for high intensity
		expect(classes.root()).toBe("bg-blue-100 text-blue-900 p-4");
	});
});
