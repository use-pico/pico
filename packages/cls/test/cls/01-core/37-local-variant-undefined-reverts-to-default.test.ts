import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-variant-undefined-keeps-create-variant", () => {
	it("local variant undefined does not change create-level variant", () => {
		const $cls = cls(
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

		const { slots } = $cls.create({
			variant: {
				size: "md",
			},
		});

		// create-level md applies
		expect(slots.root()).toBe("base md");

		// local undefined -> keeps create-level md
		expect(
			slots.root({
				variant: {
					size: undefined,
				},
			}),
		).toBe("base md");
	});
});
