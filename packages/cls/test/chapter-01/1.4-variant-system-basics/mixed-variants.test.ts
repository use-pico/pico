import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - Mixed Variants", () => {
	it("should handle mixed variant types", () => {
		const Button = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"primary",
						"danger",
					],
					spacing: [
						"sm",
						"md",
						"lg",
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
						danger: [
							"bg-red-600",
						],
					},
					spacing: {
						sm: [
							"px-2",
							"py-1",
						],
						md: [
							"px-4",
							"py-2",
						],
						lg: [
							"px-6",
							"py-3",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"spacing.md",
						]),
					}),
					def.rule(
						{
							intent: "primary",
						},
						{
							root: what.token([
								"color.bg.primary",
								"spacing.md",
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
								"spacing.md",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"color.bg.default",
								"spacing.sm",
							]),
						},
					),
					def.rule(
						{
							intent: "primary",
							size: "sm",
						},
						{
							root: what.token([
								"color.bg.primary",
								"spacing.sm",
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
				],
				defaults: def.defaults({
					intent: "default",
					size: "md",
					disabled: false,
					loading: false,
				}),
			}),
		);

		const defaultInstance = Button.create();
		expect(defaultInstance.root()).toBe("bg-gray-100 px-4 py-2");

		const primaryInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
			}),
		}));
		expect(primaryInstance.root()).toBe("bg-blue-600 px-4 py-2");

		const smallInstance = Button.create(({ what }) => ({
			variant: what.variant({
				size: "sm",
			}),
		}));
		expect(smallInstance.root()).toBe("bg-gray-100 px-2 py-1");

		const disabledInstance = Button.create(({ what }) => ({
			variant: what.variant({
				disabled: true,
			}),
		}));
		expect(disabledInstance.root()).toBe(
			"bg-gray-100 px-4 py-2 opacity-50 cursor-not-allowed",
		);

		const loadingInstance = Button.create(({ what }) => ({
			variant: what.variant({
				loading: true,
			}),
		}));
		expect(loadingInstance.root()).toBe(
			"bg-gray-100 px-4 py-2 animate-spin cursor-wait",
		);

		const primarySmallInstance = Button.create(({ what }) => ({
			variant: what.variant({
				intent: "primary",
				size: "sm",
			}),
		}));
		expect(primarySmallInstance.root()).toBe("bg-blue-600 px-2 py-1");
	});
});
