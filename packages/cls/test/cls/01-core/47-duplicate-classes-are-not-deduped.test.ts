import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/duplicate-classes-are-not-deduped", () => {
	it("keeps duplicate classes when produced by separate rules", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					level: [
						"a",
						"b",
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
									"x",
								],
							},
						},
					},
					{
						match: {
							level: "a",
						},
						slot: {
							root: {
								class: [
									"x",
								],
							},
						},
					},
				],
				defaults: {
					level: "a",
				},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("x x");
	});
});
