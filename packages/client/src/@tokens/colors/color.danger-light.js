import { attributes } from "../attributes/variable.js";

export default {
	color: {
		"danger-light": {
			text: {
				default: {
					value: "var(--color-red-500)",
					attributes,
				},
				hover: {
					value: "var(--color-red-700)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "transparent",
					attributes,
				},
				hover: {
					value: "var(--color-red-100)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-red-600)",
					attributes,
				},
				hover: {
					value: "var(--color-red-700)",
					attributes,
				},
			},
			shadow: {
				default: {
					value: "var(--color-red-200)",
					attributes,
				},
				hover: {
					value: "var(--color-red-400)",
					attributes,
				},
			},
		},
	},
};
