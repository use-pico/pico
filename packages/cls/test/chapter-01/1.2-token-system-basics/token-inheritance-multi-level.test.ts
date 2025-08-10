import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Inheritance Multi Level", () => {
	it("should handle token inheritance with multiple levels", () => {
		const Level1 = cls(
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

		const Level2 = Level1.extend(
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

		const Level3 = Level2.extend(
			{
				tokens: {
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
							"color.bg.default",
							"color.text.default",
							"spacing.md",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Level3.create();
		const rootClasses = instance.root();
		expect(rootClasses).toBe("bg-gray-100 text-gray-900 px-4 py-2");
	});
});
