import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Stable References", () => {
	it("should maintain stable references for same configuration", () => {
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
					"size.padding.small",
					"size.padding.medium",
					"size.text.small",
					"size.text.medium",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
					],
					size: [
						"small",
						"medium",
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
					"size.padding.small": what.css([
						"px-2",
						"py-1",
					]),
					"size.padding.medium": what.css([
						"px-4",
						"py-2",
					]),
					"size.text.small": what.css([
						"text-sm",
					]),
					"size.text.medium": what.css([
						"text-base",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.primary",
							"color.text.primary",
							"size.padding.medium",
							"size.text.medium",
						]),
					}),
				],
				defaults: def.defaults({
					color: "primary",
					size: "medium",
				}),
			}),
		);

		// First render
		const { result: result1 } = renderHook(() =>
			useCls(ButtonCls, ({ what }) => ({
				variant: what.variant({
					color: "primary",
					size: "medium",
				}),
			})),
		);

		// Second render with same configuration
		const { result: result2 } = renderHook(() =>
			useCls(ButtonCls, ({ what }) => ({
				variant: what.variant({
					color: "primary",
					size: "medium",
				}),
			})),
		);

		// Should produce same class strings
		expect(result1.current.root()).toBe(result2.current.root());
	});
});
