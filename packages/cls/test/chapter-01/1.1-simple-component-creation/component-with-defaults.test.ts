import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.1 Simple Component Creation - Component With Defaults", () => {
	it("should create component with default values", () => {
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
					size: [
						"sm",
						"md",
						"lg",
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
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe("bg-gray-100");
	});
});
