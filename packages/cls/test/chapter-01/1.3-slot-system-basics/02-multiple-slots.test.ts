import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Multiple Slots", () => {
	it("should handle multiple slots", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
					"label",
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
								],
							},
							label: {
								class: [
									"text-sm",
									"font-medium",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = Component.create();
		expect(slots.root()).toBe("bg-gray-100 p-4");
		expect(slots.label()).toBe("text-sm font-medium");
	});
});
