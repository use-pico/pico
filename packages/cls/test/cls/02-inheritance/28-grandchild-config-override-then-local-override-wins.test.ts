import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-config-override-then-local-override-wins", () => {
	it("config override at create is replaced by local slot override", () => {
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
			{},
			{
				slot: {
					root: {
						class: [
							"CONF",
						],
						override: true,
					},
				},
			},
		);

		// local override replaces config override as the final step
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"LOCAL",
						],
						override: true,
					},
				},
			}),
		).toBe("LOCAL");
	});
});
