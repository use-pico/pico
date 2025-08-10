import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("inheritance", () => {
	it("child can add tokens and override parent-declared variants only when declared", () => {
		const Base = cls(
			{
				tokens: {
					"primary.text": [
						"default",
					],
					"primary.bg": [
						"default",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
			},
			{
				token: {
					"primary.text": {
						default: [
							"text-blue-600",
						],
					},
					"primary.bg": {
						default: [
							"bg-blue-600",
						],
					},
				},
				rules: ({ root }) => [
					root({
						root: {
							token: [
								"primary.bg.default",
							],
						},
						label: {
							token: [
								"primary.text.default",
							],
						},
					}),
				],
				defaults: {
					theme: "light",
				},
			},
		);

		const Child = Base.extend(
			{
				tokens: {
					// override only this group's variant we declare here
					"primary.text": [
						"default",
					],
					// add new token group
					"accent.ring": [
						"focus",
					],
				},
				slot: [
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
				token: {
					"primary.text": {
						default: [
							"text-red-600",
						],
					},
					"accent.ring": {
						focus: [
							"ring-2 ring-blue-600",
						],
					},
				},
				rules: ({ root, rule, what: u }) => [
					root({
						icon: u.token([
							"accent.ring.focus",
						]),
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: u.css([
								"px-2",
								"py-1",
							]),
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: u.css([
								"px-4",
								"py-2",
							]),
						},
					),
				],
				defaults: {
					size: "md",
					theme: "dark",
				},
			},
		);

		const s = Child.create();
		expect(s.root()).toBe("bg-blue-600 px-4 py-2");
		expect(s.label()).toBe("text-red-600");
		expect(s.icon()).toBe("ring-2 ring-blue-600");
	});

	it("multi-level extension with create-time overrides at leaf", () => {
		const Base = cls(
			{
				tokens: {
					"t.text": [
						"default",
					],
					"t.bg": [
						"default",
					],
				},
				slot: [
					"root",
					"label",
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
					"t.text": {
						default: [
							"text-blue-600",
						],
					},
					"t.bg": {
						default: [
							"bg-blue-600",
						],
					},
				},
				rules: ({ root }) => [
					root({
						root: {
							token: [
								"t.bg.default",
							],
						},
						label: {
							token: [
								"t.text.default",
							],
						},
					}),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const Mid = Base.extend(
			{
				tokens: {
					"t.border": [
						"default",
					],
				},
				slot: [],
				variant: {},
			},
			{
				token: {
					"t.border": {
						default: [
							"border",
						],
					},
				},
				rules: () => [],
				defaults: {
					size: "md",
				},
			},
		);

		const Leaf = Mid.extend(
			{
				tokens: {
					"t.shadow": [
						"default",
					],
				},
				slot: [
					"icon",
				],
				variant: {},
			},
			{
				token: {
					"t.shadow": {
						default: [
							"shadow",
						],
					},
				},
				rules: ({ root, what: u }) => [
					root({
						icon: u.css([
							"size-4",
						]),
					}),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const s = Leaf.create(() => ({
			token: {
				"t.text": {
					default: [
						"text-red-600",
					],
				},
			},
		}));
		expect(s.root()).toBe("bg-blue-600");
		expect(s.label()).toBe("text-red-600");
		expect(s.icon()).toBe("size-4");
	});
});
