import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/grandchild-bool-variant-undefined-vs-config", () => {
	it("user undefined keeps config bool value across inheritance", () => {
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
					on: false,
				},
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
				rules: [],
				defaults: {
					on: false,
				},
			},
		);

		const { slots } = $grand.create(
			tweak([
				{
					variant: {
						on: undefined,
					},
				},
				{
					variant: {
						on: true,
					},
				},
			]),
		);
		expect(slots.root()).toBe("base on");
	});
});
