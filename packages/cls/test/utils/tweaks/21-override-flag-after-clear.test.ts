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
	.defaults({
		size: "md",
	})
	.token({
		color: {
			class: [
				"color",
			],
		},
		bg: {
			class: [
				"bg",
			],
		},
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/tweaks/override flag after clear", () => {
	it("override flag should work normally after clear flag resets the baseline", () => {
		const out = tweaks<TestContract>([
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"original-root",
						],
					},
					label: {
						class: [
							"original-label",
						],
					},
				},
				token: {
					color: {
						class: [
							"original-color",
						],
					},
					bg: {
						class: [
							"original-bg",
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
					root: {
						class: [
							"clear-root",
						],
					},
				},
				token: {
					color: {
						class: [
							"clear-color",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					label: {
						class: [
							"override-label",
						],
					},
					root: {
						class: [
							"override-root",
						],
					},
				},
				token: {
					bg: {
						class: [
							"override-bg",
						],
					},
					color: {
						class: [
							"override-color",
						],
					},
				},
			},
		]);

		// Clear sets the baseline, then override replaces values
		expect(out.variant?.size).toBe("md"); // From clear tweak
		expect(out.slot?.root).toEqual({
			class: [
				"override-root",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"override-label",
			],
		});
		expect(out.token?.color).toEqual({
			class: [
				"override-color",
			],
		});
		expect(out.token?.bg).toEqual({
			class: [
				"override-bg",
			],
		});
	});
});
