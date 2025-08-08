import { describe, expect, it } from "bun:test";
import { cls } from "../src/cls";

describe("Cls.instance helpers inheritance", () => {
	it("component() on an instance creates a child that inherits base rules/tokens", () => {
		const Base = cls(
			{
				tokens: {
					"theme.text": [
						"default",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"theme.text": {
						default: [
							"text-blue-600",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								token: [
									"theme.text.default",
								],
								class: [
									"base-root",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const Child = Base.component({
			slots: [
				"label",
			],
			slot: {
				label: {
					class: [
						"font-bold",
					],
				},
			},
		});

		const s = Child.create();
		expect(s.root).toBe("base-root text-blue-600");
		expect(s.label).toBe("font-bold");
	});

	it("variant() on an instance creates a child with variants and inherits base", () => {
		const Base = cls(
			{
				tokens: {
					"theme.text": [
						"default",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"theme.text": {
						default: [
							"text-blue-600",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								token: [
									"theme.text.default",
								],
								class: [
									"base-root",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const Child = Base.variant({
			slots: [
				"label",
			],
			variants: {
				active: [
					"bool",
				],
			},
			rule: [
				{
					slot: {
						label: {
							class: [
								"base-label",
							],
						},
					},
				},
				{
					match: {
						active: true,
					},
					slot: {
						label: {
							class: [
								"is-active",
							],
						},
					},
				},
			],
			defaults: {
				active: false,
			},
		});

		expect(Child.create({}).root).toBe("base-root text-blue-600");
		expect(Child.create({}).label).toBe("base-label");
		expect(
			Child.create({
				variant: {
					active: true,
				},
			}).label,
		).toBe("base-label is-active");
	});
});
