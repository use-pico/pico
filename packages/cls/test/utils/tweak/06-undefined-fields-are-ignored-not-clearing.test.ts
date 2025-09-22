import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

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
		const out = tweak<TestContract>([
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
