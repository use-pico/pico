import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Inheritance Append", () => {
	it("should append to inherited tokens when not explicitly declared", () => {
		const BaseButton = cls(
			{
				tokens: {
					"color.bg": [
						"default",
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
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-600",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const ExtendedButton = BaseButton.extend(
			{
				tokens: {
					"color.text": [
						"default",
					], // Don't declare color.bg
				},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
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

		const instance = ExtendedButton.create();
		const rootClasses = instance.root();
		expect(rootClasses).toBe("bg-gray-100 text-gray-900"); // Should inherit from parent
	});
});
