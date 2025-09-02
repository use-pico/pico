import { describe, expect, it } from "vitest";
import { cls, withVariants } from "../../../src";

describe("13.1 Utility Functions - withVariants - Undefined Variant Filtering", () => {
	it("should filter out undefined variant values from config", () => {
		// Create CLS instance with embedded contract and definition
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					theme: [
						"light",
						"dark",
					],
					state: [
						"normal",
						"hover",
						"active",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": what.css([
						"bg-blue-500",
					]),
				}),
				rules: [], // Add empty rules array
				defaults: def.defaults({
					size: "md",
					theme: "light",
					state: "normal",
				}),
			}),
		);

		// Test with config containing undefined values
		const result = withVariants(
			ButtonCls,
			() => ({
				variant: {
					size: "lg",
					theme: undefined, // This should be filtered out
					state: "hover",
				},
			}),
			() => ({
				variant: {
					theme: "dark", // This should override the undefined from user config
				},
			}),
		);

		// Should filter out undefined values and use defaults + provided values
		expect(result).toEqual({
			size: "lg",
			theme: "dark", // From internal config, not undefined
			state: "hover",
		});
	});
});
