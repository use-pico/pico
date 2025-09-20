import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.1 What Utility Functions - what.css", () => {
	it("should handle what.css utility for direct CSS classes", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"bg-gray-100",
									"p-4",
									"rounded",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = Component.create();
		expect(slots.root()).toBe("bg-gray-100 p-4 rounded");
	});
});
