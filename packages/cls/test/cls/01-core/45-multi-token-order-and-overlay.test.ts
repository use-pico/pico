import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/multi-token-order-and-overlay", () => {
	it("applies tokens in declared order; user/local overlays override per token", () => {
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

		const { slots } = $cls.create({
			token: {
				b: {
					class: [
						"B2",
					],
				},
			},
		});
		// token order a then b, with user overlay on b
		expect(slots.root()).toBe("A B2 base");

		// local overlay for a wins over user
		expect(
			slots.root({
				token: {
					a: {
						class: [
							"A3",
						],
					},
				},
			}),
		).toBe("A3 B2 base");
	});
});
