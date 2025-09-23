import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/create-both-args-user-vs-config", () => {
	it("merges both create() args with user winning per field and appending slots", () => {
		const $cls = cls(
			{
				tokens: [
					"color.text",
				],
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
				token: {
					"color.text": {
						class: [
							"text-red-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"base",
								],
								token: [
									"color.text",
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

		const { slots } = $cls.create(
			{
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"user",
						],
					},
				},
				token: {
					"color.text": {
						class: [
							"text-blue-500",
						],
					},
				},
			},
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"config",
						],
					},
				},
				token: {
					"color.text": {
						class: [
							"text-green-500",
						],
					},
				},
			},
		);

		// Expectations:
		// - variant: user wins (md) -> md-specific rule applied
		// - slot: combined base + md + config + user, with user last
		// - token: config wins (text-green-500)
		expect(slots.root()).toBe("text-green-500 base user config");
	});
});
