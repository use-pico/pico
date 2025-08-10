import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Single Slot Classes and Tokens", () => {
	it("should handle single slot with both classes and tokens", () => {
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
								"rounded-md",
								"shadow",
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
		expect(rootClasses).toBe("rounded-md shadow bg-blue-600");
	});
});
