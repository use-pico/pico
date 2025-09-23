import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/inheritance/token-reference-with-user-and-local-overlays", () => {
	it("t1 references t2; user overlays t2; local overlays t1", () => {
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

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $child.create(
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
				{},
			]),
		);

		// user overlays t2, then local overlay on t1 wins over user overlay on t2
		expect(slots.root()).toBe("user2 a1 base");
		expect(
			slots.root({
				token: {
					t1: {
						class: [
							"local1",
						],
					},
				},
			}),
		).toBe("local1 base");
	});
});
