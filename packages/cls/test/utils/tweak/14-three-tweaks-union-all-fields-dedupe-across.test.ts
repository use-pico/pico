import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

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

describe("utils/merge/union & dedupe across fields", () => {
	it("unions tokens and slots with dedupe; first variants/overrides win", () => {
		const out = tweak<TestContract>([
			{
				variant: {
					size: "sm",
					tone: "red",
				},
				slot: {
					root: {
						class: [
							"a",
							"b",
						],
					},
				},
				token: {
					t1: {
						token: [
							"t1",
							"t2",
						],
					},
				},
				override: {
					label: {
						class: [
							"x",
						],
					},
				},
			},
			{
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"b",
							"c",
						],
					},
				},
				token: {
					t1: {
						token: [
							"t2",
						],
					},
					t2: {
						token: [
							"t2",
						],
					},
				},
				override: {
					label: {
						class: [
							"y",
						],
					},
				},
			},
			{
				slot: {
					label: {
						class: [
							"l",
						],
					},
				},
				token: {
					t2: {
						token: [
							"t1",
						],
					},
				},
			},
		]);

		expect(out.variant?.size).toBe("sm");
		expect(out.variant?.tone).toBe("red");
		expect(out.override?.label).toEqual({
			class: [
				"x",
			],
		});
		expect(out.slot?.root).toEqual({
			class: [
				"a",
				"b",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"l",
			],
		});
		expect(out.token?.t1).toEqual({
			token: [
				"t1",
				"t2",
			],
		});
		expect(out.token?.t2).toEqual({
			token: [
				"t2",
			],
		});
	});
});
