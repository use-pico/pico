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

describe("utils/tweaks/clear flag undefined values empty object", () => {
	it("clear flag with undefined values should result in empty object", () => {
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
			},
		]);

		// Should be completely empty after clear with undefined values
		expect(out.variant).toEqual({});
		expect(out.slot).toEqual({});
		expect(out.token).toEqual({});
	});
});
