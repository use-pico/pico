import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.slots([
		"root",
	])
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

describe("utils/merge/variant + slot combo", () => {
	it("earlier variant wins; slots combine in internal→user order", () => {
		const out = merge<TestContract>([
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"a",
						],
					},
				},
			},
			{
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"b",
						],
					},
				},
			},
		]);

		expect(out.variant?.size).toBe("sm");
		expect(out.slot?.root).toEqual({
			class: [
				"b",
				"a",
			],
		});
	});
});
