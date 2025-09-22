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
	})
	.defaults({
		size: "md",
		tone: "blue",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/variadic: mixed undefined across arrays", () => {
	it("ignores undefined tweaks/fields and collects defined ones", () => {
		const out = tweak<TestContract>(
			[
				undefined,
				{
					variant: {
						size: undefined,
					},
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
				{},
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
			],
			[
				undefined,
				{
					slot: {
						root: undefined,
					},
					token: {
						t1: undefined,
					},
					variant: {
						size: undefined,
					},
				},
			],
		);

		expect(out.variant?.size).toBeUndefined();
		expect(out.variant?.tone).toBe("red");
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
