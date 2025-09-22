import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/child-extends-slots-adds-icon", () => {
	it("child adds new slot 'icon' and both slots work", () => {
		const $base = cls(
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
									"root-base",
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
				slot: [
					"icon",
				],
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

		const { slots } = $child.create();
		expect(slots.root()).toBe("root-base");
		expect(slots.icon()).toBe("icon-child");
	});
});
