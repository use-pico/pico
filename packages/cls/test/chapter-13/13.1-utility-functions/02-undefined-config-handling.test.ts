import { describe, expect, it } from "vitest";
import { cls, withVariants } from "../../../src";

describe("13.1 Utility Functions - withVariants - Undefined Config Handling", () => {
	it("should handle undefined config functions gracefully", () => {
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
				}),
			}),
		);

		// Test with undefined config functions
		const result = withVariants(ButtonCls);

		// Should use defaults when no config is provided
		expect(result).toEqual({
			size: "md",
		});
	});
});
