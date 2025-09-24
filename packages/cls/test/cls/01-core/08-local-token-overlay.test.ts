import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-token-overlay", () => {
	it("applies local token overlay to override default token classes", () => {
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
		expect(
			slots.root({
				token: {
					"color.text": {
						class: [
							"text-blue-500",
						],
					},
				},
			}),
		).toBe("text-blue-500");
	});
});
