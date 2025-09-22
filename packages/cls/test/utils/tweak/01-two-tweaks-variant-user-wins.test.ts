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
		size: "md",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/variant user wins", () => {
	it("user variant should override internal variant", () => {
		const out = tweak<TestContract>([
			{
				variant: {
					size: "sm",
				},
			},
			{
				variant: {
					size: "md",
				},
			},
		]);
		expect(out.variant?.size).toBe("sm");
	});
});
