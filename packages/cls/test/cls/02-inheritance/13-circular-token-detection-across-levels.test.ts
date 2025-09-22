import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/circular-token-detection-across-levels", () => {
	it("detects circular token references spanning base and child", () => {
		const $base = cls(
			{
				tokens: [
					"a",
					"b",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					a: {
						token: [
							"b",
						],
					},
					b: {
						token: [],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"a",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					b: {
						token: [
							"a",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $child.create();
		expect(() => {
			slots.root();
		}).toThrowError(/Circular dependency detected/);
	});
});
