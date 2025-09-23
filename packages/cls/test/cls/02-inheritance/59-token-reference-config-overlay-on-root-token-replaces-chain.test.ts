import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/inheritance/token-reference-config-overlay-on-root-token-replaces-chain", () => {
	it("config overlay on t1 replaces whole t1 chain expansion", () => {
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
			tweaks([
				{},
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

		expect(slots.root()).toBe("conf1 base");
	});
});
