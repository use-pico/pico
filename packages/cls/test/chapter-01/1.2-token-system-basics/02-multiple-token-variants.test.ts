import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Multiple Token Variants", () => {
	it("should handle multiple token variants", () => {
		const Component = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
					"color.bg.secondary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.bg.primary": [
						"bg-blue-500",
					],
					"color.bg.secondary": [
						"bg-green-500",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Component.create?.();
		expect(instance.root?.()).toBe("bg-gray-100");
	});
});
