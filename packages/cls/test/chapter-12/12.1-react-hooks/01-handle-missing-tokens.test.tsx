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
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.primary": [
						"bg-blue-600",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.primary",
						]),
					}),
				],
				defaults: def.defaults?.({
					color: "primary",
				}),
			}),
		);

		const { result } = renderHook(() =>
			useCls(ButtonCls, ({ what }) => ({
				variant: what.variant?.({
					color: "secondary",
				}),
			})),
		);

		const classes = result.current;

		// Should handle missing tokens gracefully
		expect(classes.root?.()).toBeDefined();
		expect(typeof classes.root?.()).toBe("string");
	});
});
