import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/create-config-override-then-local-override-wins-root", () => {
	it("config sets root override; local call overrides again and wins", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
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
									"r",
								],
							},
							icon: {
								class: [
									"i",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create(
			{},
			{
				override: true,
				slot: {
					root: {
						class: [
							"CONF",
						],
					},
				},
			},
		);
		expect(slots.root()).toBe("r CONF");
		expect(slots.icon()).toBe("i");

		const local = $cls.create();
		expect(
			local.slots.root({
				override: true,
				slot: {
					root: {
						class: [
							"LOCAL",
						],
					},
				},
			}),
		).toBe("r LOCAL");
	});
});
