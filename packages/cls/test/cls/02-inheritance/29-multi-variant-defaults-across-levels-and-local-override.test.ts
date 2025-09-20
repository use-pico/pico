import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/multi-variant-defaults-across-levels-and-local-override", () => {
	it("defaults merge across levels; local variant overrides create-level variants", () => {
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
				variant: {
					tone: [
						"light",
						"dark",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						match: {
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"dark",
								],
							},
						},
					},
				],
				defaults: {
					tone: "light",
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
					size: "md",
					tone: "light",
				},
			},
		);

		// create-level sets tone: dark, but leave size to defaults (grand sets md)
		const { slots } = $grand.create({
			variant: {
				tone: "dark",
			},
		});
		expect(slots.root()).toBe("base md dark");
		// local call flips tone to light and size to sm
		expect(
			slots.root({
				variant: {
					tone: "light",
					size: "sm",
				},
			}),
		).toBe("base");
	});
});
