import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/token-reference-leaf-empty-overlay-clears-only-leaf", () => {
	it("empty overlay on t2 clears t2 while keeping t3 and t1 classes", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					t2: {
						class: [
							"a2",
						],
					},
					t3: {
						class: [
							"a3",
						],
					},
					t1: {
						token: [
							"t2",
							"t3",
						],
						class: [
							"a1",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t1",
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

		const { slots } = $base.create();
		expect(slots.root()).toBe("a2 a3 a1 base");
		expect(
			slots.root({
				token: {
					t2: {
						class: [],
					},
				},
			}),
		).toBe("a3 a1 base");
	});
});
