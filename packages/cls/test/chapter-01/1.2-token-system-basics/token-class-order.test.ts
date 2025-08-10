import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Class Order", () => {
	it("should maintain correct class order for token resolution", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
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
						primary: [
							"bg-blue-600",
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
						root: what.token([
							"color.bg.primary",
							"spacing.md",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		const rootClasses = instance.root();

		// Test exact class order and presence
		expect(rootClasses).toBe("bg-blue-600 px-4 py-2");
	});
});
