import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - String Variants Conditional", () => {
	it("should handle conditional string variants", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
						"danger",
					],
				},
				slot: [
					"root",
				],
				variant: {
					intent: [
						"default",
						"primary",
						"danger",
					],
				},
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
						danger: [
							"bg-red-600",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
						]),
					}),
					def.rule(
						{
							intent: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
							]),
						},
					),
					def.rule(
						{
							intent: "danger",
						},
						{
							root: what.token([
								"color.bg.danger",
							]),
						},
					),
				],
				defaults: def.defaults({
					intent: "default",
				}),
			}),
		);

		const defaultInstance = Button.create();
		expect(defaultInstance.root()).toBe("bg-gray-100");

		const primaryInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
			}),
		}));
		expect(primaryInstance.root()).toBe("bg-blue-600");

		const dangerInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "danger",
			}),
		}));
		expect(dangerInstance.root()).toBe("bg-red-600");
	});
});
