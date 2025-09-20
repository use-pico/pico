import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Stable References", () => {
	it("should maintain stable references for same configuration", () => {
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
					"size.padding.small",
					"size.padding.medium",
					"size.text.small",
					"size.text.medium",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
					],
					size: [
						"small",
						"medium",
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
					"size.padding.small": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"size.padding.medium": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"size.text.small": {
						class: [
							"text-sm",
						],
					},
					"size.text.medium": {
						class: [
							"text-base",
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
									"size.padding.medium",
									"size.text.medium",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "medium",
				},
			},
		);

		// First render
		const { result: result1 } = renderHook(() =>
			useCls(ButtonCls, {
				variant: {
					color: "primary",
					size: "medium",
				},
			}),
		);

		// Second render with same configuration
		const { result: result2 } = renderHook(() =>
			useCls(ButtonCls, {
				variant: {
					color: "primary",
					size: "medium",
				},
			}),
		);

		// Should produce same class strings
		expect(result1.current.slots.root()).toBe(result2.current.slots.root());
	});
});
