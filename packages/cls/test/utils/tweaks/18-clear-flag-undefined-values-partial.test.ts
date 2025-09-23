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

describe("utils/tweaks/clear flag undefined values partial", () => {
	it("clear flag with partial undefined values should only keep defined values", () => {
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
					label: {
						class: [
							"previous-label",
						],
					},
				},
				token: {
					color: {
						class: [
							"previous-color",
						],
					},
					bg: {
						class: [
							"previous-bg",
						],
					},
				},
			},
			{
				clear: true,
				variant: {
					size: "md",
				},
				slot: undefined,
				token: {
					color: {
						class: [
							"new-color",
						],
					},
				},
			},
		]);

		// Should only keep defined values from clear tweak
		expect(out.variant?.size).toBe("md");
		expect(out.slot).toEqual({}); // undefined in clear tweak becomes empty object
		expect(out.token?.color).toEqual({
			class: [
				"new-color",
			],
		});
		expect(out.token?.bg).toBeUndefined(); // not set in clear tweak
	});
});
