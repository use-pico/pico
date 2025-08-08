import { token } from "@use-pico/cls";

export const PicoCls = token({
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
	token: {
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
	},
});
