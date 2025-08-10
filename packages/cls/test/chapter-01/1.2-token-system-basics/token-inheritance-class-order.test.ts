import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Inheritance Class Order", () => {
	it("should maintain correct class order in inheritance chain", () => {
		const Base = cls(
			{
				tokens: {
					"color.bg": [
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
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const Extended = Base.extend(
			{
				tokens: {
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
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Extended.create();
		const rootClasses = instance.root();

		// Test exact class order and presence
		expect(rootClasses).toBe("bg-gray-100 text-gray-900");
	});
});
