import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.1 React Hooks - Basic useCls - No Configuration", () => {
	it("should handle useCls with no configuration", () => {
		const SimpleCls = cls(
			{
				tokens: {
					"color.bg": [
						"default",
					],
					"color.text": [
						"default",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						default: [
							"bg-gray-100",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		// Test useCls with no configuration
		const { result } = renderHook(() => useCls(SimpleCls));

		const classes = result.current;

		// Should use default styling
		expect(classes.root()).toBe("bg-gray-100 text-gray-900");
	});
});
