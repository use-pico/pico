import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-token-partial-overlay-only-affects-that-token", () => {
	it("overlaying one token leaves the other token intact across levels", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					t1: {
						class: [
							"a1",
						],
					},
					t2: {
						class: [
							"a2",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t1",
									"t2",
								],
								class: [
									"b",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					t1: {
						class: [
							"c1",
						],
					},
					t2: {
						class: [
							"c2",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $child.create({
			token: {
				t1: {
					class: [
						"u1",
					],
				},
			},
		});
		expect(slots.root()).toBe("u1 c2 b");
	});
});
