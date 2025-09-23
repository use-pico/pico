import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

const TestCls = contract()
	.variants({
		tone: [
			"red",
			"blue",
			"green",
		],
	})
	.def()
	.defaults({
		tone: "red",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/three tweaks ordering", () => {
	it("earlier wins across three tweaks", () => {
		const out = tweaks<TestContract>([
			{
				variant: {
					tone: "green",
				},
			},
			{
				variant: {
					tone: "blue",
				},
			},
			{
				variant: {
					tone: "red",
				},
			},
		]);
		expect(out.variant?.tone).toBe("red");
	});
});
