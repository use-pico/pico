import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.tokens([
		"t1",
	])
	.slots([
		"root",
	])
	.variants({
		v: [
			"a",
			"b",
		],
	})
	.def()
	.token({
		t1: {
			token: [],
		},
	})
	.defaults({
		v: "a",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/slot + override + token combo", () => {
	it("override wins for slot, tokens overlay last, variant earlier wins", () => {
		const out = merge<TestContract>([
			{
				variant: {
					v: "a",
				},
				slot: {
					root: {
						class: [
							"a",
						],
					},
				},
				token: {
					t1: {
						token: [
							"t1",
						],
					},
				},
			},
			{
				variant: {
					v: "b",
				},
				slot: {
					root: {
						class: [
							"b",
						],
					},
				},
				override: {
					root: {
						class: [
							"c",
						],
					},
				},
				token: {
					t1: {
						token: [
							"t1",
						],
					},
				},
			},
		]);

		expect(out.variant?.v).toBe("a");
		expect(out.slot?.root).toEqual({
			class: [
				"b",
				"a",
			],
		});
		expect(out.override?.root).toEqual({
			class: [
				"c",
			],
		});
		expect(out.token?.t1).toEqual({
			token: [
				"t1",
			],
		});
	});
});
