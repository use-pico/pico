import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

const TestCls = contract()
	.variants({
		size: [
			"sm",
			"md",
		],
	})
	.def()
	.defaults({
		size: "sm",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/undefined handling", () => {
	it("undefined variant keys are filtered and don't clear values", () => {
		const out = tweaks<TestContract>([
			{
				variant: {
					size: "sm",
				},
			},
			{
				variant: {
					size: undefined,
				},
			},
		]);
		expect(out.variant?.size).toBe("sm");
	});
});
