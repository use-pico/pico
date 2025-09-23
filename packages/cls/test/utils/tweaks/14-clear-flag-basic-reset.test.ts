import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

const TestCls = contract()
	.slots([
		"root",
		"label",
	])
	.variants({
		size: [
			"sm",
			"md",
		],
	})
	.tokens([
		"color",
		"bg",
	])
	.def()
	.token({
		bg: {
			class: [
				"bg",
			],
		},
		color: {
			class: [
				"color",
			],
		},
	})
	.defaults({
		size: "md",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/tweaks/clear flag basic reset", () => {
	it("clear flag should reset all previous tweaks and start fresh", () => {
		const out = tweaks<TestContract>([
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"previous-root",
						],
					},
				},
				token: {
					color: {
						class: [
							"previous-color",
						],
					},
				},
			},
			{
				clear: true,
				variant: {
					size: "md",
				},
				slot: {
					label: {
						class: [
							"new-label",
						],
					},
				},
				token: {
					bg: {
						class: [
							"new-bg",
						],
					},
				},
			},
		]);

		// Should only contain values from the clear tweak
		expect(out.variant?.size).toBe("md");
		expect(out.slot?.root).toBeUndefined();
		expect(out.slot?.label).toEqual({
			class: [
				"new-label",
			],
		});
		expect(out.token?.color).toBeUndefined();
		expect(out.token?.bg).toEqual({
			class: [
				"new-bg",
			],
		});
	});
});
