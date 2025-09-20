import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/token-reference-local-overlay-on-leaf-token-only-affects-leaf", () => {
	it("local overlay on t2 affects only t2; keeps t1 class and order", () => {
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
		expect(slots.root()).toBe("a2 a1 base");
		expect(
			slots.root({
				token: {
					t2: {
						class: [
							"local2",
						],
					},
				},
			}),
		).toBe("local2 a1 base");
	});
});
