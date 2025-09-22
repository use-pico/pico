import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/child-overrides-base-bool-defaults", () => {
	it("base default false; child sets true; undefined keeps true; false flips", () => {
		const $base = cls(
			{
				tokens: [],
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
		expect(slots.root()).toBe("base on");
		expect(
			slots.root({
				variant: {
					on: undefined,
				},
			}),
		).toBe("base on");
		expect(
			slots.root({
				variant: {
					on: false,
				},
			}),
		).toBe("base off");
	});
});
