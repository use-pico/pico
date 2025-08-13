import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - Single Variant", () => {
	it("should handle single variant", () => {
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
						]),
					}),
				],
				defaults: def.defaults?.({
					size: "sm",
				}),
			}),
		);

		const instance = Component.create?.();
		expect(instance.root?.()).toBe("bg-gray-100");
	});
});
