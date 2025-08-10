import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - Variant Inheritance", () => {
	it("should handle variant inheritance", () => {
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
				variant: {
					intent: [
						"default",
						"primary",
					],
					size: [
						"sm",
						"md",
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
							intent: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
							]),
						},
					),
				],
				defaults: def.defaults({
					intent: "default",
					size: "md",
				}),
			}),
		);

		const ExtendedButton = BaseButton.extend(
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
					size: [
						"sm",
						"md",
						"lg",
					],
					disabled: [
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
				],
				defaults: def.defaults({
					intent: "default",
					size: "md",
					disabled: false,
				}),
			}),
		);

		const defaultInstance = ExtendedButton.create();
		expect(defaultInstance.root()).toBe("bg-gray-100");

		const dangerInstance = ExtendedButton.create(({ what }) => ({
			variant: what.variant({
				intent: "danger",
			}),
		}));
		expect(dangerInstance.root()).toBe("bg-red-600");

		const disabledInstance = ExtendedButton.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
			}),
		}));
		expect(disabledInstance.root()).toBe(
			"bg-gray-100 opacity-50 cursor-not-allowed",
		);

		const dangerDisabledInstance = ExtendedButton.create(({ what }) => ({
			variant: what.variant({
				intent: "danger",
				disabled: true,
			}),
		}));
		expect(dangerDisabledInstance.root()).toBe(
			"bg-red-600 opacity-50 cursor-not-allowed",
		);
	});
});
