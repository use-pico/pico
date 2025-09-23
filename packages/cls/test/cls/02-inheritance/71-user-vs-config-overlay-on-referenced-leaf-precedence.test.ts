import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/inheritance/user-vs-config-overlay-on-referenced-leaf-precedence", () => {
	it("user overlay on t2 should win over config overlay on t2", () => {
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
						t2: {
							class: [
								"conf2",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("user2 a1 base");
	});
});
