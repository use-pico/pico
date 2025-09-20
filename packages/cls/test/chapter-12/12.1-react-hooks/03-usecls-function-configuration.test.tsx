import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Basic useCls - Function Configuration", () => {
	it("should handle useCls with function configuration", () => {
		const VariantCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
				],
				slot: [
					"root",
				],
				variant: {
					variant: [
						"primary",
						"secondary",
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
				},
				rules: [
					{
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
							variant: "secondary",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
				},
			},
		);

		// Test useCls with object configuration
		const { result } = renderHook(() =>
			useCls(VariantCls, {
				variant: {
					variant: "secondary",
				},
			}),
		);

		const { slots } = result.current;

		// Should apply secondary variant
		expect(slots.root()).toBe("bg-gray-600 text-gray-900");
	});
});
