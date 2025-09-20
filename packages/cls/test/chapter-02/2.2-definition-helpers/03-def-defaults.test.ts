import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.2 Definition Helpers - def.defaults", () => {
	it("should handle def.defaults helper for default variant values", () => {
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
					size: "md",
					color: "primary",
				},
			},
		);

		const { slots } = Component.create();
		expect(slots.root()).toBe("bg-gray-100");
	});
});
