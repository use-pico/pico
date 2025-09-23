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

describe("utils/tweaks/clear flag with override ignored", () => {
	it("clear flag should ignore override flag and reset everything", () => {
		const out = tweaks<TestContract>([
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"first-root",
						],
					},
					label: {
						class: [
							"first-label",
						],
					},
				},
				token: {
					color: {
						class: [
							"first-color",
						],
					},
					bg: {
						class: [
							"first-bg",
						],
					},
				},
			},
			{
				override: true, // This should be ignored when clear is true
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
		]);

		// Clear should completely reset, ignoring override flag
		expect(out.variant?.size).toBe("md");
		expect(out.slot?.root).toEqual({
			class: [
				"clear-root",
			],
		});
		expect(out.slot?.label).toBeUndefined(); // Not set in clear tweak
		expect(out.token?.color).toEqual({
			class: [
				"clear-color",
			],
		});
		expect(out.token?.bg).toBeUndefined(); // Not set in clear tweak
	});
});
