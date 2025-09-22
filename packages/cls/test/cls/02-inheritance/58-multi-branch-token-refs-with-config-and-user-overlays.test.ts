import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/multi-branch-token-refs-with-config-and-user-overlays", () => {
	it("t1→(t2,t3), config overlays t2, user overlays t3; order preserved", () => {
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
						t3: {
							class: [
								"user3",
							],
						},
					},
				},
				{
					token: {
						t2: {
							class: [
								"conf2",
							],
						},
					},
				},
			]),
		);

		// t1 expands to (t2, t3, a1). Config overlays t2, user overlays t3.
		expect(slots.root()).toBe("conf2 user3 a1 base");
	});
});
