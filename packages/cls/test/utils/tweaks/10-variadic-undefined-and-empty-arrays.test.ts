import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

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
		const out = tweaks<TestContract>([
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

		expect(out.variant?.size).toBe("md");
		expect(out.slot?.root).toEqual({
			class: [
				[
					"a",
				],
				[
					"b",
				],
			],
		});
	});
});
