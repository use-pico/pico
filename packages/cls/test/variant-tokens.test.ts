import { describe, expect, it } from "bun:test";
import { cls } from "../src";

describe("Variant Token Support", () => {
	it("should support legacy string format in variants", () => {
		const button = cls(
			{
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"lg",
					],
				},
				tokens: {
					group: [],
					value: [],
				},
			},
			{
				slot: {
					root: {
						class: [
							"btn",
						],
						token: [],
					},
				},
				variant: {
					size: {
						sm: {
							root: "btn-sm",
						}, // Legacy string format
						lg: {
							root: "btn-lg",
						},
					},
				},
				tokens: {},
				defaults: {
					size: "sm",
				},
			},
		);

		const component = button.create();
		const smInstance = component();
		const lgInstance = component({
			size: "lg",
		});

		expect(smInstance.slots.root()).toBe("btn btn-sm");
		expect(lgInstance.slots.root()).toBe("btn btn-lg");
	});

	it("should support new {class, token} format in variants", () => {
		const button = cls(
			{
				slot: [
					"root",
					"icon",
				],
				variant: {
					theme: [
						"primary",
						"secondary",
					],
				},
				tokens: {
					group: [
						"design",
					],
					value: [
						"color",
						"spacing",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"btn",
						],
						token: [],
					},
					icon: {
						class: [
							"icon",
						],
						token: [],
					},
				},
				variant: {
					theme: {
						primary: {
							root: {
								class: [
									"btn-primary",
								],
								token: [
									"color",
									"spacing",
								],
							},
							icon: {
								class: [
									"icon-primary",
								],
								token: [
									"color",
								],
							},
						},
						secondary: {
							root: {
								class: [
									"btn-secondary",
								],
								token: [
									"spacing",
								], // Only spacing token
							},
							icon: {
								class: [
									"icon-secondary",
								],
								token: [], // No tokens
							},
						},
					},
				},
				tokens: {
					design: {
						color: [
							"text-white",
							"bg-blue-500",
						],
						spacing: [
							"px-4",
							"py-2",
						],
					},
				},
				defaults: {
					theme: "primary",
				},
			},
		);

		const component = button.create("design");
		const primaryInstance = component();
		const secondaryInstance = component({
			theme: "secondary",
		});

		// Primary theme gets both color and spacing tokens
		expect(primaryInstance.slots.root()).toBe(
			"btn btn-primary text-white bg-blue-500 px-4 py-2",
		);
		expect(primaryInstance.slots.icon()).toBe(
			"icon icon-primary text-white bg-blue-500",
		);

		// Secondary theme gets only spacing tokens
		expect(secondaryInstance.slots.root()).toBe(
			"btn btn-secondary px-4 py-2",
		);
		expect(secondaryInstance.slots.icon()).toBe("icon icon-secondary");
	});

	it("should support mixed format in variants (legacy + new)", () => {
		const card = cls(
			{
				slot: [
					"root",
					"header",
				],
				variant: {
					variant: [
						"basic",
						"enhanced",
					],
				},
				tokens: {
					group: [
						"theme",
					],
					value: [
						"shadow",
						"border",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"card",
						],
						token: [],
					},
					header: {
						class: [
							"card-header",
						],
						token: [],
					},
				},
				variant: {
					variant: {
						basic: {
							root: "card-basic", // Legacy string format
							header: "header-basic",
						},
						enhanced: {
							root: {
								// New object format
								class: [
									"card-enhanced",
								],
								token: [
									"shadow",
									"border",
								],
							},
							header: {
								class: [
									"header-enhanced",
								],
								token: [
									"border",
								],
							},
						},
					},
				},
				tokens: {
					theme: {
						shadow: [
							"shadow-lg",
						],
						border: [
							"border",
							"border-gray-200",
						],
					},
				},
				defaults: {
					variant: "basic",
				},
			},
		);

		const component = card.create("theme");
		const basicInstance = component();
		const enhancedInstance = component({
			variant: "enhanced",
		});

		// Basic uses legacy string format (no tokens)
		expect(basicInstance.slots.root()).toBe("card card-basic");
		expect(basicInstance.slots.header()).toBe("card-header header-basic");

		// Enhanced uses new object format with tokens
		expect(enhancedInstance.slots.root()).toBe(
			"card card-enhanced shadow-lg border border-gray-200",
		);
		expect(enhancedInstance.slots.header()).toBe(
			"card-header header-enhanced border border-gray-200",
		);
	});

	it("should work with inheritance and variant tokens", () => {
		const base = cls(
			{
				slot: [
					"root",
				],
				variant: {
					mode: [
						"light",
						"dark",
					],
				},
				tokens: {
					group: [
						"foundation",
					],
					value: [
						"bg",
						"text",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"base",
						],
						token: [],
					},
				},
				variant: {
					mode: {
						light: {
							root: {
								class: [
									"mode-light",
								],
								token: [
									"bg",
									"text",
								],
							},
						},
						dark: {
							root: {
								class: [
									"mode-dark",
								],
								token: [
									"bg",
									"text",
								],
							},
						},
					},
				},
				tokens: {
					foundation: {
						bg: [
							"bg-white",
						],
						text: [
							"text-black",
						],
					},
				},
				defaults: {
					mode: "light",
				},
			},
		);

		const button = base.use(
			{
				slot: [
					"icon",
				],
				variant: {
					size: [
						"sm",
						"lg",
					],
				},
				tokens: {
					group: [
						"button",
					],
					value: [
						"padding",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"base",
							"btn",
						],
						token: [],
					},
					icon: {
						class: [
							"icon",
						],
						token: [],
					},
				},
				variant: {
					mode: {
						light: {
							root: {
								class: [
									"mode-light",
									"btn-light",
								],
								token: [
									"bg",
									"text",
								],
							},
							icon: {
								class: [
									"icon-light",
								],
								token: [
									"text",
								],
							},
						},
						dark: {
							root: {
								class: [
									"mode-dark",
									"btn-dark",
								],
								token: [
									"bg",
									"text",
								],
							},
							icon: {
								class: [
									"icon-dark",
								],
								token: [
									"text",
								],
							},
						},
					},
					size: {
						sm: {
							root: {
								class: [
									"btn-sm",
								],
								token: [
									"padding",
								],
							},
							icon: {
								class: [
									"icon-sm",
								],
								token: [],
							},
						},
						lg: {
							root: {
								class: [
									"btn-lg",
								],
								token: [
									"padding",
								],
							},
							icon: {
								class: [
									"icon-lg",
								],
								token: [],
							},
						},
					},
				},
				tokens: {
					foundation: {
						bg: [
							"bg-white",
						],
						text: [
							"text-black",
						],
						padding: [
							"p-2",
						],
					},
					button: {
						bg: [
							"bg-blue-500",
						],
						text: [
							"text-white",
						],
						padding: [
							"p-4",
						],
					},
				},
				defaults: {
					mode: "light",
					size: "sm",
				},
			},
		);

		const component = button.create("button");
		const lightSmInstance = component();
		const darkLgInstance = component({
			mode: "dark",
			size: "lg",
		});

		expect(lightSmInstance.slots.root()).toBe(
			"base btn mode-light btn-light bg-blue-500 text-white btn-sm p-4",
		);
		expect(lightSmInstance.slots.icon()).toBe(
			"icon icon-light text-white icon-sm",
		);

		expect(darkLgInstance.slots.root()).toBe(
			"base btn mode-dark btn-dark bg-blue-500 text-white btn-lg p-4",
		);
		expect(darkLgInstance.slots.icon()).toBe(
			"icon icon-dark text-white icon-lg",
		);
	});
});
