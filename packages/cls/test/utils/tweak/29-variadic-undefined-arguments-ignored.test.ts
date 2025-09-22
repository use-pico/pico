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

describe("utils/merge/variadic: undefined arguments are ignored", () => {
	it("ignores undefined variadic args and merges defined arrays", () => {
		const out = tweak<TestContract>(
			undefined,
			[
				{
					variant: {
						size: "sm",
					},
				},
			],
			undefined,
			[
				{
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
			],
		);

		expect(out.variant?.size).toBe("sm");
		expect(out.slot?.root).toEqual({
			class: [
				"a",
			],
		});
		expect(out.token?.t1).toEqual({
			token: [
				"t1",
			],
		});
	});
});
