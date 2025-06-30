import { attributes } from "./attributes/variable.js";

export default {
	color: {
		secondary: {
			text: {
				default: {
					value: "var(--color-green-100)",
					attributes,
				},
				hover: {
					value: "var(--color-green-100)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-green-600)",
					attributes,
				},
				hover: {
					value: "var(--color-green-500)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-green-700)",
					attributes,
				},
				hover: {
					value: "var(--color-green-600)",
					attributes,
				},
			},
			shadow: {
				default: {
					value: "var(--color-sky-200)",
					attributes,
				},
				hover: {
					value: "var(--color-sky-400)",
					attributes,
				},
			},
		},
	},
};
