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

describe("utils/merge/override user wins", () => {
	it("user override should override internal override on same slot", () => {
		const out = tweak<TestContract>([
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
