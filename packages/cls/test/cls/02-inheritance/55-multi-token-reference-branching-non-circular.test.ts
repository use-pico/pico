import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/multi-token-reference-branching-non-circular", () => {
	it("t1 references t2 and t3; both resolve with child overlay on t3", () => {
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

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					t3: {
						class: [
							"c3",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $child.create();
		// t1 expands to (t2, t3, a1). Child overlays t3 only.
		expect(slots.root()).toBe("a2 c3 a1 base");
	});
});
