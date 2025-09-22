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

describe("utils/merge/two variants collected", () => {
	it("merges variant keys from separate tweaks", () => {
		const out = merge<TestContract>([
			{
				variant: {
					size: "sm",
				},
			},
			{
				variant: {
					tone: "red",
				},
			},
		]);

		expect(out.variant?.size).toBe("sm");
		expect(out.variant?.tone).toBe("red");
	});
});
