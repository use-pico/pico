import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

const TestCls = contract()
	.tokens([
		"t1",
		"t2",
	])
	.def()
	.token({
		t1: {
			class: [
				"t1",
			],
		},
		t2: {
			class: [
				"t2",
			],
		},
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/token user wins", () => {
	it("user token overlay should override internal token overlay", () => {
		const out = tweaks<TestContract>([
			{
				token: {
					t1: {
						class: [
							"t2",
						],
					},
				},
			},
			{
				token: {
					t1: {
						class: [
							"t3",
						],
					},
				},
			},
		]);
		expect(out.token?.t1).toEqual({
			class: [
				[
					"t2",
				],
				[
					"t3",
				],
			],
		});
	});
});
