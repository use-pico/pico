import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/slot-append-order-across-levels", () => {
	it("keeps base → child → grandchild → config → user order", () => {
		const $base = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
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
				rules: [
					{
						slot: {
							root: {
								class: [
									"child",
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
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"grand",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $grand.create(
			tweak([
				{
					slot: {
						root: {
							class: [
								"user",
							],
						},
					},
				},
				{
					slot: {
						root: {
							class: [
								"config",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("base child grand config user");
	});
});
