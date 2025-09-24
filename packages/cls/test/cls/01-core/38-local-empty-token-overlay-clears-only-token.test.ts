import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-empty-token-overlay-clears-only-token", () => {
	it("local empty token overlay clears token class but keeps base", () => {
		const buttonCls = cls(
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
									"base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = buttonCls.create();
		expect(slots.root()).toBe("text-red-500 base");

		// local token overlay clears token class only
		expect(
			slots.root({
				token: {
					"color.text": {
						class: [],
					},
				},
			}),
		).toBe("base");
	});
});
