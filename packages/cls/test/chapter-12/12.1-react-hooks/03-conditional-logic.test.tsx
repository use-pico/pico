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
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.bg.success": [
						"bg-green-100",
					],
					"color.bg.warning": [
						"bg-yellow-100",
					],
					"color.bg.error": [
						"bg-red-100",
					],
					"color.text.default": [
						"text-gray-900",
					],
					"color.text.success": [
						"text-green-900",
					],
					"color.text.warning": [
						"text-yellow-900",
					],
					"color.text.error": [
						"text-red-900",
					],
					"border.color.default": [
						"border-gray-300",
					],
					"border.color.success": [
						"border-green-300",
					],
					"border.color.warning": [
						"border-yellow-300",
					],
					"border.color.error": [
						"border-red-300",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.default",
							"color.text.default",
							"border.color.default",
						]),
						message: what.token?.([
							"color.text.default",
						]),
					}),
					def.rule?.(
						{
							type: "success",
						},
						{
							root: what.token?.([
								"color.bg.success",
								"color.text.success",
								"border.color.success",
							]),
							message: what.token?.([
								"color.text.success",
							]),
						},
					),
					def.rule?.(
						{
							type: "warning",
						},
						{
							root: what.token?.([
								"color.bg.warning",
								"color.text.warning",
								"border.color.warning",
							]),
							message: what.token?.([
								"color.text.warning",
							]),
						},
					),
					def.rule?.(
						{
							type: "error",
						},
						{
							root: what.token?.([
								"color.bg.error",
								"color.text.error",
								"border.color.error",
							]),
							message: what.token?.([
								"color.text.error",
							]),
						},
					),
					def.rule?.(
						{
							interactive: true,
						},
						{
							root: what.css?.([
								"cursor-pointer",
								"hover:opacity-80",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					type: "default",
					interactive: false,
				}),
			}),
		);

		// Test with conditional logic
		const { result } = renderHook(() =>
			useCls(ConditionalCls, ({ what }) => ({
				variant: what.variant?.({
					type: "default",
					interactive: false,
				}),
			})),
		);

		const classes = result.current;

		// Should apply default styling
		expect(classes.root?.()).toBe(
			"bg-gray-100 text-gray-900 border-gray-300",
		);
		expect(classes.message?.()).toBe("text-gray-900");
	});
});
