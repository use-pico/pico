import { describe, expect, it } from "bun:test";
import { cls } from "../src";

describe("Cls API Showcase - Complete Feature Test", () => {
	it("should demonstrate 3-level inheritance with all features", () => {
		// Level 1: Design System Foundation
		const designSystemCls = cls({
			contract: {
				slot: [
					"root",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
				tokens: {
					group: [
						"foundation",
					],
					value: [
						"spacing",
						"color",
					],
				},
			},
			definition: {
				slot: {
					root: {
						class: [
							"ds-component",
						],
						token: [
							"spacing",
							"color",
						],
					},
				},
				variant: {
					theme: {
						light: {
							root: "theme-light",
						},
						dark: {
							root: "theme-dark",
						},
					},
				},
				tokens: {
					foundation: {
						spacing: [
							"p-4",
						],
						color: [
							"text-gray-900",
						],
					},
				},
				defaults: {
					theme: "light",
				},
			},
		});

		// Level 2: Button Component
		const buttonCls = designSystemCls.use({
			contract: {
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
						"background",
					],
				},
			},
			definition: {
				slot: {
					root: {
						class: [
							"btn",
						],
						token: [
							"spacing",
							"color",
							"background",
						],
					},
					icon: {
						class: [
							"icon",
						],
						token: [
							"color",
						],
					},
				},
				variant: {
					theme: {
						light: {
							root: "btn-light",
							icon: "icon-light",
						},
						dark: {
							root: "btn-dark",
							icon: "icon-dark",
						},
					},
					size: {
						sm: {
							root: "btn-sm",
							icon: "icon-sm",
						},
						lg: {
							root: "btn-lg",
							icon: "icon-lg",
						},
					},
				},
				tokens: {
					foundation: {
						spacing: [
							"p-2",
						],
						color: [
							"text-white",
						],
						background: [
							"bg-blue-500",
						],
					},
					button: {
						spacing: [
							"p-3",
						],
						color: [
							"text-blue-900",
						],
						background: [
							"bg-blue-600",
						],
					},
				},
				defaults: {
					theme: "light",
					size: "sm",
				},
			},
		});

		// Level 3: Special Button Component
		const specialButtonCls = buttonCls.use({
			contract: {
				slot: [
					"badge",
				],
				variant: {
					special: [
						"primary",
						"danger",
					],
				},
				tokens: {
					group: [
						"special",
					],
					value: [
						"border",
					],
				},
			},
			definition: {
				slot: {
					root: {
						class: [
							"special-btn",
						],
						token: [
							"spacing",
							"color",
							"background",
							"border",
						],
					},
					icon: {
						class: [
							"special-icon",
						],
						token: [
							"color",
							"border",
						],
					},
					badge: {
						class: [
							"badge",
						],
						token: [
							"background",
							"border",
						],
					},
				},
				variant: {
					theme: {
						light: {
							root: "special-light",
							icon: "special-icon-light",
							badge: "badge-light",
						},
						dark: {
							root: "special-dark",
							icon: "special-icon-dark",
							badge: "badge-dark",
						},
					},
					size: {
						sm: {
							root: "special-sm",
							badge: "badge-sm",
						},
						lg: {
							root: "special-lg",
							badge: "badge-lg",
						},
					},
					special: {
						primary: {
							root: "variant-primary",
							badge: "badge-primary",
						},
						danger: {
							root: "variant-danger",
							badge: "badge-danger",
						},
					},
				},
				tokens: {
					foundation: {
						spacing: [
							"p-1",
						],
						color: [
							"text-black",
						],
						background: [
							"bg-gray-100",
						],
						border: [
							"border-gray-300",
						],
					},
					button: {
						spacing: [
							"p-2",
						],
						color: [
							"text-white",
						],
						background: [
							"bg-blue-700",
						],
						border: [
							"border-blue-700",
						],
					},
					special: {
						spacing: [
							"p-6",
						],
						color: [
							"text-yellow-400",
						],
						background: [
							"bg-purple-600",
						],
						border: [
							"border-purple-600",
						],
					},
				},
				defaults: {
					theme: "light",
					size: "sm",
					special: "primary",
				},
			},
		});

		// Test Level 1: Design System with foundation tokens
		const foundationComponent = designSystemCls.create("foundation");
		const foundationInstance = foundationComponent();
		expect(foundationInstance.slots.root()).toBe(
			"ds-component p-4 text-gray-900 theme-light",
		);

		// Test Level 2: Button with inherited + own tokens
		const buttonFoundationComponent = buttonCls.create("foundation");
		const buttonFoundationInstance = buttonFoundationComponent();
		expect(buttonFoundationInstance.slots.root()).toBe(
			"btn p-2 text-white bg-blue-500 btn-light btn-sm",
		);
		expect(buttonFoundationInstance.slots.icon()).toBe(
			"icon text-white icon-light icon-sm",
		);

		const buttonComponent = buttonCls.create("button");
		const buttonInstance = buttonComponent();
		expect(buttonInstance.slots.root()).toBe(
			"btn p-3 text-blue-900 bg-blue-600 btn-light btn-sm",
		);
		expect(buttonInstance.slots.icon()).toBe(
			"icon text-blue-900 icon-light icon-sm",
		);

		// Test Level 3: Special Button with full inheritance chain
		const specialFoundationComponent =
			specialButtonCls.create("foundation");
		const specialFoundationInstance = specialFoundationComponent();
		expect(specialFoundationInstance.slots.root()).toBe(
			"special-btn p-1 text-black bg-gray-100 border-gray-300 special-light special-sm variant-primary",
		);
		expect(specialFoundationInstance.slots.icon()).toBe(
			"special-icon text-black border-gray-300 special-icon-light",
		);
		expect(specialFoundationInstance.slots.badge()).toBe(
			"badge bg-gray-100 border-gray-300 badge-light badge-sm badge-primary",
		);

		const specialButtonComponent = specialButtonCls.create("button");
		const specialButtonInstance = specialButtonComponent();
		expect(specialButtonInstance.slots.root()).toBe(
			"special-btn p-2 text-white bg-blue-700 border-blue-700 special-light special-sm variant-primary",
		);

		const specialComponent = specialButtonCls.create("special");
		const specialInstance = specialComponent();
		expect(specialInstance.slots.root()).toBe(
			"special-btn p-6 text-yellow-400 bg-purple-600 border-purple-600 special-light special-sm variant-primary",
		);

		// Test variant overrides
		const darkLargeSpecial = specialComponent({
			theme: "dark",
			size: "lg",
			special: "danger",
		});
		expect(darkLargeSpecial.slots.root()).toBe(
			"special-btn p-6 text-yellow-400 bg-purple-600 border-purple-600 special-dark special-lg variant-danger",
		);
		expect(darkLargeSpecial.slots.badge()).toBe(
			"badge bg-purple-600 border-purple-600 badge-dark badge-lg badge-danger",
		);

		// Verify clean API - no 'as const' needed anywhere!
		expect(typeof designSystemCls.create).toBe("function");
		expect(typeof buttonCls.create).toBe("function");
		expect(typeof specialButtonCls.create).toBe("function");
		expect(typeof buttonCls.use).toBe("function");
		expect(typeof specialButtonCls.use).toBe("function");
	});
});
