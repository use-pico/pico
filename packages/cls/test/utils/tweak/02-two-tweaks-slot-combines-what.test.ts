import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

const TestCls = contract()
	.slots([
		"root",
		"label",
	])
	.def()
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/slot combines what", () => {
	it("combines class arrays for same slot respecting order", () => {
		const out = tweak<TestContract>([
			{
				slot: {
					root: {
						class: [
							"a",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"b",
						],
					},
				},
			},
		]);
		expect(out.slot?.root).toEqual({
			class: [
				"a",
			],
		});
	});
});
