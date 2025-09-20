import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Handle Missing Tokens", () => {
	it("should handle missing tokens gracefully", () => {
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					// Missing secondary color token
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
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"color.bg.primary",
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

		const { result } = renderHook(() =>
			useCls(ButtonCls, {
				variant: {
					color: "secondary",
				},
			}),
		);

		const { slots } = result.current;

		// Should handle missing tokens gracefully
		expect(slots.root()).toBeDefined();
		expect(typeof slots.root()).toBe("string");
	});
});
