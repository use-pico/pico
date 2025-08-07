import { describe, it } from "bun:test";
import { cls } from "../src";

describe("TDD", () => {
	it("Just Showcase", () => {
		const PicoCls = cls(
			{
				tokens: [
					// === Primary ===
					"primary.textColor.default",
					"primary.textColor.hover",
					"primary.textColor.disabled",
					"primary.borderColor.default",
					"primary.borderColor.hover",
					"primary.borderColor.disabled",
					"primary.bgColor.default",
					"primary.bgColor.hover",
					"primary.bgColor.disabled",
					"primary.shadowColor.default",
					"primary.shadowColor.hover",
					"primary.shadowColor.disabled",

					// === Secondary ===
					"secondary.textColor.default",
					"secondary.textColor.hover",
					"secondary.textColor.disabled",
					"secondary.borderColor.default",
					"secondary.borderColor.hover",
					"secondary.borderColor.disabled",
					"secondary.bgColor.default",
					"secondary.bgColor.hover",
					"secondary.bgColor.disabled",
					"secondary.shadowColor.default",
					"secondary.shadowColor.hover",
					"secondary.shadowColor.disabled",
				],
				slot: [],
				variant: {},
			},
			{
				tokens: {
					"primary.textColor.default": [
						"text-blue-600",
					],
					"secondary.textColor.default": [
						"text-red-600",
					],
				},
			},
		);

		const ButtonCls = PicoCls.use(
			{
				tokens: [],
				slot: [
					"base",
				],
				variant: {
					variant: [
						"primary",
						"secondary",
						// "danger",
						// "danger-light",
						// "subtle",
						// "light",
						// "neutral",
					],
					disabled: [
						"true",
						"false",
					],
					size: [
						"xs",
						"sm",
						"md",
						// "lg",
						// "xl",
					],
					borderless: [
						"true",
						"false",
					],
				},
			},
			{
				slot: {
					base: {
						class: [
							[
								"flex",
								"flex-row",
								"items-center",
								"justify-center",
								"gap-2",
								"group",
								"rounded-md",
								"transition-all",
								"cursor-pointer",
								"border",
								"shadow-sm",
								// CSS Variables
								"bg-(--pico-color-bg-default)",
								"hover:bg-(--pico-color-bg-hover)",
								//
								"border-(--pico-color-border-default)",
								"hover:border-(--pico-color-border-hover)",
								//
								"text-(--pico-color-text-default)",
								"hover:text-(--pico-color-text-hover)",
								//
								"shadow-(color:--pico-color-shadow-default)",
								"hover:shadow-(color:--pico-color-shadow-hover)",
							],
						],
					},
				},
				variant: {
					"variant.primary.base": {
						class: [
							"",
						],
						token: [],
					},

					variant: {
						primary: {
							base: {
								token: [
									"primary.textColor.default",
									"primary.textColor.hover",
								],
							},
						},
						secondary: {
							base: {
								token: [
									"secondary.textColor.default",
									"secondary.textColor.hover",
								],
							},
						},
						// primary: [
						// 	"pico--button-color-primary",
						// ],
						// secondary: [
						// 	"pico--button-color-secondary",
						// ],
						// danger: [
						// 	"pico--button-color-danger",
						// ],
						// "danger-light": [
						// 	"pico--button-color-danger-light",
						// ],
						// subtle: [
						// 	"pico--button-color-subtle",
						// ],
						// light: [
						// 	"pico--button-color-light",
						// ],
						// neutral: [
						// 	"pico--button-color-neutral",
						// ],
					},
					disabled: {
						true: {
							base: {
								class: [
									"cursor-not-allowed",
									"opacity-50",
									"hover:opacity-50",
								],
							},
						},
						false: {},
					},
					// size: {
					// 	xs: [
					// 		"py-0.5",
					// 		"px-1",
					// 	],
					// 	sm: [
					// 		"py-1",
					// 		"px-2",
					// 	],
					// 	md: [
					// 		"py-2",
					// 		"px-4",
					// 	],
					// 	lg: [
					// 		"py-3",
					// 		"px-6",
					// 	],
					// 	xl: [
					// 		"py-4",
					// 		"px-8",
					// 	],
					// },
					// borderless: {
					// 	true: [
					// 		"border-none",
					// 	],
					// },
				},
				match: [
					{
						if: {
							variant: "primary",
							disabled: "true",
						},
						do: {
							base: {
								token: [
									"default.textColor.hover",
									"default.bgColor.hover",
									"default.borderColor.hover",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
					disabled: "false",
					size: "md",
					borderless: "false",
				},
			},
		);
	});
});
