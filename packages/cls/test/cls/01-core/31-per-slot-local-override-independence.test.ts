import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/per-slot-local-override-independence", () => {
	it("local override on one slot does not affect other slots", () => {
		const buttonCls = cls(
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
									"root-base",
								],
							},
							icon: {
								class: [
									"icon-base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = buttonCls.create();
		expect(slots.root()).toBe("root-base");
		expect(slots.icon()).toBe("icon-base");

		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"ROOT-OVERRIDE",
						],
						override: true,
					},
				},
			}),
		).toBe("ROOT-OVERRIDE");

		// icon remains unaffected
		expect(slots.icon()).toBe("icon-base");
	});
});
