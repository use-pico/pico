import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Multiple Token Groups", () => {
	it("should handle multiple token groups with what.token", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
					],
					spacing: [
						"md",
					],
					typography: [
						"body",
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
					},
					spacing: {
						md: [
							"px-4",
							"py-2",
						],
					},
					typography: {
						body: [
							"text-sm",
							"font-normal",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"spacing.md",
							"typography.body",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe(
			"bg-gray-100 px-4 py-2 text-sm font-normal",
		);
	});
});
