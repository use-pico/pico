import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Configuration Function Changes", () => {
	it("should handle configuration function changes efficiently", () => {
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-600",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.secondary": what.css([
						"text-gray-900",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
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

		const configFn = vi.fn?.(({ what }) => ({
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
		expect(configFn).toHaveBeenCalledTimes(4);
		expect(result1.current.root()).toBe(result2.current.root());
	});
});
