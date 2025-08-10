import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Single Slot Token References", () => {
	it("should handle single slot with token references", () => {
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
		expect(instance.root()).toBe("bg-blue-600");
	});
});
