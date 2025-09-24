import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/rule-override-multiple-slots-clears-both", () => {
	it("override rule clears both slots and replaces with its classes", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
				],
				variant: {
					danger: [
						"off",
						"on",
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
					{
						match: {
							danger: "on",
						},
						slot: {
							root: {
								class: [
									"ROOT-OVERRIDE",
								],
								override: true,
							},
							icon: {
								class: [
									"ICON-OVERRIDE",
								],
								override: true,
							},
						},
					},
				],
				defaults: {
					danger: "off",
				},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("root-base");
		expect(slots.icon()).toBe("icon-base");

		const local = $cls.create({
			variant: {
				danger: "on",
			},
		});
		expect(local.slots.root()).toBe("ROOT-OVERRIDE");
		expect(local.slots.icon()).toBe("ICON-OVERRIDE");
	});
});
