import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/per-slot-mixed-overlays-root-and-leaf", () => {
	it("root: config overlays root token; icon: user overlays leaf token", () => {
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
									"b-root",
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
									"b-icon",
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
						t1: {
							class: [
								"conf1",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("conf1 b-root");
		expect(slots.icon()).toBe("conf1 b-icon");
	});
});
