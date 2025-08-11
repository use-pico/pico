import { cls } from "@use-pico/cls";

export const PicoCls = cls(
	{
		tokens: {
			"color.text": [
				"default",
				"hover",
			],
			"color.bg": [
				"default",
				"hover",
			],
			size: [
				"sm",
				"md",
			],
		},
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: def.token({
			"color.text": {
				default: [
					"text-(--pico-text-default)",
				],
				hover: [
					"text-(--pico-text-hover)",
				],
			},
			"color.bg": {
				default: [
					"bg-(--pico-bg-default)",
				],
				hover: [
					"bg-(--pico-bg-hover)",
				],
			},
			size: {
				sm: [
					"text-sm",
				],
				md: [
					"text-base",
				],
			},
		}),
		rules: [],
		defaults: def.defaults({}),
	}),
);
