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
					// variant: [
					// 	"default",
					// 	"extra",
					// ],
					// /**
					//  * Individual groups available for dot notation
					//  */
					// group: {
					// 	spacing: [
					// 		"small",
					// 		"medium",
					// 	],
					// 	color: [
					// 		"blue",
					// 		"green",
					// 	],
					// },
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
							root: {
								class: [
									"theme-light",
								],
								token: [
									"spacing.small",
								],
							},
						},
						dark: {
							root: {
								class: [
									"theme-dark",
								],
							},
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
					variant: [
						"default",
					],
					group: {
						color: [
							"purple",
						],
					},
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
					size: {
						lg: {
							icon: {
								class: [],
								token: [
									"spacing.small",
								],
							},
						},
						sm: {
							icon: {
								class: [],
							},
						},
					},
					theme: {
						dark: {
							icon: {
								class: [],
							},
							root: {
								class: [],
							},
						},
					},
				},
				tokens: {
					default: {
						spacing: {
							medium: [],
						},
						color: {
							purple: [],
						},
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
					variant: [],
					group: {},
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
							root: {
								class: [
									"special-light",
									"btn-light",
									"theme-light",
								],
							},
							icon: {
								class: [
									"special-icon-light",
									"icon-light",
								],
							},
							badge: {
								class: [
									"badge-light",
								],
							},
						},
						dark: {
							root: {
								class: [
									"special-dark",
									"btn-dark",
									"theme-dark",
								],
							},
							icon: {
								class: [
									"special-icon-dark",
									"icon-dark",
								],
							},
							badge: {
								class: [
									"badge-dark",
								],
							},
						},
					},
					size: {
						sm: {
							root: {
								class: [
									"special-sm",
									"btn-sm",
								],
							},
							icon: {
								class: [
									"icon-sm",
								],
							},
							badge: {
								class: [
									"badge-sm",
								],
							},
						},
						lg: {
							root: {
								class: [
									"special-lg",
									"btn-lg",
								],
							},
							icon: {
								class: [
									"icon-lg",
								],
							},
							badge: {
								class: [
									"badge-lg",
								],
							},
						},
					},
					special: {
						primary: {
							root: {
								class: [
									"variant-primary",
								],
							},
							badge: {
								class: [
									"badge-primary",
								],
							},
						},
						danger: {
							root: {
								class: [
									"variant-danger",
								],
							},
							badge: {
								class: [
									"badge-danger",
								],
							},
						},
					},
				},
				tokens: {},
				defaults: {
					theme: "light",
					size: "sm",
					special: "primary",
				},
			},
		);

		// Test Level 1: Design System Foundation
		const foundationInstance = designSystemCls.create({
			// required
			tokens: "default",
			// optional variants as they're already required in cls
			variants: {
				theme: "light",
			},
			// appending object for slots keys/value: ClassName
			// This is applied right after the whole "cls" is processed (takes precedence)
			slots: {
				root: {
					class: [
						"ClassName",
					],
				},
			},
		});
		expect(foundationInstance.slots.root).toBe(
			"ds-component text-gray-900 theme-light p-2 ClassName",
		);

		// Test Level 2: Button Component
		const buttonDefaultInstance = buttonCls.create({
			tokens: "default",
		});
		const buttonCustomInstance = buttonCls.create({
			tokens: "default",
			variants: {
				size: "lg",
				theme: "dark",
			},
		});

		expect(buttonDefaultInstance.slots.root).toBe("ds-component btn");
		expect(buttonDefaultInstance.slots.icon).toBe("btn-icon");

		expect(buttonCustomInstance.slots.root).toBe("ds-component btn");
		expect(buttonCustomInstance.slots.icon).toBe("btn-icon");

		// Test Level 3: Special Button Component
		const specialDefaultInstance = specialButtonCls.create({
			tokens: "extra",
		});
		const specialCustomInstance = specialButtonCls.create({
			tokens: "extra",
			variants: {
				size: "lg",
				theme: "dark",
				special: "danger",
			},
		});

		expect(specialDefaultInstance.slots.root).toBe(
			"ds-component btn special-btn special-light btn-light theme-light special-sm btn-sm variant-primary",
		);
		expect(specialDefaultInstance.slots.icon).toBe(
			"btn-icon special-icon special-icon-light icon-light icon-sm",
		);
		expect(specialDefaultInstance.slots.badge).toBe(
			"badge badge-light badge-sm badge-primary",
		);

		expect(specialCustomInstance.slots.root).toBe(
			"ds-component btn special-btn special-dark btn-dark theme-dark special-lg btn-lg variant-danger",
		);
		expect(specialCustomInstance.slots.icon).toBe(
			"btn-icon special-icon special-icon-dark icon-dark icon-lg",
		);
		expect(specialCustomInstance.slots.badge).toBe(
			"badge badge-dark badge-lg badge-danger",
		);
	});
});
