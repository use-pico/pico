import { describe, expect, it } from "vitest";
import { contract, tweaks } from "../../../src";

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
				override: {
					root: {
						class: [
							"user",
						],
					},
				},
			},
			{
				override: {
					root: {
						class: [
							"internal",
						],
					},
				},
			},
		]);
		expect(out.override?.root).toEqual({
			class: [
				"user",
			],
		});
	});
});
