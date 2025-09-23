import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/multi-slot-dual-refs-config-root-overlay-user-leaf", () => {
	it("root t1,t6; icon t6,t1; config overlays t1; user overlays t2", () => {
		const $cls = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
					"t4",
					"t6",
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
							icon: {
								token: [
									"t6",
								],
								class: [
									"i6",
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

		const { slots } = $cls.create(
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
					t1: {
						class: [
							"CONF1",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("CONF1 b1 a6 b6");
		expect(slots.icon()).toBe("a6 i6 CONF1 i1");
	});
});
