import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/inheritance/child-extends-tokens-adds-bg-order", () => {
	it("base text then child bg; user/local overlays win with correct order", () => {
		const $base = cls(
			{
				tokens: [
					"color.text",
				],
				slot: [
					"root",
				],
				variant: {},
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
				defaults: {},
			},
		);

		const $child = $base.extend(
			{
				tokens: [
					"color.bg",
				],
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.bg": {
						class: [
							"bg-white",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.text",
									"color.bg",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $child.create(
			tweaks([
				{
					token: {
						"color.bg": {
							class: [
								"bg-black",
							],
						},
					},
				},
				{},
			]),
		);

		// user overlay wins for bg; current implementation appends base before token classes
		expect(slots.root()).toBe("base text-red-500 bg-black");
		// local overlay for text wins over user and child/base token
		expect(
			slots.root({
				token: {
					"color.text": {
						class: [
							"text-yellow-500",
						],
					},
				},
			}),
		).toBe("base text-yellow-500 bg-black");
	});
});
