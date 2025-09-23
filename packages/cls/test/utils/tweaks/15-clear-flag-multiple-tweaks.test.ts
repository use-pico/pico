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
			"lg",
		],
	})
	.tokens([
		"color",
		"bg",
		"border",
	])
	.def()
	.token({
		bg: {
			class: [
				"bg",
			],
		},
		border: {
			class: [
				"border",
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

describe("utils/tweaks/clear flag multiple tweaks", () => {
	it("clear flag should reset to the tweak that has clear: true, ignoring subsequent tweaks", () => {
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
				},
				token: {
					color: {
						class: [
							"first-color",
						],
					},
				},
			},
			{
				variant: {
					size: "md",
				},
				slot: {
					label: {
						class: [
							"second-label",
						],
					},
				},
				token: {
					bg: {
						class: [
							"second-bg",
						],
					},
				},
			},
			{
				clear: true,
				variant: {
					size: "lg",
				},
				slot: {
					root: {
						class: [
							"clear-root",
						],
					},
				},
				token: {
					border: {
						class: [
							"clear-border",
						],
					},
				},
			},
			{
				variant: {
					size: "sm",
				},
				slot: {
					label: {
						class: [
							"after-clear-label",
						],
					},
				},
				token: {
					color: {
						class: [
							"after-clear-color",
						],
					},
				},
			},
		]);

		// Should only contain values from the clear tweak and subsequent tweaks
		// The clear resets everything before it, but subsequent tweaks are applied normally
		expect(out.variant?.size).toBe("sm"); // Last tweak wins for variants
		expect(out.slot?.root).toEqual({
			class: [
				"clear-root",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"after-clear-label",
			],
		});
		expect(out.token?.color).toEqual({
			class: [
				"after-clear-color",
			],
		});
		expect(out.token?.bg).toBeUndefined(); // Not set in clear or after
		expect(out.token?.border).toEqual({
			class: [
				"clear-border",
			],
		});
	});
});
