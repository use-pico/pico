import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/inheritance/child-user-undefined-keeps-config-variant", () => {
	it("user undefined keeps config-set variant value", () => {
		const $base = cls(
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

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {
					size: "sm",
				},
			},
		);

		const { slots } = $child.create(
			tweaks([
				{
					variant: {
						size: undefined,
					},
				},
				{
					variant: {
						size: "md",
					},
				},
			]),
		);
		expect(slots.root()).toBe("base md");
	});
});
