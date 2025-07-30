import { attributes } from "../attributes/variable.js";

export default {
	color: {
		secondary: {
			text: {
				default: {
					value: "var(--color-green-50)",
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
					value: "var(--color-green-700)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-green-700)",
					attributes,
				},
				hover: {
					value: "var(--color-green-800)",
					attributes,
				},
			},
			shadow: {
				default: {
					value: "var(--color-slate-400)",
					attributes,
				},
				hover: {
					value: "var(--color-slate-700)",
					attributes,
				},
			},
		},
	},
};
