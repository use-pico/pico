import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("tokens", () => {
	it("resolves tokens from definition", () => {
		const C = cls(
			{
				tokens: {
					"color.text": [
						"default",
					],
					"color.bg": [
						"default",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-blue-600",
						],
					},
				},
				rules: ({ root, what }) => [
					root({
						root: what.token([
							"color.bg.default",
						]),
						label: what.token([
							"color.text.default",
						]),
					}),
				],
				defaults: {},
			},
		);

		const s = C.create();
		expect(s.root()).toBe("bg-blue-600");
		expect(s.label()).toBe("text-blue-600");
	});

	it("create({ token }) overrides definition tokens", () => {
		const C = cls(
			{
				tokens: {
					"color.text": [
						"default",
					],
					"color.bg": [
						"default",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-blue-600",
						],
					},
				},
				rules: ({ root, what }) => [
					root({
						root: what.token([
							"color.bg.default",
						]),
						label: what.token([
							"color.text.default",
						]),
					}),
				],
				defaults: {},
			},
		);

		const s = C.create(() => ({
			token: {
				"color.text": {
					default: [
						"text-red-600",
					],
				},
				"color.bg": {
					default: [
						"bg-red-600",
					],
				},
			},
		}));
		expect(s.root()).toBe("bg-red-600");
		expect(s.label()).toBe("text-red-600");
	});
});
