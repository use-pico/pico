import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/variant-undefined-reverts-to-default", () => {
	it("uses default when local variant is explicitly set to undefined", () => {
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
					size: "md",
				},
			},
		);

		const { slots } = $cls.create();
		// default applies: md
		expect(slots.root()).toBe("base md");
		// undefined should revert to defined defaults (not erase value)
		expect(
			slots.root({
				variant: {
					size: undefined,
				},
			}),
		).toBe("base md");
	});
});
