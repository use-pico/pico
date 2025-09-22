import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.tokens([
		"t1",
		"t2",
	])
	.variants({
		tone: [
			"red",
			"blue",
		],
	})
	.def()
	.token({
		t1: {
			token: [],
		},
		t2: {
			token: [],
		},
	})
	.defaults({
		tone: "blue",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/variant + token combo", () => {
	it("earlier variant wins; token overlays last for same key", () => {
		const out = merge<TestContract>([
			{
				variant: {
					tone: "red",
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
					tone: "blue",
				},
				token: {
					t1: {
						token: [
							"t2",
						],
					},
				},
			},
		]);

		expect(out.variant?.tone).toBe("red");
		expect(out.token?.t1).toEqual({
			token: [
				"t2",
			],
		});
	});
});
