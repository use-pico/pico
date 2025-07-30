import { attributes } from "../attributes/variable.js";

export default {
	color: {
		danger: {
			text: {
				default: {
					value: "var(--color-red-50)",
					attributes,
				},
				hover: {
					value: "var(--color-red-100)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-red-500)",
					attributes,
				},
				hover: {
					value: "var(--color-red-600)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-red-700)",
					attributes,
				},
				hover: {
					value: "var(--color-red-800)",
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
