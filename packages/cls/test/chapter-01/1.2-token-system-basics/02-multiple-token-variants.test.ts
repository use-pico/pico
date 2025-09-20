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
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-500",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-green-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = Component.create();
		expect(slots.root()).toBe("bg-gray-100");
	});
});
