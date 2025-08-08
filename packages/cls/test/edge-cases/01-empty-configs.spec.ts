import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("empty configurations", () => {
	it("handles completely empty cls with no tokens, slots, or variants", () => {
		const Empty = cls(
			{
				tokens: {},
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: () => [],
				defaults: {},
			},
		);

		const slots = Empty.create();
		expect(slots).toEqual({});
	});

	it("handles cls with only tokens but no slots", () => {
		const TokenOnly = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
					],
					"color.bg": [
						"default",
						"primary",
					],
				},
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
					},
				},
				rules: () => [],
				defaults: {},
			},
		);

		const slots = TokenOnly.create();
		expect(slots).toEqual({});
	});

	it("handles cls with only slots but no tokens or variants", () => {
		const SlotOnly = cls(
			{
				tokens: {},
				slot: [
					"root",
					"child",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
							],
						},
						child: {
							class: [
								"child",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = SlotOnly.create();
		expect(slots.root()).toBe("block");
		expect(slots.child()).toBe("child");
	});

	it("handles cls with only variants but no tokens", () => {
		const VariantOnly = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
							],
						},
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								class: [
									"text-sm",
								],
							},
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: {
								class: [
									"text-base",
								],
							},
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: {
								class: [
									"text-lg",
								],
							},
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const slots = VariantOnly.create();
		expect(slots.root()).toBe("block text-base");
		expect(
			slots.root({
				size: "sm",
			}),
		).toBe("block text-sm");
		expect(
			slots.root({
				size: "lg",
			}),
		).toBe("block text-lg");
	});

	it("handles cls with empty token definitions", () => {
		const EmptyTokens = cls(
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
				],
				variant: {},
			},
			{
				token: {
					"color.text": {
						default: [],
					},
					"color.bg": {
						default: [],
					},
				},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
							],
							token: [
								"color.text.default",
								"color.bg.default",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = EmptyTokens.create();
		expect(slots.root()).toBe("block");
	});

	it("handles cls with empty class arrays", () => {
		const EmptyClasses = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = EmptyClasses.create();
		expect(slots.root()).toBe("");
	});

	it("handles cls with no rules", () => {
		const NoRules = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: () => [],
				defaults: {},
			},
		);

		const slots = NoRules.create();
		expect(slots.root()).toBe("");
	});

	it("handles cls with only root rule", () => {
		const RootOnly = cls(
			{
				tokens: {},
				slot: [
					"root",
					"child",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = RootOnly.create();
		expect(slots.root()).toBe("block");
		expect(slots.child()).toBe("");
	});

	it("handles cls with empty defaults", () => {
		const EmptyDefaults = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = EmptyDefaults.create();
		expect(slots.root()).toBe("block");
	});

	it("handles cls with undefined values in create config", () => {
		const Basic = cls(
			{
				tokens: {},
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
				token: {},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
							],
						},
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								class: [
									"text-sm",
								],
							},
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: {
								class: [
									"text-base",
								],
							},
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const slots = Basic.create({
			variant: undefined,
			slot: undefined,
			override: undefined,
			token: undefined,
		});
		expect(slots.root()).toBe("block text-base");
	});

	it("handles cls with empty objects in create config", () => {
		const Basic = cls(
			{
				tokens: {},
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
				token: {},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"block",
							],
						},
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: {
								class: [
									"text-sm",
								],
							},
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: {
								class: [
									"text-base",
								],
							},
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const slots = Basic.create({
			variant: {},
			slot: {},
			override: {},
			token: {},
		});
		expect(slots.root()).toBe("block text-base");
	});

	it("handles cls with null values in class arrays", () => {
		const WithNulls = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
								null,
								"text-base",
								undefined,
								"",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = WithNulls.create();
		expect(slots.root()).toBe("block text-base");
	});

	it("handles cls with whitespace-only strings", () => {
		const WithWhitespace = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
								"   ",
								"\t",
								"\n",
								"text-base",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = WithWhitespace.create();
		expect(slots.root()).toBe("block text-base");
	});
});
