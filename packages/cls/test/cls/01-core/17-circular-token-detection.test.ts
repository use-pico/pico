import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/circular-token-detection", () => {
	it("throws error when tokens reference each other circularly", () => {
		const buttonCls = cls(
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
						token: [
							"color.primary",
						],
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

		const { slots } = buttonCls.create();
		expect(() => {
			slots.root();
		}).toThrowError(/Circular dependency detected/);
	});
});
