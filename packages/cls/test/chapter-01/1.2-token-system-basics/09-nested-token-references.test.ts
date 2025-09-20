import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Nested Token References", () => {
	it("should handle nested token references", () => {
		const Component = cls(
			{
				tokens: [
					"spacing.xs",
					"spacing.sm",
					"spacing.md",
					"spacing.lg",
					"padding.small",
					"padding.medium",
					"padding.large",
					"button.small",
					"button.medium",
					"button.large",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					// Base spacing tokens
					"spacing.xs": {
						class: [
							"px-1",
							"py-0.5",
						],
					},
					"spacing.sm": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"spacing.md": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"spacing.lg": {
						class: [
							"px-6",
							"py-3",
						],
					},
					// Padding tokens that reference spacing tokens
					"padding.small": {
						token: [
							"spacing.sm",
						],
					},
					"padding.medium": {
						token: [
							"spacing.md",
						],
					},
					"padding.large": {
						token: [
							"spacing.lg",
						],
					},
					// Button tokens that reference padding tokens
					"button.small": {
						class: [
							"rounded",
							"font-medium",
						],
						token: [
							"padding.small",
						],
					},
					"button.medium": {
						class: [
							"rounded",
							"font-medium",
						],
						token: [
							"padding.medium",
						],
					},
					"button.large": {
						class: [
							"rounded",
							"font-medium",
						],
						token: [
							"padding.large",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"button.large",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = Component.create();
		expect(slots.root()).toBe("px-6 py-3 rounded font-medium");
	});
});
