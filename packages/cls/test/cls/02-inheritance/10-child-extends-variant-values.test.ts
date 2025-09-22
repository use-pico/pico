import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/child-extends-variant-values", () => {
	it("child adds new variant option and all values are usable", () => {
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
					size: [
						"lg",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						match: {
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"lg",
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

		const { slots } = $child.create();
		// default sm
		expect(slots.root()).toBe("base");
		// parent value still valid
		expect(
			slots.root({
				variant: {
					size: "md",
				},
			}),
		).toBe("base md");
		// child-added value works
		expect(
			slots.root({
				variant: {
					size: "lg",
				},
			}),
		).toBe("base lg");
	});
});
