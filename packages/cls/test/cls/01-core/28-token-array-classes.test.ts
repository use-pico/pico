import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/token-array-classes", () => {
	it("token with multiple classes should merge correctly", () => {
		const $cls = cls(
			{
				tokens: [
					"color.text",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.text": {
						class: [
							"text-red-500",
							"bg-blue-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.text",
								],
								class: [
									"root-1",
									"root-2",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		// Test parameter-less create first
		const { slots: baseSlots } = $cls.create();
		expect(baseSlots.root()).toBe(
			"text-red-500 bg-blue-500 root-1 root-2",
		);
	});
});
