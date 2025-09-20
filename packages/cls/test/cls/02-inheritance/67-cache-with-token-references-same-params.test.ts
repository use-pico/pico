import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/cache-with-token-references-same-params", () => {
	it("same params with token references yield identical results", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
				],
				slot: [
					"root",
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
									"base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $base.create();
		const r1 = slots.root();
		const r2 = slots.root();
		const r3 = slots.root();
		expect(r1).toBe("a2 a1 base");
		expect(r2).toBe(r1);
		expect(r3).toBe(r1);
	});
});
