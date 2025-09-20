import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Conditional Logic", () => {
	it("should handle useCls with conditional logic", () => {
		// Create the cls instance
		const ConditionalCls = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.success",
					"color.bg.warning",
					"color.bg.error",
					"color.text.default",
					"color.text.success",
					"color.text.warning",
					"color.text.error",
					"border.color.default",
					"border.color.success",
					"border.color.warning",
					"border.color.error",
				],
				slot: [
					"root",
					"message",
				],
				variant: {
					type: [
						"default",
						"success",
						"warning",
						"error",
					],
					interactive: [
						"bool",
					],
				},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.bg.success": {
						class: [
							"bg-green-100",
						],
					},
					"color.bg.warning": {
						class: [
							"bg-yellow-100",
						],
					},
					"color.bg.error": {
						class: [
							"bg-red-100",
						],
					},
					"color.text.default": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.success": {
						class: [
							"text-green-900",
						],
					},
					"color.text.warning": {
						class: [
							"text-yellow-900",
						],
					},
					"color.text.error": {
						class: [
							"text-red-900",
						],
					},
					"border.color.default": {
						class: [
							"border-gray-300",
						],
					},
					"border.color.success": {
						class: [
							"border-green-300",
						],
					},
					"border.color.warning": {
						class: [
							"border-yellow-300",
						],
					},
					"border.color.error": {
						class: [
							"border-red-300",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.default",
									"border.color.default",
								],
							},
							message: {
								token: [
									"color.text.default",
								],
							},
						},
					},
					{
						match: {
							type: "success",
						},
						slot: {
							root: {
								token: [
									"color.bg.success",
									"color.text.success",
									"border.color.success",
								],
							},
							message: {
								token: [
									"color.text.success",
								],
							},
						},
					},
					{
						match: {
							type: "warning",
						},
						slot: {
							root: {
								token: [
									"color.bg.warning",
									"color.text.warning",
									"border.color.warning",
								],
							},
							message: {
								token: [
									"color.text.warning",
								],
							},
						},
					},
					{
						match: {
							type: "error",
						},
						slot: {
							root: {
								token: [
									"color.bg.error",
									"color.text.error",
									"border.color.error",
								],
							},
							message: {
								token: [
									"color.text.error",
								],
							},
						},
					},
					{
						match: {
							interactive: true,
						},
						slot: {
							root: {
								class: [
									"cursor-pointer",
									"hover:opacity-80",
								],
							},
						},
					},
				],
				defaults: {
					type: "default",
					interactive: false,
				},
			},
		);

		// Test with conditional logic
		const { result } = renderHook(() =>
			useCls(ConditionalCls, {
				variant: {
					type: "default",
					interactive: false,
				},
			}),
		);

		const { slots } = result.current;

		// Should apply default styling
		expect(slots.root()).toBe("bg-gray-100 text-gray-900 border-gray-300");
		expect(slots.message()).toBe("text-gray-900");
	});
});
