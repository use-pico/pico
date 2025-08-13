import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("4.1 Basic Create Usage - Basic Create with Defaults", () => {
	it("should handle basic create method with default variant values", () => {
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
				},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"bg-gray-100",
							"rounded",
						]),
					}),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.css([
								"text-sm",
								"p-2",
							]),
						},
					),
					def.rule(
						{
							size: "md",
						},
						{
							root: what.css([
								"text-base",
								"p-4",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.css([
								"text-lg",
								"p-6",
							]),
						},
					),
				],
				defaults: def.defaults({
					size: "md",
				}),
			}),
		);

		const instance = Component.create();
		expect(instance.root()).toBe("bg-gray-100 rounded text-base p-4");
	});
});
