import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/variant-merge-both-args", () => {
	it("merges different variants from user and config and applies both rules", () => {
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
									"size-md",
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
									"tone-dark",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					tone: "light",
				},
			},
		);

		const { slots } = $cls.create(
			{
				variant: {
					size: "md",
				},
			},
			{
				variant: {
					tone: "dark",
				},
			},
		);

		expect(slots.root()).toBe("base size-md tone-dark");
	});
});
