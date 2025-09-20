import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/variant-undefined-precedence-across-levels", () => {
	it("user undefined keeps config value; local undefined keeps create value", () => {
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
									"base",
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

		// user provides undefined, config provides md -> md wins
		const t1 = $child.create(
			{
				variant: {
					size: undefined,
				},
			},
			{
				variant: {
					size: "md",
				},
			},
		);
		expect(t1.slots.root()).toBe("base md");

		// create provides md, local call provides undefined -> md kept
		const t2 = $child.create({
			variant: {
				size: "md",
			},
		});
		expect(t2.slots.root()).toBe("base md");
		expect(
			t2.slots.root({
				variant: {
					size: undefined,
				},
			}),
		).toBe("base md");
	});
});
