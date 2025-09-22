import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/token-reference-per-slot-different-refs", () => {
	it("root uses t1 (-> t2), icon uses t3; all expand correctly", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
				],
				slot: [
					"root",
					"icon",
				],
				variant: {},
			},
			{
				token: {
					t2: {
						class: [
							"a2",
						],
					},
					t3: {
						class: [
							"a3",
						],
					},
					t1: {
						token: [
							"t2",
						],
						class: [
							"a1",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t1",
								],
								class: [
									"b-root",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								token: [
									"t3",
								],
								class: [
									"b-icon",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $base.create();
		expect(slots.root()).toBe("a2 a1 b-root");
		expect(slots.icon()).toBe("a3 b-icon");
	});
});
