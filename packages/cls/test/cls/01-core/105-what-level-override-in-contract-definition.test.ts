import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/what-level-override-in-contract-definition", () => {
	it("What-level override in contract definition replaces accumulated classes", () => {
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
						slot: {
							root: {
								class: [
									"append",
								],
							},
						},
					},
					{
						slot: {
							root: {
								class: [
									"definition-override",
								],
								override: true,
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();

		// Test What-level override in contract definition
		expect(slots.root()).toBe("definition-override");
	});
});
