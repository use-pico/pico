import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useClsMemo } from "../../../src/react";

describe("12.1 React Hooks - useClsMemo basic", () => {
	it("memoizes slots factory and produces stable class output", () => {
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.text.primary",
					"size.padding.medium",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"size.padding.medium": what.css([
						"px-4",
						"py-2",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.primary",
							"color.text.primary",
							"size.padding.medium",
						]),
					}),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		const { result: r1 } = renderHook(() =>
			useClsMemo(ButtonCls, ({ what }) => ({
				variant: what.variant({
					size: "md",
				}),
			})),
		);
		const { result: r2 } = renderHook(() =>
			useClsMemo(ButtonCls, ({ what }) => ({
				variant: what.variant({
					size: "md",
				}),
			})),
		);

		expect(r1.current.root()).toBe(r2.current.root());
	});
});
