import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/config-empty-overlay-on-leaf-in-branching-chain", () => {
	it("t1 -> (t2, t3); config clears t2; result keeps t3 and t1", () => {
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

		const { slots } = $base.create(
			{},
			{
				token: {
					t2: {
						class: [],
					},
				},
			},
		);

		expect(slots.root()).toBe("a3 a1 base");
	});
});
