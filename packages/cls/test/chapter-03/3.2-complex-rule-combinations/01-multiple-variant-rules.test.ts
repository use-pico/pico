import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.2 Complex Rule Combinations - Multiple Variant Rules", () => {
	it("should handle multiple variant rules with different combinations", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					color: [
						"primary",
						"secondary",
					],
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"rounded",
							"font-medium",
						]),
					}),
					def.rule(
						{
							size: "sm",
							color: "primary",
						},
						{
							root: what.css([
								"text-sm",
								"p-2",
								"bg-blue-500",
								"text-white",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
							color: "secondary",
						},
						{
							root: what.css([
								"text-lg",
								"p-6",
								"bg-green-500",
								"text-white",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "sm",
					color: "primary",
				}),
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe(
			"rounded font-medium text-sm p-2 bg-blue-500 text-white",
		);
	});
});
