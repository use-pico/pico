import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/empty-token-overlay-clears-default-token-class", () => {
	it("allows empty overlay to clear token-provided classes for that call", () => {
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
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("text-red-500");

		// Empty overlay: keeps token key but provides no classes -> clears
		expect(
			slots.root({
				token: {
					"color.text": {
						class: [],
					},
				},
			}),
		).toBe("");
	});
});
