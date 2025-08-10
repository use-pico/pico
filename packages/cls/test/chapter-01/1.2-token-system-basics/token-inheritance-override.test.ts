import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Inheritance Override", () => {
	it("should override inherited tokens when explicitly declared", () => {
		const BaseButton = cls(
			{
				tokens: {
					"color.bg": [
						"default",
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
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-600",
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

		const ExtendedButton = BaseButton.extend(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
						"secondary",
					], // Explicitly declare color.bg
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
							"bg-gray-200",
						], // Override inherited value
						primary: [
							"bg-blue-700",
						], // Override inherited value
						secondary: [
							"bg-green-600",
						], // New token
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

		const instance = ExtendedButton.create();
		const rootClasses = instance.root();
		expect(rootClasses).toBe("bg-gray-200"); // Should use overridden value
	});
});
