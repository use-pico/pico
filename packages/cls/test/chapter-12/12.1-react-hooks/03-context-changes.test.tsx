import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

		// Render with stable config function
		const { result } = renderHook(() => useCls(ButtonCls, configFn));

		// Should call config function once
		expect(configFn).toHaveBeenCalledTimes(2);
		expect(result.current.root()).toBeDefined();
	});
});
