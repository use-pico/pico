import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-extends-multiple-variants-and-defaults", () => {
	it("child adds tone variant and sets defaults merging with base size", () => {
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
					size: "md",
					tone: "light",
				},
			},
		);

		const { slots } = $child.create();
		// defaults: size md, tone light
		expect(slots.root()).toBe("base md");
		// change tone to dark
		expect(
			slots.root({
				variant: {
					tone: "dark",
				},
			}),
		).toBe("base md dark");
	});
});
