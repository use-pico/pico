import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/grandchild-local-override-wins-over-user-override", () => {
	it("local slot override wins over user override across a 3-level chain", () => {
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
					override: {
						root: {
							class: [
								"USER",
							],
						},
					},
				},
				{},
			]),
		);

		// local override should replace everything
		expect(
			slots.root({
				override: {
					root: {
						class: [
							"LOCAL",
						],
					},
				},
			}),
		).toBe("LOCAL");
	});
});
