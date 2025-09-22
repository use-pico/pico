import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/multi-slot-override-in-chain", () => {
	it("grandchild override on root leaves icon from base/child intact", () => {
		const $base = cls(
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

		const $grand = $child.extend(
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
									"ROOT-OVR",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $grand.create();
		expect(slots.root()).toBe("ROOT-OVR");
		expect(slots.icon()).toBe("icon-base icon-child");
	});
});
