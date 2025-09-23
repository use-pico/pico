import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-adds-bool-variant-defaults-and-undefined", () => {
	it("child adds bool variant with default true; undefined keeps true; false flips", () => {
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
