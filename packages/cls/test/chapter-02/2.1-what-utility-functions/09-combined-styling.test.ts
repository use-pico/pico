import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Combined Styling", () => {
	it("should handle combined styling with what.both", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
					],
					"color.text": [
						"default",
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
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.both(
							[
								"inline-flex",
								"items-center",
								"rounded-md",
							],
							[
								"color.bg.default",
								"color.text.default",
							],
						),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe(
			"inline-flex items-center rounded-md bg-gray-100 text-gray-900",
		);
	});
});
