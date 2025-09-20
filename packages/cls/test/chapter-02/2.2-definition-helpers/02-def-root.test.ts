import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("2.2 Definition Helpers - def.root", () => {
	it("should handle def.root helper for root slot rules", () => {
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
									"rounded-lg",
									"shadow-sm",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = Component.create();
		expect(slots.root()).toBe("bg-gray-100 p-4 rounded-lg shadow-sm");
	});
});
