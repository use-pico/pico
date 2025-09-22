import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

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
			tweak([
				{},
				{
					override: {
						root: {
							class: [
								"CONF",
							],
						},
					},
				},
			]),
		);

		// local override replaces config override as the final step
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
