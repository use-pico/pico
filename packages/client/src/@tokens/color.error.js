import { attributes } from "./attributes/variable.js";

export default {
	color: {
		error: {
			text: {
				default: {
					value: "var(--color-red-600)",
					attributes,
				},
				hover: {
					value: "var(--color-red-700)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-red-100)",
					attributes,
				},
				hover: {
					value: "var(--color-red-200)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-red-600)",
					attributes,
				},
				hover: {
					value: "var(--color-red-500)",
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
