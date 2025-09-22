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

describe("utils/merge/undefined variant fields are filtered", () => {
	it("ignores undefined keys and keeps defined ones from other tweaks", () => {
		const out = merge<TestContract>([
			{
				variant: {
					size: undefined,
					tone: undefined,
				},
			},
			{
				variant: {
					size: "sm",
					tone: "red",
				},
			},
		]);

		expect(out.variant?.size).toBe("sm");
		expect(out.variant?.tone).toBe("red");
	});
});
