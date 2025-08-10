import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Complex Combinations", () => {
	it("should handle complex what.both combinations", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
					],
					"color.text": [
						"primary",
					],
					spacing: [
						"lg",
					],
					typography: [
						"heading",
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
					"color.text": {
						primary: [
							"text-white",
						],
					},
					spacing: {
						lg: [
							"px-6",
							"py-3",
						],
					},
					typography: {
						heading: [
							"text-lg",
							"font-semibold",
						],
					},
				}),
				rules: [
					def.root({
						root: what.both(
							[
								"inline-flex",
								"items-center",
								"justify-center",
								"rounded-lg",
								"shadow-md",
							],
							[
								"color.bg.primary",
								"color.text.primary",
								"spacing.lg",
								"typography.heading",
							],
						),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe(
			"inline-flex items-center justify-center rounded-lg shadow-md bg-blue-600 text-white px-6 py-3 text-lg font-semibold",
		);
	});
});
