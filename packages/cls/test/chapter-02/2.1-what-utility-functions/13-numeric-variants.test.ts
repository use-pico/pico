import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - Numeric Variants", () => {
	it("should handle numeric variants with what.variant", () => {
		const Button = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					size: [
						"1",
						"2",
						"3",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"inline-flex",
							"items-center",
						]),
					}),
					def.rule(
						what.variant({
							size: "1",
						}),
						{
							root: what.css([
								"px-2",
								"py-1",
								"text-sm",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "2",
						}),
						{
							root: what.css([
								"px-4",
								"py-2",
								"text-base",
							]),
						},
					),
					def.rule(
						what.variant({
							size: "3",
						}),
						{
							root: what.css([
								"px-6",
								"py-3",
								"text-lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "2",
				}),
			}),
		);

		const defaultInstance = Button.create();
		expect(defaultInstance.root()).toBe(
			"inline-flex items-center px-4 py-2 text-base",
		);

		const smallInstance = Button.create(({ what }) => ({
			variant: what.variant({
				size: "1",
			}),
		}));
		expect(smallInstance.root()).toBe(
			"inline-flex items-center px-2 py-1 text-sm",
		);

		const largeInstance = Button.create(({ what }) => ({
			variant: what.variant({
				size: "3",
			}),
		}));
		expect(largeInstance.root()).toBe(
			"inline-flex items-center px-6 py-3 text-lg",
		);
	});
});
