import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Valid Token References", () => {
	it("should not throw error for valid token references", () => {
		const Component = cls(
			{
				tokens: [
					"color.primary",
					"spacing.md",
					"button.base",
					"button.primary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.primary": {
						class: [
							"bg-blue-600",
							"text-white",
						],
					},
					"spacing.md": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"button.base": {
						class: [
							"rounded",
							"font-medium",
						],
						token: [
							"spacing.md",
						],
					},
					"button.primary": {
						token: [
							"button.base",
							"color.primary",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"button.primary",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		// This should not throw an error
		const { slots } = Component.create();
		expect(slots.root()).toBe(
			"px-4 py-2 rounded font-medium bg-blue-600 text-white",
		);
	});
});
