import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Multiple Classes", () => {
	it("should handle token with multiple CSS classes", () => {
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
						primary: [
							"bg-blue-600",
							"hover:bg-blue-700",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		const rootClasses = instance.root();
		expect(rootClasses).toBe("bg-blue-600 hover:bg-blue-700");
	});
});
