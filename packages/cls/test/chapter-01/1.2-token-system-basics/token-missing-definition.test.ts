import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Missing Definition", () => {
	it("should handle missing token definitions gracefully", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
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
						default: [], // Empty array for missing definition
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
