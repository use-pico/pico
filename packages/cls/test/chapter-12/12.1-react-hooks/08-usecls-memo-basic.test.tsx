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
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"size.padding.medium": {
						class: [
							"px-4",
							"py-2",
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
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		const { result: r1 } = renderHook(() =>
			useClsMemo(ButtonCls, {
				variant: {
					size: "md",
				},
			}),
		);
		const { result: r2 } = renderHook(() =>
			useClsMemo(ButtonCls, {
				variant: {
					size: "md",
				},
			}),
		);

		expect(r1.current.slots.root()).toBe(r2.current.slots.root());
	});
});
