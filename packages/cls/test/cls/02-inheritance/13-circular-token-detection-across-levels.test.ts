import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/circular-token-detection-across-levels", () => {
	it("detects circular token references spanning base and child", () => {
		const baseButtonCls = cls(
			{
				tokens: [
					"color.primary",
					"color.secondary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.primary": {
						token: [
							"color.secondary",
						],
					},
					"color.secondary": {
						token: [],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.primary",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const childButtonCls = baseButtonCls.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.secondary": {
						token: [
							"color.primary",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = childButtonCls.create();
		expect(() => {
			slots.root();
		}).toThrowError(/Circular dependency detected/);
	});
});
