import { attributes } from "./attributes/variable.js";

export default {
	color: {
		warning: {
			text: {
				default: {
					value: "var(--color-amber-600)",
					attributes,
				},
				hover: {
					value: "var(--color-amber-700)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-amber-100)",
					attributes,
				},
				hover: {
					value: "var(--color-amber-200)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-amber-600)",
					attributes,
				},
				hover: {
					value: "var(--color-amber-500)",
					attributes,
				},
			},
			shadow: {
				default: {
					value: "var(--color-amber-200)",
					attributes,
				},
				hover: {
					value: "var(--color-amber-400)",
					attributes,
				},
			},
		},
	},
};
