import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/three-level-variant-undefined-local-vs-create-defaults", () => {
	it("local undefined keeps create variant; create undefined keeps defaults", () => {
		const $base = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
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
									"b",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"md",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
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
					size: "sm",
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
					size: "sm",
				},
			},
		);

		const { slots } = $grand.create({
			variant: {
				size: "md",
			},
		});
		expect(slots.root()).toBe("b md");
		// local undefined -> keeps create("md")
		expect(
			slots.root({
				variant: {
					size: undefined,
				},
			}),
		).toBe("b md");
		// create undefined -> falls back to defaults("sm")
		const { slots: s2 } = $grand.create({
			variant: {
				size: undefined,
			},
		});
		expect(s2.root()).toBe("b");
	});
});
