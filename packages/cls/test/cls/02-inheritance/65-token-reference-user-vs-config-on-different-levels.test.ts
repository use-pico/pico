import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/token-reference-user-vs-config-on-different-levels", () => {
	it("user overlays leaf t2; config overlays root t1; root overlay wins for t1, leaf stays for t2", () => {
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

		const { slots } = $base.create(
			tweak([
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
			]),
		);

		// config overlay replaces t1 chain, but user overlay on t2 should not impact replaced chain
		expect(slots.root()).toBe("conf1 base");
	});
});
