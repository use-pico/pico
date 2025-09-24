import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-variant-overrides-create-variants", () => {
	it("local slot variant overrides user/config variants for that call", () => {
		const buttonCls = cls(
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

		const { slots } = buttonCls.create(
			{
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"user",
						],
					},
				},
			},
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"config",
						],
					},
				},
			},
		);

		// With create-level variants md (user) and sm (config), user wins -> md
		expect(slots.root()).toBe("base sm user config");

		// Local call sets size to sm -> sm should replace md for this call
		expect(
			slots.root({
				variant: {
					size: "sm",
				},
			}),
		).toBe("base sm user config");
	});
});
