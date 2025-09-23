import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/what-level-override-in-create-config-tweak", () => {
	it("What-level override in config tweak at create() replaces accumulated classes", () => {
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
				],
				defaults: {},
			},
		);

		// Test What-level override in config tweak at create()
		const { slots } = $cls.create(undefined, {
			slot: {
				root: {
					class: [
						"config-override",
					],
					override: true,
				},
			},
		});

		expect(slots.root()).toBe("config-override");
	});
});
