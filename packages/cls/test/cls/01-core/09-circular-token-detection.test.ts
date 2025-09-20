import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/circular-token-detection", () => {
	it("throws when tokens reference each other circularly for the 'root' slot", () => {
		const $cls = cls(
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
						token: [
							"a",
						],
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

		const { slots } = $cls.create();
		expect(() => {
			slots.root();
		}).toThrowError(/Circular dependency detected/);
	});
});
