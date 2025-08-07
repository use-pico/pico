import { cls } from "@use-pico/cls";

export const ButtonCls = cls(
	{
		tokens: {
			"primary.textColor": [
				"default",
				"hover",
			],

			primary: {
				textColor: [
					"default",
					"hover",
				],
			},
			secondary: {
				textColor: [
					"default",
					"hover",
				],
			},
		},
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
		tokens: {
			"button.primary.text.color.hover": [
				"text-blue-600",
			],
		},
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

export namespace ButtonCls {
	export type Props<P = unknown> = ClsProps<typeof ButtonCls, P>;
}
