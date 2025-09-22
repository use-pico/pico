import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

const TestCls = contract()
	.tokens([
		"t1",
		"t2",
		"t3",
	])
	.def()
	.token({
		t1: {
			token: [],
		},
		t2: {
			token: [],
		},
		t3: {
			token: [],
		},
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/token combines what order", () => {
	it("combines token arrays for same token name respecting order", () => {
		const out = tweak<TestContract>([
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
				token: {
					t1: {
						token: [
							"t2",
							"t3",
						],
					},
				},
			},
		]);
		expect(out.token?.t1).toEqual({
			token: [
				"t1",
			],
		});
	});
});
