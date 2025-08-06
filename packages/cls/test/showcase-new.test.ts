import { describe, expect, it } from "bun:test";
import { cls } from "../src";

describe("Cls API Showcase - New Two-Argument API", () => {
	it("should demonstrate 3-level inheritance with all features", () => {
		// Level 1: Design System Foundation
		const designSystemCls = cls(
			{
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
					/**
					 * Define token variants (something like super-group)
					 *
					 * Those will be keys in definition.tokens
					 *
					 * All variants _must_ implement each member of the group
					 *
					 * Variant is _not_ in dot notation, this is same as before,
					 * meaning spacing.small stays; user will select this "supergroup"
					 * when calling "create"
					 */
					variant: [
						"default",
						"extra",
					],
					/**
					 * Individual groups available for dot notation
					 */
					group: {
						spacing: [
							"small",
							"medium",
						],
						color: [
							"blue",
							"green",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"ds-component",
						],
						token: [
							/**
							 * Super group is ignored, only group is used to compute keys (this is the same as now, only moved one level deeper)
							 */
							"spacing.small",
							"color.blue",
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
                    /**
                     * Here all variants from contract are required
                     */
					default: {
                        /**
                         * Same here - all groups and values are required
                         */
						spacing: {
							// here will be forced vales defined in contract
							small: [
								"p-2",
							],
							medium: [
								"p-3",
							],
						},
						// ... here the same, only for "color" group
						color: {
							blue: [
								"text-gray-900",
							],
							green: [
								"text-gray-900",
							],
						},
					},
					extra: {
						spacing: {
							// here will be forced vales defined in contract
							small: [
								"p-2",
							],
							medium: [
								"p-3",
							],
						},
						// ... here the same, only for "color" group
						color: {
							blue: [
								"text-gray-900",
							],
							green: [
								"text-gray-900",
							],
						},
					},
				},
				defaults: {
					theme: "light",
				},
			},
		);

		// Level 2: Button Component
		const buttonCls = designSystemCls.use(
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
						"background",
					],
				},
			},
			{
				slot: {
					root: {
						class: [
							"ds-component",
							"btn",
						],
						token: [
							"spacing.small",
							"color.blue",
							"value.background",
						],
					},
					icon: {
						class: [
							"btn-icon",
						],
						token: [
							"color.blue",
						],
					},
				},
				variant: {
					theme: {
						light: {
							root: "btn-light theme-light",
							icon: "icon-light",
						},
						dark: {
							root: "btn-dark theme-dark",
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
					color: {
						green: [
							"text-green-900",
						],
					},
					group: {
						button: [
							"bg-blue-600",
						],
					},
					value: {
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
		);

		// Level 3: Special Button Component
		const specialButtonCls = buttonCls.use(
			{
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
			{
				slot: {
					root: {
						class: [
							"ds-component",
							"btn",
							"special-btn",
						],
						token: [
							"spacing.medium",
							"color.green",
							"color.green",
							"color.green",
						],
					},
					icon: {
						class: [
							"btn-icon",
							"special-icon",
						],
						token: [
							"color.green",
						],
					},
					badge: {
						class: [
							"badge",
						],
						token: [
							"color.green",
						],
					},
				},
				variant: {
					theme: {
						light: {
							root: "special-light btn-light theme-light",
							icon: "special-icon-light icon-light",
							badge: "badge-light",
						},
						dark: {
							root: "special-dark btn-dark theme-dark",
							icon: "special-icon-dark icon-dark",
							badge: "badge-dark",
						},
					},
					size: {
						sm: {
							root: "special-sm btn-sm",
							icon: "icon-sm",
							badge: "badge-sm",
						},
						lg: {
							root: "special-lg btn-lg",
							icon: "icon-lg",
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
		);

		// Test Level 1: Design System Foundation
		const foundationComponent = designSystemCls.create("foundation");
		const foundationInstance = foundationComponent();
		expect(foundationInstance.slots.root()).toBe(
			"ds-component p-2 text-gray-900 theme-light",
		);

		// Test Level 2: Button Component
		const buttonComponent = buttonCls.create("button");
		const buttonDefaultInstance = buttonComponent();
		const buttonCustomInstance = buttonComponent({
			size: "lg",
			theme: "dark",
		});

		expect(buttonDefaultInstance.slots.root()).toBe(
			"ds-component btn p-3 text-blue-900 bg-blue-600 btn-light theme-light btn-sm",
		);
		expect(buttonDefaultInstance.slots.icon()).toBe(
			"btn-icon text-blue-900 icon-light icon-sm",
		);

		expect(buttonCustomInstance.slots.root()).toBe(
			"ds-component btn p-3 text-blue-900 bg-blue-600 btn-dark theme-dark btn-lg",
		);
		expect(buttonCustomInstance.slots.icon()).toBe(
			"btn-icon text-blue-900 icon-dark icon-lg",
		);

		// Test Level 3: Special Button Component
		const specialComponent = specialButtonCls.create("special");
		const specialDefaultInstance = specialComponent();
		const specialCustomInstance = specialComponent({
			size: "lg",
			theme: "dark",
			special: "danger",
		});

		expect(specialDefaultInstance.slots.root()).toBe(
			"ds-component btn special-btn p-6 text-yellow-400 bg-purple-600 border-purple-600 special-light btn-light theme-light special-sm btn-sm variant-primary",
		);
		expect(specialDefaultInstance.slots.icon()).toBe(
			"btn-icon special-icon text-yellow-400 special-icon-light icon-light icon-sm",
		);
		expect(specialDefaultInstance.slots.badge()).toBe(
			"badge border-purple-600 badge-light badge-sm badge-primary",
		);

		expect(specialCustomInstance.slots.root()).toBe(
			"ds-component btn special-btn p-6 text-yellow-400 bg-purple-600 border-purple-600 special-dark btn-dark theme-dark special-lg btn-lg variant-danger",
		);
		expect(specialCustomInstance.slots.icon()).toBe(
			"btn-icon special-icon text-yellow-400 special-icon-dark icon-dark icon-lg",
		);
		expect(specialCustomInstance.slots.badge()).toBe(
			"badge border-purple-600 badge-dark badge-lg badge-danger",
		);
	});
});
