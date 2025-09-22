import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/defaults-and-token-override", () => {
	it("child defaults override base defaults and child tokens override base tokens", () => {
		// Base instance
		const $base = cls(
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
								token: [
									"color.text",
								],
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

		// Child extends base, overrides token and defaults, adds md rule and additional base class
		const $child = $base.extend(
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
							"text-blue-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"child",
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
									"is-md",
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

		const { slots } = $child.create();
		// Defaults from child apply: md -> includes is-md
		// Token override from child applies: text-blue-500 replaces base's text-red-500
		expect(slots.root()).toBe("text-blue-500 base child is-md");
		// When forcing sm, child md rule should not apply
		expect(
			slots.root({
				variant: {
					size: "sm",
				},
			}),
		).toBe("text-blue-500 base child");
	});
});
