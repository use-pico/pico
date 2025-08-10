import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - Boolean Variants Combined", () => {
	it("should handle combined boolean variants", () => {
		const Button = cls(
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
				variant: {
					disabled: [
						"bool",
					],
					loading: [
						"bool",
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
							disabled: true,
						},
						{
							root: what.css([
								"opacity-50",
								"cursor-not-allowed",
							]),
						},
					),
					def.rule(
						{
							loading: true,
						},
						{
							root: what.css([
								"animate-spin",
								"cursor-wait",
							]),
						},
					),
					def.rule(
						{
							disabled: true,
							loading: true,
						},
						{
							root: what.css([
								"opacity-25",
								"cursor-not-allowed",
								"animate-spin",
							]),
						},
					),
				],
				defaults: def.defaults({
					disabled: false,
					loading: false,
				}),
			}),
		);

		const defaultInstance = Button.create();
		expect(defaultInstance.root()).toBe("bg-gray-100");

		const disabledInstance = Button.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
			}),
		}));
		expect(disabledInstance.root()).toBe(
			"bg-gray-100 opacity-50 cursor-not-allowed",
		);

		const loadingInstance = Button.create(({ what }) => ({
			variant: what.variant({
				loading: true,
			}),
		}));
		expect(loadingInstance.root()).toBe(
			"bg-gray-100 animate-spin cursor-wait",
		);

		const disabledLoadingInstance = Button.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
				loading: true,
			}),
		}));
		expect(disabledLoadingInstance.root()).toBe(
			"bg-gray-100 opacity-25 cursor-not-allowed animate-spin",
		);
	});
});
