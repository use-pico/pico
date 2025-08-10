import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Single Slot Empty Tokens", () => {
	it("should handle single slot with empty token definitions", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
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
						primary: [], // Empty array
					},
				}),
				rules: [
					def.root({
						root: what.css([
							"fallback-class",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe("fallback-class");
	});
});
