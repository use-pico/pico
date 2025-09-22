import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

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

describe("utils/merge/token combines order and dedupes", () => {
	it("dedupes duplicate tokens in later tweak while preserving order", () => {
		const out = merge<TestContract>([
			{
				token: {
					t1: {
						token: [
							"t1",
							"t2",
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
				"t2",
				"t3",
				"t1",
			],
		});
	});
});
