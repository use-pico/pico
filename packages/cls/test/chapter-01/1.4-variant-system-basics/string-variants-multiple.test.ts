import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - String Variants Multiple", () => {
	it("should handle multiple string variants", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
					],
					spacing: [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
				],
				variant: {
					color: [
						"default",
						"primary",
					],
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
					spacing: {
						sm: [
							"px-2",
							"py-1",
						],
						md: [
							"px-4",
							"py-2",
						],
						lg: [
							"px-6",
							"py-3",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"spacing.md",
						]),
					}),
					def.rule(
						{
							color: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
								"spacing.md",
							]),
						},
					),
				],
				defaults: def.defaults({
					color: "default",
					size: "md",
				}),
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe("bg-gray-100 px-4 py-2");
	});
});
