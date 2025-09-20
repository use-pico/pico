import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Inheritance", () => {
	it("should handle token inheritance from parent components", () => {
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-blue-100",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = ExtendedComponent.create();
		expect(slots.root()).toBe("bg-blue-100");
	});
});
