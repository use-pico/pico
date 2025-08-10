import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - Enum Variants Basic", () => {
	it("should handle basic enum variants", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
						"success",
						"warning",
						"danger",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"primary",
						"success",
						"warning",
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
						success: [
							"bg-green-600",
						],
						warning: [
							"bg-yellow-600",
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
							variant: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
							]),
						},
					),
					def.rule(
						{
							variant: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
							]),
						},
					),
					def.rule(
						{
							variant: "success",
						},
						{
							root: what.token([
								"color.bg.success",
							]),
						},
					),
					def.rule(
						{
							variant: "warning",
						},
						{
							root: what.token([
								"color.bg.warning",
							]),
						},
					),
					def.rule(
						{
							variant: "danger",
						},
						{
							root: what.token([
								"color.bg.danger",
							]),
						},
					),
				],
				defaults: def.defaults({
					variant: "default",
				}),
			}),
		);

		const defaultInstance = Button.create();
		expect(defaultInstance.root()).toBe("bg-gray-100");

		const primaryInstance = Button.create(({ what }) => ({
			variant: what.variant({
				variant: "primary",
			}),
		}));
		expect(primaryInstance.root()).toBe("bg-blue-600");

		const successInstance = Button.create(({ what }) => ({
			variant: what.variant({
				variant: "success",
			}),
		}));
		expect(successInstance.root()).toBe("bg-green-600");

		const warningInstance = Button.create(({ what }) => ({
			variant: what.variant({
				variant: "warning",
			}),
		}));
		expect(warningInstance.root()).toBe("bg-yellow-600");

		const dangerInstance = Button.create(({ what }) => ({
			variant: what.variant({
				variant: "danger",
			}),
		}));
		expect(dangerInstance.root()).toBe("bg-red-600");
	});
});
