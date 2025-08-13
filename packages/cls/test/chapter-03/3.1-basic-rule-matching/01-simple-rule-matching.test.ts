import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.1 Basic Rule Matching - Simple Rule Matching", () => {
	it("should handle simple rule matching with variant conditions", () => {
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
					def.root?.({
						root: what.css?.([
							"bg-gray-100",
							"rounded",
						]),
					}),
					def.rule?.(
						{
							size: "sm",
						},
						{
							root: what.css?.([
								"text-sm",
								"p-2",
							]),
						},
					),
					def.rule?.(
						{
							size: "lg",
						},
						{
							root: what.css?.([
								"text-lg",
								"p-6",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					size: "sm",
				}),
			}),
		);

		const instance = Component.create?.();
		expect(instance.root?.()).toBe("bg-gray-100 rounded text-sm p-2");
	});
});
