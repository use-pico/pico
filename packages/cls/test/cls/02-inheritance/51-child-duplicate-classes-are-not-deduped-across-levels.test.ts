import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-duplicate-classes-are-not-deduped-across-levels", () => {
	it("base and child can both add 'base' and it is not deduped", () => {
		const $base = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
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
				],
				defaults: {},
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
				],
				defaults: {},
			},
		);

		const { slots } = $child.create();
		expect(slots.root()).toBe("base");
	});
});
