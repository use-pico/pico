import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/user-token-overlay-partial-only-affects-that-token", () => {
	it("overriding one token does not affect other tokens in order", () => {
		const buttonCls = cls(
			{
				tokens: [
					"color.primary",
					"color.secondary",
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
							"text-blue-500",
						],
					},
					"color.secondary": {
						class: [
							"text-gray-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.primary",
									"color.secondary",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = buttonCls.create({
			token: {
				"color.primary": {
					class: [
						"text-red-500",
					],
				},
			},
		});
		expect(slots.root()).toBe("text-red-500 text-gray-500");

		// local overlay for secondary only changes secondary
		expect(
			slots.root({
				token: {
					"color.secondary": {
						class: [
							"text-green-500",
						],
					},
				},
			}),
		).toBe("text-red-500 text-green-500");
	});
});
