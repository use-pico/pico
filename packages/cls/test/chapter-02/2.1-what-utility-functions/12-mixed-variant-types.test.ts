import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Mixed Variant Types", () => {
	it("should handle mixed variant types with what.variant", () => {
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
						what.variant({
							intent: "primary",
						}),
						{
							root: what.token([
								"color.bg.primary",
							]),
						},
					),
					def.rule(
						what.variant({
							intent: "danger",
						}),
						{
							root: what.token([
								"color.bg.danger",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "sm",
						}),
						{
							root: what.css([
								"px-2",
								"py-1",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "lg",
						}),
						{
							root: what.css([
								"px-6",
								"py-3",
							]),
						},
					),
					def.rule(
						what.variant({
							disabled: true,
						}),
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

		const defaultInstance = Button.create();
		expect(defaultInstance.root()).toBe("bg-gray-100");

		const primarySmallInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
				size: "sm",
			}),
		}));
		expect(primarySmallInstance.root()).toBe("bg-blue-600 px-2 py-1");

		const dangerLargeInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "danger",
				size: "lg",
			}),
		}));
		expect(dangerLargeInstance.root()).toBe("bg-red-600 px-6 py-3");

		const primaryDisabledInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
				disabled: true,
			}),
		}));
		expect(primaryDisabledInstance.root()).toBe(
			"bg-blue-600 opacity-50 cursor-not-allowed",
		);
	});
});
