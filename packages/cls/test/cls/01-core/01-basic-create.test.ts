import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/basic-create", () => {
	it("returns empty classes for the single 'root' slot when there are no rules", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $cls.create();

		expect(slots.root()).toBe("");
	});
});
