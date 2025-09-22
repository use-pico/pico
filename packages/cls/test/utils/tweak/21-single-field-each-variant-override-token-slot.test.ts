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
		v: "b",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/single field per tweak (variant/override/token/slot)", () => {
	it("collects from each without cross-overwriting", () => {
		const out = tweak<TestContract>([
			{
				variant: {
					v: "a",
				},
			},
			{
				override: {
					root: {
						class: [
							"ovr",
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
			{
				slot: {
					root: {
						class: [
							"cls",
						],
					},
				},
			},
		]);

		expect(out.variant?.v).toBe("a");
		expect(out.override?.root).toEqual({
			class: [
				"ovr",
			],
		});
		expect(out.token?.t1).toEqual({
			token: [
				"t1",
			],
		});
		expect(out.slot?.root).toEqual({
			class: [
				"cls",
			],
		});
	});
});
