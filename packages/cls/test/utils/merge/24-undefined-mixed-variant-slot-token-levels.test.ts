import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.tokens([
		"t1",
		"t2",
	])
	.slots([
		"root",
		"label",
	])
	.variants({
		size: [
			"sm",
			"md",
		],
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
		size: "md",
		tone: "blue",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/undefined mixed across variant/slot/token", () => {
	it("ignores undefined and merges remaining values across tweaks", () => {
		const out = merge<TestContract>([
			{
				variant: {
					size: "sm",
					tone: undefined,
				},
				slot: {
					root: {
						class: [
							"a",
						],
					},
					label: undefined,
				},
				token: {
					t1: {
						token: [
							"t1",
						],
					},
					t2: undefined,
				},
			},
			{
				variant: {
					size: undefined,
					tone: "red",
				},
				slot: {
					root: undefined,
					label: {
						class: [
							"b",
						],
					},
				},
				token: {
					t1: undefined,
					t2: {
						token: [
							"t2",
						],
					},
				},
			},
		]);

		expect(out.variant?.size).toBe("sm");
		expect(out.variant?.tone).toBe("red");
		expect(out.slot?.root).toEqual({
			class: [
				"a",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"b",
			],
		});
		expect(out.token?.t1).toEqual({
			token: [
				"t1",
			],
		});
		expect(out.token?.t2).toEqual({
			token: [
				"t2",
			],
		});
	});
});
