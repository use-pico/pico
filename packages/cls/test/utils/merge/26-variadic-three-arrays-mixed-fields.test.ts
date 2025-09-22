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

describe("utils/merge/variadic: three arrays with mixed fields", () => {
	it("collects across multiple arrays in order", () => {
		const out = merge<TestContract>(
			[
				{
					variant: {
						size: "sm",
					},
				},
			],
			[
				{
					slot: {
						root: {
							class: [
								"a",
							],
						},
					},
				},
			],
			[
				{
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
