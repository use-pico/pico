import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-adds-token-and-overrides-t1-to-reference-it", () => {
	it("child adds t3 and overrides t1 to reference t3", () => {
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

		const $child = $base.extend(
			{
				tokens: [
					"t3",
				],
				slot: [],
				variant: {},
			},
			{
				token: {
					t3: {
						class: [
							"c3",
						],
					},
					t1: {
						token: [
							"t3",
						],
						class: [
							"a1",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $child.create();
		expect(slots.root()).toBe("c3 a1 base");
	});
});
