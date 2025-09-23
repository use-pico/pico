import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/variant-undefined-keeps-create-values-across-multiple-variants", () => {
	it("create selects size=md,tone=dark,on=true; local undefined keeps those", () => {
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
					tone: [
						"light",
						"dark",
					],
					on: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"sm",
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
							tone: "light",
						},
						slot: {
							root: {
								class: [
									"light",
								],
							},
						},
					},
					{
						match: {
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"dark",
								],
							},
						},
					},
					{
						match: {
							on: true,
						},
						slot: {
							root: {
								class: [
									"on",
								],
							},
						},
					},
					{
						match: {
							on: false,
						},
						slot: {
							root: {
								class: [
									"off",
								],
							},
						},
					},
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
					tone: "light",
					on: false,
				},
			},
		);

		const { slots } = $cls.create({
			variant: {
				size: "md",
				tone: "dark",
				on: true,
			},
		});
		expect(slots.root()).toBe("md dark on base");
		expect(
			slots.root({
				variant: {
					size: undefined,
					tone: undefined,
					on: undefined,
				},
			}),
		).toBe("md dark on base");
		// flipping one keeps others
		expect(
			slots.root({
				variant: {
					size: undefined,
					tone: undefined,
					on: false,
				},
			}),
		).toBe("md dark off base");
	});
});
