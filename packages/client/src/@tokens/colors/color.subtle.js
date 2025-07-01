import { attributes } from "../attributes/variable.js";

export default {
	color: {
		subtle: {
			text: {
				default: {
					value: "var(--color-blue-500)",
					attributes,
				},
				hover: {
					value: "var(--color-blue-600)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-blue-50)",
					attributes,
				},
				hover: {
					value: "var(--color-blue-100)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-blue-100)",
					attributes,
				},
				hover: {
					value: "var(--color-blue-200)",
					attributes,
				},
			},
			shadow: {
				default: {
					value: "var(--color-blue-200)",
					attributes,
				},
				hover: {
					value: "var(--color-blue-400)",
					attributes,
				},
			},
		},
	},
};
