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

describe("utils/merge/empty & undefined tweaks are ignored", () => {
	it("collects from later non-empty tweak only", () => {
		const out = merge<TestContract>([
			{},
			undefined,
			{
				variant: {
					size: "sm",
				},
			},
		]);

		expect(out.variant?.size).toBe("sm");
	});
});
