import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/config-tweak-basic", () => {
	it("applies only config (second arg) variant and slot classes", () => {
		const $cls = cls(
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
									"base",
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

		const { slots } = $cls.create(undefined, {
			variant: {
				size: "md",
			},
			slot: {
				root: {
					class: [
						"config",
					],
				},
			},
		});

		expect(slots.root()).toBe("base md config");
	});
});
