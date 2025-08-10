import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots Token References", () => {
	it("should handle multiple slots with token references", () => {
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
					"label",
					"icon",
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
						]),
						label: what.token([
							"color.text.white",
						]),
						icon: what.css([
							"ml-2",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe("bg-blue-600");
		expect(instance.label()).toBe("text-white");
		expect(instance.icon()).toBe("ml-2");
	});
});
