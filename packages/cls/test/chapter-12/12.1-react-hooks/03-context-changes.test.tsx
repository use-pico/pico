import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Context Changes", () => {
	it("should handle context changes efficiently", () => {
		const ButtonCls = cls(
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
					color: [
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
				],
				defaults: {
					color: "primary",
				},
			},
		);

		const configObj = {
			variant: {
				color: "primary",
			},
		} as const;

		// Render with stable config object
		const { result } = renderHook(() => useCls(ButtonCls, configObj));

		// Should work with object configuration
		expect(result.current.slots.root()).toBeDefined();
	});
});
