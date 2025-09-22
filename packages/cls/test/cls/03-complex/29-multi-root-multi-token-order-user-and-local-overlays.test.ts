import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/multi-root-multi-token-order-user-and-local-overlays", () => {
	it("two roots t1,t6 then t7; user overlays t2; local overlays t4 on icon", () => {
		const $cls = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
					"t4",
					"t6",
					"t7",
				],
				slot: [
					"root",
					"icon",
				],
				variant: {},
			},
			{
				token: {
					t4: {
						class: [
							"a4",
						],
					},
					t3: {
						token: [
							"t4",
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
									"t6",
								],
								class: [
									"b6",
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
					{
						slot: {
							icon: {
								token: [
									"t1",
								],
								class: [
									"i1",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create({
			token: {
				t2: {
					class: [
						"USER2",
					],
				},
			},
		});

		expect(slots.root()).toBe("USER2 a4 a3 a1 b1 a6 b6 a7 b7");
		expect(
			slots.icon({
				token: {
					t4: {
						class: [
							"LOCAL4",
						],
					},
				},
			}),
		).toBe("USER2 LOCAL4 a3 a1 i1");
	});
});
