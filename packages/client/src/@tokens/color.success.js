import { attributes } from "./attributes/variable.js";

export default {
	color: {
		success: {
			text: {
				default: {
					value: "var(--color-emerald-100)",
					attributes,
				},
				hover: {
					value: "var(--color-emerald-100)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-emerald-500)",
					attributes,
				},
				hover: {
					value: "var(--color-emerald-400)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-emerald-600)",
					attributes,
				},
				hover: {
					value: "var(--color-emerald-500)",
					attributes,
				},
			},
			shadow: {
				default: {
					value: "var(--color-emerald-200)",
					attributes,
				},
				hover: {
					value: "var(--color-emerald-400)",
					attributes,
				},
			},
		},
	},
};
