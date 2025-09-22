import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/multi-root-token-refs-with-dual-overlays-order", () => {
	it("two root refs t1,t6; user overlays t2 leaf; config overlays t6 root; order correct", () => {
		const $c = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
					"t4",
					"t5",
					"t6",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					t5: {
						class: [
							"a5",
						],
					},
					t4: {
						class: [
							"a4",
						],
					},
					t3: {
						token: [
							"t4",
							"t5",
						],
						class: [
							"a3",
						],
					},
					t2: {
						class: [
							"a2",
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
					t6: {
						class: [
							"a6",
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
									"b1",
								],
							},
						},
					},
					{
						slot: {
							root: {
								token: [
									"t6",
								],
								class: [
									"b6",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $c.create(
			tweak([
				{
					token: {
						t2: {
							class: [
								"USER2",
							],
						},
					},
				},
				{
					token: {
						t6: {
							class: [
								"CONF6",
							],
						},
					},
				},
			]),
		);

		// Actual order: within t3, referenced tokens expand first (t4,t5) before its own class
		expect(slots.root()).toBe("USER2 a4 a5 a3 a1 b1 CONF6 b6");
	});
});
