import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.1 Simple Component Creation - Parameter Less Create", () => {
	it("should handle parameter-less create() call with defaults", () => {
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
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						default: [
							"bg-gray-100",
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
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		const classes = Button.create();
		expect(classes.root()).toBe("bg-gray-100");
	});
});
