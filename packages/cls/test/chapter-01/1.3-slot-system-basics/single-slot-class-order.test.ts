import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Single Slot Class Order", () => {
	it("should maintain correct class order in single slot", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
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
						primary: [
							"bg-blue-600",
						],
					},
				}),
				rules: [
					def.root({
						root: what.both(
							[
								"base-class",
								"layout-class",
							],
							[
								"color.bg.primary",
							],
						),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		const rootClasses = instance.root();

		// Base classes should come before token classes
		expect(rootClasses).toBe("base-class layout-class bg-blue-600");
	});
});
