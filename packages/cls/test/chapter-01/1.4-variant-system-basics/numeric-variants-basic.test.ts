import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - Numeric Variants Basic", () => {
	it("should handle basic numeric variants", () => {
		const Spacer = cls(
			{
				tokens: {
					spacing: [
						"xs",
						"sm",
						"md",
						"lg",
						"xl",
					],
				},
				slot: [
					"root",
				],
				variant: {
					size: [
						"1",
						"2",
						"3",
						"4",
						"5",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					spacing: {
						xs: [
							"p-1",
						],
						sm: [
							"p-2",
						],
						md: [
							"p-3",
						],
						lg: [
							"p-4",
						],
						xl: [
							"p-5",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"spacing.xs",
						]),
					}),
					def.rule(
						{
							size: "2",
						},
						{
							root: what.token([
								"spacing.sm",
							]),
						},
					),
					def.rule(
						{
							size: "3",
						},
						{
							root: what.token([
								"spacing.md",
							]),
						},
					),
					def.rule(
						{
							size: "4",
						},
						{
							root: what.token([
								"spacing.lg",
							]),
						},
					),
					def.rule(
						{
							size: "5",
						},
						{
							root: what.token([
								"spacing.xl",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "1",
				}),
			}),
		);

		const defaultInstance = Spacer.create();
		expect(defaultInstance.root()).toBe("p-1");

		const size2Instance = Spacer.create(({ what }) => ({
			variant: what.variant({
				size: "2",
			}),
		}));
		expect(size2Instance.root()).toBe("p-2");

		const size5Instance = Spacer.create(({ what }) => ({
			variant: what.variant({
				size: "5",
			}),
		}));
		expect(size5Instance.root()).toBe("p-5");
	});
});
