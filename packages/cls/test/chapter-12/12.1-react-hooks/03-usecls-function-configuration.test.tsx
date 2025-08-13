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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": [
						"bg-blue-600",
					],
					"color.bg.secondary": [
						"bg-gray-600",
					],
					"color.text.primary": [
						"text-white",
					],
					"color.text.secondary": [
						"text-gray-900",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
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
						},
					),
				],
				defaults: def.defaults({
					variant: "primary",
				}),
			}),
		);

		// Test useCls with function configuration
		const { result } = renderHook(() =>
			useCls(VariantCls, ({ what }) => ({
				variant: what.variant({
					variant: "secondary",
				}),
			})),
		);

		const classes = result.current;

		// Should apply secondary variant
		expect(classes.root()).toBe("bg-gray-600 text-gray-900");
	});
});
