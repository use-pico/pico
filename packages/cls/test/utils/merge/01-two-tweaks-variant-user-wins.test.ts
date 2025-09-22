import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

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
		const out = merge<TestContract>([
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
