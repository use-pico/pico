import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/four-level-chain-order-and-overlays", () => {
	it("maintains base→child→grand→great order; config→user appends; local tokens win", () => {
		const $base = cls(
			{
				tokens: [
					"t",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					t: {
						class: [
							"tb",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t",
								],
								class: [
									"b",
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
				token: {
					t: {
						class: [
							"tc",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"c",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $grand = $child.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					t: {
						class: [
							"tg",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"g",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $great = $grand.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					t: {
						class: [
							"tt",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"t",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $great.create(
			tweak([
				{
					slot: {
						root: {
							class: [
								"u",
							],
						},
					},
				},
				{
					slot: {
						root: {
							class: [
								"conf",
							],
						},
					},
				},
			]),
		);

		// token resolves to latest (tt), then base class accumulation order, then config, then user
		expect(slots.root()).toBe("tt b c g t u");
		// local token overlay wins
		expect(
			slots.root({
				token: {
					t: {
						class: [
							"tl",
						],
					},
				},
			}),
		).toBe("tl b c g t u");
	});
});
