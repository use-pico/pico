import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/config-root-overlay-wins-over-user-leaf-per-slot", () => {
	it("per-slot: user overlays leaf t2; config overlays root t1; root overlay wins", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
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
			{
				token: {
					t2: {
						class: [
							"user2",
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
		);

		expect(slots.root()).toBe("conf1 b-root");
		expect(slots.icon()).toBe("conf1 b-icon");
	});
});
