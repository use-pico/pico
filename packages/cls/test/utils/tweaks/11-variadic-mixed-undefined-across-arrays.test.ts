import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

const TestCls = contract()
	.slots([
		"root",
		"label",
	])
	.def()
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/slot missing on one side", () => {
	it("keeps the present side when other side is missing", () => {
		const out = tweaks<TestContract>([
			{
				slot: {
					root: {
						class: [
							"u",
						],
					},
				},
			},
			{},
		]);
		expect(out.slot?.root).toEqual({
			class: [
				"u",
			],
		});
	});
});
