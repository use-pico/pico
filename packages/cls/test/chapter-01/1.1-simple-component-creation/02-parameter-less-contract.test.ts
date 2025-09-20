import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.1 Simple Component Creation - Parameter-less Contract", () => {
	it("should handle parameter-less contract scenarios", () => {
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
