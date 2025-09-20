import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token References", () => {
	it("should handle token references in token definitions", () => {
		const Component = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
					"button.base",
					"button.primary",
					"button.secondary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					// Base color tokens
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-600",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-200",
						],
					},
					// Base button token that references color tokens
					"button.base": {
						class: [
							"px-4",
							"py-2",
							"rounded",
							"font-medium",
						],
						token: [
							"color.text.primary",
						],
					},
					// Primary button that references base button and primary colors
					"button.primary": {
						token: [
							"button.base",
							"color.bg.primary",
						],
					},
					// Secondary button that references base button and secondary colors
					"button.secondary": {
						token: [
							"button.base",
							"color.bg.secondary",
							"color.text.secondary",
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

		const { slots } = Component.create();
		expect(slots.root()).toBe(
			"text-white px-4 py-2 rounded font-medium bg-blue-600",
		);
	});
});
