import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/circular-token-detection-three-levels", () => {
	it("detects circular token references spread across base→child→grand", () => {
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

		const $grand = $child.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $grand.create();
		expect(() => {
			slots.root();
		}).toThrowError(/Circular dependency detected/);
	});
});
