import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/multi-token-order-and-overlay", () => {
	it("applies tokens in declared order; user/local overlays override per token", () => {
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
								class: [
									"base",
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
				"color.secondary": {
					class: [
						"text-green-500",
					],
				},
			},
		});
		// token order primary then secondary, with user overlay on secondary
		expect(slots.root()).toBe("text-green-500 base");

		// local overlay for primary wins over user
		expect(
			slots.root({
				token: {
					"color.primary": {
						class: [
							"text-red-500",
						],
					},
				},
			}),
		).toBe("text-green-500 base");
	});
});
