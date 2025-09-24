import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-extends-variant-values-three-levels", () => {
	it("base adds sm, child adds md, grandchild adds lg; all usable", () => {
		const baseButtonCls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
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
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const childButtonCls = baseButtonCls.extend(
			{
				tokens: [],
				slot: [],
				variant: {
					size: [
						"md",
					],
				},
			},
			{
				token: {},
				rules: [
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

		const grandchildButtonCls = childButtonCls.extend(
			{
				tokens: [],
				slot: [],
				variant: {
					size: [
						"lg",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						match: {
							size: "lg",
						},
						slot: {
							root: {
								class: [
									"lg",
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

		const { slots } = grandchildButtonCls.create();
		// default sm
		expect(slots.root()).toBe("base");
		// md from child
		expect(
			slots.root({
				variant: {
					size: "md",
				},
			}),
		).toBe("base md");
		// lg from grandchild
		expect(
			slots.root({
				variant: {
					size: "lg",
				},
			}),
		).toBe("base lg");
	});
});
