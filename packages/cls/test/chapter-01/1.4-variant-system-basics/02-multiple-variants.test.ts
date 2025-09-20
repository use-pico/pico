import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.4 Variant System Basics - Multiple Variants", () => {
	it("should handle multiple variants", () => {
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
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"bg-gray-100",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					color: "primary",
				},
			},
		);

		const { slots } = Component.create();
		expect(slots.root()).toBe("bg-gray-100");
	});
});
