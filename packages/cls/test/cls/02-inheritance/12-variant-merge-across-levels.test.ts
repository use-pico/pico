import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/variant-merge-across-levels", () => {
	it("merges variant values provided by base and child", () => {
		const baseButtonCls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
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
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"sm",
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

		const childButtonCls = baseButtonCls.extend(
			{
				tokens: [],
				slot: [],
				variant: {
					size: [
						"md",
					],
				},
			},
			{
				token: {},
				rules: [
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

		const { slots } = childButtonCls.create();
		expect(slots.root()).toBe("base sm");
		expect(
			slots.root({
				variant: {
					size: "md",
				},
			}),
		).toBe("base md");
	});
});
