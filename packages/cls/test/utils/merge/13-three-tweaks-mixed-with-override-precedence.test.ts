import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.slots([
		"root",
		"label",
	])
	.variants({
		v: [
			"a",
			"b",
		],
	})
	.def()
	.defaults({
		v: "b",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/mixed with override precedence", () => {
	it("override first wins; slots merge; variant earlier wins", () => {
		const out = merge<TestContract>([
			{
				variant: {
					v: "a",
				},
				slot: {
					root: {
						class: [
							"one",
						],
					},
				},
				override: {
					root: {
						class: [
							"OVR1",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"two",
						],
					},
					label: {
						class: [
							"lab2",
						],
					},
				},
				override: {
					root: {
						class: [
							"OVR2",
						],
					},
				},
			},
			{
				variant: {
					v: "b",
				},
				slot: {
					label: {
						class: [
							"lab3",
						],
					},
				},
			},
		]);

		expect(out.variant?.v).toBe("a");
		expect(out.slot?.root).toEqual({
			class: [
				"one",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"lab2",
			],
		});
		expect(out.override?.root).toEqual({
			class: [
				"OVR1",
			],
		});
	});
});
