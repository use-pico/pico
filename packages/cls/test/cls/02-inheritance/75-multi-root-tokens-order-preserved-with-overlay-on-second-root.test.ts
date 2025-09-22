import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/multi-root-tokens-order-preserved-with-overlay-on-second-root", () => {
	it("two root tokens t1, t4; overlay on t4 preserves order", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
					"t4",
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
						],
						class: [
							"a1",
						],
					},
					t4: {
						token: [
							"t3",
						],
						class: [
							"a4",
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
									"b1",
								],
							},
						},
					},
					{
						slot: {
							root: {
								token: [
									"t4",
								],
								class: [
									"b4",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $base.create({
			token: {
				t4: {
					class: [
						"user4",
					],
				},
			},
		});

		expect(slots.root()).toBe("a2 a1 b1 user4 b4");
	});
});
