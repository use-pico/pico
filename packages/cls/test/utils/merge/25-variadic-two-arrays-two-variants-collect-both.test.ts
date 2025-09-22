import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.variants({
		size: [
			"sm",
			"md",
		],
		tone: [
			"red",
			"blue",
		],
	})
	.def()
	.defaults({
		size: "md",
		tone: "blue",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/variadic: two arrays collect both variants", () => {
	it("collects size from first array and tone from second array", () => {
		const out = merge<TestContract>(
			[
				{
					variant: {
						size: "sm",
					},
				},
			],
			[
				{
					variant: {
						tone: "red",
					},
				},
			],
		);

		expect(out.variant?.size).toBe("sm");
		expect(out.variant?.tone).toBe("red");
	});
});
