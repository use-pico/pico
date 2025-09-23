import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/bool-variant-defaults-through-inheritance-with-token-refs", () => {
	it("child default true keeps true; token refs still expand", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
				],
				slot: [
					"root",
				],
				variant: {
					on: [
						"bool",
					],
				},
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
					{
						match: {
							on: true,
						},
						slot: {
							root: {
								class: [
									"on",
								],
							},
						},
					},
					{
						match: {
							on: false,
						},
						slot: {
							root: {
								class: [
									"off",
								],
							},
						},
					},
				],
				defaults: {
					on: false,
				},
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
				defaults: {
					on: true,
				},
			},
		);

		const { slots } = $child.create();
		expect(slots.root()).toBe("a2 a1 base on");
		// undefined keeps true
		expect(
			slots.root({
				variant: {
					on: undefined,
				},
			}),
		).toBe("a2 a1 base on");
		// false flips
		expect(
			slots.root({
				variant: {
					on: false,
				},
			}),
		).toBe("a2 a1 base off");
	});
});
