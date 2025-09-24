import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/duplicate-classes-are-not-deduped", () => {
	it("keeps duplicate classes when produced by separate rules", () => {
		const buttonCls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					level: [
						"primary",
						"secondary",
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
									"base-style",
								],
							},
						},
					},
					{
						match: {
							level: "primary",
						},
						slot: {
							root: {
								class: [
									"text-primary",
								],
							},
						},
					},
				],
				defaults: {
					level: "primary",
				},
			},
		);

		const { slots } = buttonCls.create();
		expect(slots.root()).toBe("base-style text-primary");
	});
});
