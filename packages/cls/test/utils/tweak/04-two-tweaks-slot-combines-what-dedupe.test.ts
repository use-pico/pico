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

describe("utils/merge/slot dedupes same classes", () => {
	it("dedupes when both tweaks provide the same class", () => {
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
							"a",
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
