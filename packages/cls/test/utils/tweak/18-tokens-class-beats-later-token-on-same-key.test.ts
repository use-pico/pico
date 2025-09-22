import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

const TestCls = contract()
	.tokens([
		"t1",
	])
	.def()
	.token({
		t1: {
			token: [],
		},
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/tokens: class beats later token on same key", () => {
	it("keeps class from first tweak when second sets token for same key", () => {
		const out = tweak<TestContract>([
			{
				token: {
					t1: {
						class: [
							"base",
						],
					},
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
		]);

		expect(out.token?.t1).toEqual({
			class: [
				"base",
			],
		});
	});
});
