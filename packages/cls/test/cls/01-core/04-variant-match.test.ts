import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/variant-match", () => {
	it("applies rule for the 'root' slot when variant matches", () => {
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

		const { slots } = $cls.create();
		expect(slots.root()).toBe("base");
		expect(
			slots.root({
				variant: {
					size: "md",
				},
			}),
		).toBe("base md");
	});
});
