import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/multi-slot-override-in-chain", () => {
	it("grandchild override on root leaves icon from base/child intact", () => {
		const baseButtonCls = cls(
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

		const childButtonCls = baseButtonCls.extend(
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
							icon: {
								class: [
									"icon-child",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const grandchildButtonCls = childButtonCls.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						override: true,
						slot: {
							root: {
								class: [
									"ROOT-OVERRIDE",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = grandchildButtonCls.create();
		expect(slots.root()).toBe("ROOT-OVERRIDE");
		expect(slots.icon()).toBe("icon-base icon-child");
	});
});
