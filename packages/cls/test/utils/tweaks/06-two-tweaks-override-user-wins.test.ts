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

describe("utils/merge/override user wins", () => {
	it("user override should override internal override on same slot", () => {
		const out = tweaks<TestContract>([
			{
				override: true,
				slot: {
					root: {
						class: [
							"internal",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"user",
						],
					},
				},
			},
		]);
		expect(out.slot?.root).toEqual({
			class: [
				"user",
			],
		});
	});
});
