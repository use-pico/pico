import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/user-token-overlay-partial-only-affects-that-token", () => {
	it("overriding one token does not affect other tokens in order", () => {
		const $cls = cls(
			{
				tokens: [
					"a",
					"b",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					a: {
						class: [
							"A",
						],
					},
					b: {
						class: [
							"B",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"a",
									"b",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create({
			token: {
				a: {
					class: [
						"A2",
					],
				},
			},
		});
		expect(slots.root()).toBe("A2 B");

		// local overlay for b only changes b
		expect(
			slots.root({
				token: {
					b: {
						class: [
							"B3",
						],
					},
				},
			}),
		).toBe("A2 B3");
	});
});
