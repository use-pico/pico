import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/create-with-empty-user-and-config-results-in-base", () => {
	it("when both user and config provide empty slot arrays, only base remains", () => {
		const buttonCls = cls(
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

		const { slots } = buttonCls.create(
			{
				slot: {
					root: {
						class: [],
					},
				},
			},
			{
				slot: {
					root: {
						class: [],
					},
				},
			},
		);

		expect(slots.root()).toBe("base");
	});
});
