import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useClsExMemo } from "../../../src/react";

describe("12.1 React Hooks - useClsExMemo basic", () => {
	it("memoizes slots and variants output remains consistent", () => {
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
			useClsExMemo(ButtonCls, ({ what }) => ({
				variant: what.variant({
					size: "md",
				}),
			})),
		);
		const { result: r2 } = renderHook(() =>
			useClsExMemo(ButtonCls, ({ what }) => ({
				variant: what.variant({
					size: "md",
				}),
			})),
		);

		const value1 = r1.current;
		const value2 = r2.current;
		expect(value1.slots.root()).toBe(value2.slots.root());
		expect(value1.variants.size).toBe("md");
	});
});
