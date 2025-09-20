import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Computed Values and Functions", () => {
	it("should handle useCls with computed values and functions", () => {
		// Create the cls instance
		const ComputedCls = cls(
			{
				tokens: [
					"color.bg.base",
					"color.bg.computed",
					"color.text.base",
					"color.text.computed",
					"spacing.padding.base",
					"spacing.padding.computed",
				],
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
			{
				token: {
					"color.bg.base": {
						class: [
							"bg-gray-100",
						],
					},
					"color.bg.computed": {
						class: [
							"bg-blue-100",
						],
					},
					"color.text.base": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.computed": {
						class: [
							"text-blue-900",
						],
					},
					"spacing.padding.base": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.computed": {
						class: [
							"p-4",
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
									"spacing.padding.base",
								],
							},
						},
					},
					{
						match: {
							intensity: "high",
						},
						slot: {
							root: {
								token: [
									"color.bg.computed",
									"color.text.computed",
									"spacing.padding.computed",
								],
							},
						},
					},
				],
				defaults: {
					intensity: "low",
					scale: "medium",
				},
			},
		);

		// Test with computed values
		const { result } = renderHook(() =>
			useCls(ComputedCls, {
				variant: {
					intensity: "high",
					scale: "large",
				},
			}),
		);

		const { slots } = result.current;

		// Should apply computed styling for high intensity
		expect(slots.root()).toBe("bg-blue-100 text-blue-900 p-4");
	});
});
