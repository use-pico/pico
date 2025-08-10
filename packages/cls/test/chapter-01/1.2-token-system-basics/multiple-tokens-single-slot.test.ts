import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Multiple Tokens Single Slot", () => {
	it("should resolve multiple tokens in a single slot", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
					],
					"color.text": [
						"white",
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
						primary: [
							"bg-blue-600",
						],
					},
					"color.text": {
						white: [
							"text-white",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.white",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		const rootClasses = instance.root();
		expect(rootClasses).toBe("bg-blue-600 text-white");
	});
});
