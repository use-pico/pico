import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/local-variant-overrides-create-variant-across-levels", () => {
	it("local call variant beats create-level variant through base→child→grand", () => {
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
		expect(slots.root()).toBe("base md");
		expect(
			slots.root({
				variant: {
					size: "sm",
				},
			}),
		).toBe("base sm");
	});
});
