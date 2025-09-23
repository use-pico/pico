import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/token-reference-chain-base-to-child", () => {
	it("t1 → t2 chain resolves with child t2 override", () => {
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
					t2: {
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
		// t1 expands (t2 then a1), with child t2 override
		expect(slots.root()).toBe("c2 a1 base");
	});
});
