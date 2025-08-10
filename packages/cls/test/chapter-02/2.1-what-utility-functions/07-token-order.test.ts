import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Token Order", () => {
	it("should maintain token order with what.token", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"first",
						"second",
						"third",
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
						first: [
							"first-class",
						],
						second: [
							"second-class",
						],
						third: [
							"third-class",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.first",
							"color.bg.second",
							"color.bg.third",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe("first-class second-class third-class");
	});
});
