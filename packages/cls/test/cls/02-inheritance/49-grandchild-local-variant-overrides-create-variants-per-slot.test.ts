import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/grandchild-local-variant-overrides-create-variants-per-slot", () => {
	it("local variant change affects only that call and slot outputs", () => {
		const $base = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
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
									"b-root",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								class: [
									"b-icon",
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
									"md-root",
								],
							},
							icon: {
								class: [
									"md-icon",
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

		const $grand = $child.extend(
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

		const { slots } = $grand.create({
			variant: {
				size: "md",
			},
		});
		expect(slots.root()).toBe("b-root md-root");
		expect(slots.icon()).toBe("b-icon md-icon");
		expect(
			slots.root({
				variant: {
					size: "sm",
				},
			}),
		).toBe("b-root");
		expect(
			slots.icon({
				variant: {
					size: "sm",
				},
			}),
		).toBe("b-icon");
	});
});
