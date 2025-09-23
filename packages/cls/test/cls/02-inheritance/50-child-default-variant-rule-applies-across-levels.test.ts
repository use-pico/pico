import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-default-variant-rule-applies-across-levels", () => {
	it("child default md triggers base md rule without explicit variant", () => {
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
									"b",
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
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {
					size: "md",
				},
			},
		);

		const { slots } = $child.create();
		expect(slots.root()).toBe("b md");
	});
});
