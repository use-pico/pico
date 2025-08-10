import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - Boolean Variants Basic", () => {
	it("should handle basic boolean variants", () => {
		const Button = cls(
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
				variant: {
					disabled: [
						"bool",
					],
				},
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
					def.rule(
						{
							disabled: false,
						},
						{
							root: what.token([
								"color.bg.primary",
							]),
						},
					),
					def.rule(
						{
							disabled: true,
						},
						{
							root: what.css([
								"opacity-50",
								"cursor-not-allowed",
							]),
						},
					),
				],
				defaults: def.defaults({
					disabled: false,
				}),
			}),
		);

		const enabledInstance = Button.create();
		expect(enabledInstance.root()).toBe("bg-blue-600");

		const disabledInstance = Button.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
			}),
		}));
		expect(disabledInstance.root()).toBe(
			"bg-gray-100 opacity-50 cursor-not-allowed",
		);
	});
});
