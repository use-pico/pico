import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/multi-matching-rules-no-override-order", () => {
	it("applies multiple matching rules in order without overrides", () => {
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
					active: [
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
					{
						match: {
							active: "on",
						},
						slot: {
							root: {
								class: [
									"on",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					active: "off",
				},
			},
		);

		const { slots } = $cls.create({
			variant: {
				size: "md",
				active: "on",
			},
		});
		expect(slots.root()).toBe("base md on");
	});
});
