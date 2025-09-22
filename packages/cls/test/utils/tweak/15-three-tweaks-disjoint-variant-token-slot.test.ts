import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

const TestCls = contract()
	.tokens([
		"t1",
	])
	.slots([
		"root",
	])
	.variants({
		size: [
			"sm",
			"md",
		],
	})
	.def()
	.token({
		t1: {
			token: [],
		},
	})
	.defaults({
		size: "md",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/disjoint: variant + token + slot", () => {
	it("collects fields from separate tweaks without overlay", () => {
		const out = tweak<TestContract>([
			{
				variant: {
					size: "sm",
				},
			},
			{
				token: {
					t1: {
						token: [
							"t1",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"x",
						],
					},
				},
			},
		]);

		expect(out.variant?.size).toBe("sm");
		expect(out.token?.t1).toEqual({
			token: [
				"t1",
			],
		});
		expect(out.slot?.root).toEqual({
			class: [
				"x",
			],
		});
	});
});
