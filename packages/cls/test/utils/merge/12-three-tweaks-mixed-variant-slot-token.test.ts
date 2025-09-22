import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.tokens([
		"t1",
		"t2",
		"t3",
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
		t3: {
			token: [],
		},
	})
	.defaults({
		size: "md",
		tone: "blue",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/three tweaks mixed fields", () => {
	it("variant earlier wins; slots and tokens merge across all participants", () => {
		const out = merge<TestContract>([
			{
				variant: {
					size: "sm",
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
							"t2",
						],
					},
				},
			},
			{
				variant: {
					tone: "red",
				},
				slot: {
					root: {
						class: [
							"b",
						],
					},
				},
				token: {
					t1: {
						token: [
							"t3",
						],
					},
					t2: {
						token: [
							"t2",
						],
					},
				},
			},
			{
				variant: {
					size: "md",
				},
				slot: {
					label: {
						class: [
							"c",
						],
					},
				},
				token: {
					t3: {
						token: [
							"t3",
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
				"c",
			],
		});
		expect(out.token?.t1).toEqual({
			token: [
				"t2",
			],
		});
		expect(out.token?.t2).toEqual({
			token: [
				"t2",
			],
		});
		expect(out.token?.t3).toEqual({
			token: [
				"t3",
			],
		});
	});
});
