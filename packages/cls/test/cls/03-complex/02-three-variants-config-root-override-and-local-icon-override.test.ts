import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/three-variants-config-root-override-and-local-icon-override", () => {
	it("config overrides root; local overrides icon; variants still decide matches", () => {
		const $cls = cls(
			{
				tokens: [
					"text",
					"bg",
				],
				slot: [
					"root",
					"icon",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
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
				token: {
					text: {
						class: [
							"text-gray-900",
						],
					},
					bg: {
						class: [
							"bg-white",
						],
					},
				},
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
							icon: {
								class: [
									"i-sm",
								],
							},
						},
					},
					{
						match: {
							tone: "dark",
							on: true,
						},
						slot: {
							root: {
								class: [
									"dark-on",
								],
							},
							icon: {
								class: [
									"i-dark-on",
								],
							},
						},
					},
					{
						slot: {
							root: {
								token: [
									"text",
									"bg",
								],
								class: [
									"base",
								],
							},
							icon: {
								class: [
									"i-base",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					tone: "dark",
					on: true,
				},
			},
		);

		const { slots } = $cls.create(
			{},
			{
				override: {
					root: {
						class: [
							"CONF-ROOT",
						],
					},
				},
			},
		);

		// Root fully replaced by config override
		expect(slots.root()).toBe("CONF-ROOT");
		// Local override on icon replaces icon only
		expect(
			slots.icon({
				override: {
					icon: {
						class: [
							"LOCAL-ICON",
						],
					},
				},
			}),
		).toBe("LOCAL-ICON");
	});
});
