import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Order Maintenance", () => {
	it("should maintain order with what.both (classes first, then tokens)", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
					],
					spacing: [
						"md",
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
				}),
				rules: [
					def.root({
						root: what.both(
							[
								"first-class",
								"second-class",
							],
							[
								"color.bg.default",
								"spacing.md",
							],
						),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe(
			"first-class second-class bg-gray-100 px-4 py-2",
		);
	});
});
