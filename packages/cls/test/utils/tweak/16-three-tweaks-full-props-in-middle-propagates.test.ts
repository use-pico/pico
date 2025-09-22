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

describe("utils/merge/full props in middle propagates", () => {
	it("later full-tweak contributes tokens/slots; earlier variant stays", () => {
		const out = tweak<TestContract>([
			{
				variant: {
					size: "sm",
				},
			},
			{
				variant: {
					size: "md",
				},
				token: {
					t1: {
						token: [
							"t1",
						],
					},
				},
				slot: {
					root: {
						class: [
							"x2",
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
				slot: {
					root: {
						class: [
							"x3",
						],
					},
				},
			},
		]);

		expect(out.variant?.size).toBe("sm");
		expect(out.token?.t1).toEqual({
			token: [
				"t1",
			],
		});
		expect(out.slot?.root).toEqual({
			class: [
				"x2",
			],
		});
	});
});
