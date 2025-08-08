import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("extend API", () => {
	it("extends with new variants", () => {
		const Base = cls(
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

		const Extended = Base.extend(
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
					variant: [
						"default",
						"primary",
					],
				},
			},
			{
				token: {},
				rules: ({ rule }) => [
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
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								class: [
									"bg-blue-500",
								],
							},
						},
					),
				],
				defaults: {
					size: "md",
					variant: "default",
				},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("block text-base");

		const largeSlots = Extended.create({
			variant: {
				size: "lg",
				variant: "primary",
			},
		});
		expect(largeSlots.root()).toBe("block text-lg bg-blue-500");
	});

	it("extends with new tokens", () => {
		const Base = cls(
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
						default: [
							"text-gray-900",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
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

		const Extended = Base.extend(
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
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"primary",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [],
						primary: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [],
						primary: [
							"bg-blue-50",
						],
					},
				},
				rules: ({ rule }) => [
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								token: [
									"color.text.primary",
									"color.bg.primary",
								],
							},
						},
					),
				],
				defaults: {
					variant: "default",
				},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("block");

		const primarySlots = Extended.create({
			variant: {
				variant: "primary",
			},
		});
		expect(primarySlots.root()).toBe("block text-blue-600 bg-blue-50");
	});

	it("extends with new slots", () => {
		const Base = cls(
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
								"base-root",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const Extended = Base.extend(
			{
				tokens: {},
				slot: [
					"root",
					"child",
					"grandchild",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"extended-root",
							],
						},
						child: {
							class: [
								"child-slot",
							],
						},
						grandchild: {
							class: [
								"grandchild-slot",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("base-root extended-root");
		expect(slots.child()).toBe("child-slot");
		expect(slots.grandchild()).toBe("grandchild-slot");
	});

	it("extends with token overrides", () => {
		const Base = cls(
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
				slot: [
					"root",
				],
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

		const Extended = Base.extend(
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
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.text": {
						default: [],
						primary: [
							"text-red-600",
						], // Override primary text color
					},
					"color.bg": {
						default: [],
						primary: [
							"bg-red-50",
						], // Override primary background color
					},
				},
				rules: ({ root }) => [
					root({
						root: {
							class: [
								"block",
							],
							token: [
								"color.text.primary",
								"color.bg.primary",
							],
						},
					}),
				],
				defaults: {},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("block text-red-600 bg-red-50");
	});

	it("extends with rule overrides", () => {
		const Base = cls(
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
								"base",
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

		const Extended = Base.extend(
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
								"extended",
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
									"text-xs",
								],
							}, // Override sm size
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: {
								class: [
									"text-lg",
								],
							}, // Override md size
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("base extended text-lg");

		const smallSlots = Extended.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallSlots.root()).toBe("base extended text-xs");
	});

	it("extends with default overrides", () => {
		const Base = cls(
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
								"base",
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

		const Extended = Base.extend(
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
								"extended",
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
					size: "lg",
				}, // Override default to lg
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("base extended text-lg");
	});

	it("extends with all features combined", () => {
		const Base = cls(
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
						default: [
							"text-gray-900",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
					},
				},
				rules: ({ root, rule }) => [
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

		const Extended = Base.extend(
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
				slot: [
					"root",
					"label",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					variant: [
						"default",
						"primary",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [],
						primary: [
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [],
						primary: [
							"bg-blue-50",
						],
					},
				},
				rules: ({ rule }) => [
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
					rule(
						{
							variant: "primary",
						},
						{
							root: {
								token: [
									"color.text.primary",
									"color.bg.primary",
								],
							},
							label: {
								class: [
									"font-medium",
								],
							},
						},
					),
				],
				defaults: {
					size: "lg",
					variant: "primary",
				},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("block text-lg text-blue-600 bg-blue-50");
		expect(slots.label()).toBe("font-medium");

		const defaultSlots = Extended.create({
			variant: {
				variant: "default",
				size: "sm",
			},
		});
		expect(defaultSlots.root()).toBe("block text-sm");
		expect(defaultSlots.label()).toBe("");
	});

	it("extends with boolean variants", () => {
		const Base = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					disabled: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule }) => [
					root({
						root: {
							class: [
								"base",
							],
						},
					}),
					rule(
						{
							disabled: true,
						},
						{
							root: {
								class: [
									"opacity-50",
								],
							},
						},
					),
				],
				defaults: {
					disabled: false,
				},
			},
		);

		const Extended = Base.extend(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					disabled: [
						"bool",
					],
					loading: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: ({ rule }) => [
					rule(
						{
							loading: true,
						},
						{
							root: {
								class: [
									"animate-pulse",
								],
							},
						},
					),
				],
				defaults: {
					disabled: false,
					loading: false,
				},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("base");

		const disabledSlots = Extended.create({
			variant: {
				disabled: true,
			},
		});
		expect(disabledSlots.root()).toBe("base opacity-50");

		const loadingSlots = Extended.create({
			variant: {
				loading: true,
			},
		});
		expect(loadingSlots.root()).toBe("base animate-pulse");

		const bothSlots = Extended.create({
			variant: {
				disabled: true,
				loading: true,
			},
		});
		expect(bothSlots.root()).toBe("base opacity-50 animate-pulse");
	});
});
