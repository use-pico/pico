import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.tokens([
		"t1",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t1: {
			token: [],
		},
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/slots: class beats later token on same slot", () => {
	it("keeps class from first tweak when second sets token for same slot", () => {
		const out = merge<TestContract>([
			{
				slot: {
					root: {
						class: [
							"base",
						],
					},
				},
			},
			{
				slot: {
					root: {
						token: [
							"t1",
						],
					},
				},
			},
		]);

		expect(out.slot?.root).toEqual({
			class: [
				"base",
			],
		});
	});
});
