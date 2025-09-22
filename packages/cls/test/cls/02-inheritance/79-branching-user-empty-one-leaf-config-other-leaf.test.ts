import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/branching-user-empty-one-leaf-config-other-leaf", () => {
	it("user clears t2; config overlays t3; chain t1 -> (t2, t3)", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
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
					t3: {
						class: [
							"a3",
						],
					},
					t1: {
						token: [
							"t2",
							"t3",
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

		const { slots } = $base.create(
			tweak([
				{
					token: {
						t2: {
							class: [],
						},
					},
				},
				{
					token: {
						t3: {
							class: [
								"conf3",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("conf3 a1 base");
	});
});
