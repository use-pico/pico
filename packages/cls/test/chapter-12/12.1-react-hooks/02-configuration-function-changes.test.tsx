import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Configuration Function Changes", () => {
	it("should handle configuration function changes efficiently", () => {
		const ButtonCls = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
						"secondary",
					],
					"color.text": [
						"primary",
						"secondary",
					],
				},
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
				token: def.token({
					"color.bg": {
						primary: [
							"bg-blue-600",
						],
						secondary: [
							"bg-gray-600",
						],
					},
					"color.text": {
						primary: [
							"text-white",
						],
						secondary: [
							"text-gray-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
						]),
					}),
				],
				defaults: def.defaults({
					color: "primary",
				}),
			}),
		);

		const configFn = vi.fn(({ what }) => ({
			variant: what.variant({
				color: "primary",
			}),
		}));

		// First render
		const { result: result1 } = renderHook(() =>
			useCls(ButtonCls, configFn),
		);

		// Second render with same function reference
		const { result: result2 } = renderHook(() =>
			useCls(ButtonCls, configFn),
		);

		// Should call config function only once per render
		expect(configFn).toHaveBeenCalledTimes(2);
		expect(result1.current.root()).toBe(result2.current.root());
	});
});
