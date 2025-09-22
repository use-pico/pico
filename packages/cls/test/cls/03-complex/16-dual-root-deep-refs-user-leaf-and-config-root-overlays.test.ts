import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/dual-root-deep-refs-user-leaf-and-config-root-overlays", () => {
	it("t1->(t2,t3->(t4,t5)) and t7; user overlays t2; config overlays t7", () => {
		const $c = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
					"t4",
					"t5",
					"t7",
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
					t7: {
						class: [
							"a7",
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
									"t7",
								],
								class: [
									"b7",
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
						t7: {
							class: [
								"CONF7",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("USER2 a4 a5 a3 a1 b1 CONF7 b7");
	});
});
