import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/nested-token-reference-two-levels-non-circular", () => {
	it("t1 → t2 → t3 resolves fully; child overlays intermediate t2", () => {
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
					t3: {
						class: [
							"a3",
						],
					},
					t2: {
						token: [
							"t3",
						],
						class: [
							"a2",
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

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
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

		const { slots } = $child.create();
		// t1 expands to (t2 -> (t3, a2), then a1). Child overlay on t2 replaces its expansion with c2.
		expect(slots.root()).toBe("c2 a1 base");
	});
});
