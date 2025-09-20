import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-local-empty-token-overlay-clears-only-that-token", () => {
	it("local empty overlay clears one token, leaves other and base intact", () => {
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

		const $grand = $child.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $grand.create();
		expect(slots.root()).toBe("c1 c2 b");
		expect(
			slots.root({
				token: {
					t2: {
						class: [],
					},
				},
			}),
		).toBe("c1 b");
	});
});
