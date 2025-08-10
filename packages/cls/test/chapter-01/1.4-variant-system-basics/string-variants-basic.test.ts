import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - String Variants Basic", () => {
	it("should handle basic string variants", () => {
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
					def.rule(
						{
							size: "md",
						},
						{
							root: what.token([
								"color.bg.primary",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "sm",
				}),
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe("bg-gray-100");

		const primaryInstance = Button.create(({ what }) => ({
			variant: what.variant({
				size: "md",
			}),
		}));
		expect(primaryInstance.root()).toBe("bg-blue-600");
	});
});
