import { attributes } from "../attributes/variable.js";

export default {
	color: {
		primary: {
			text: {
				default: {
					value: "var(--color-blue-50)",
					attributes,
				},
				hover: {
					value: "var(--color-blue-100)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-blue-500)",
					attributes,
				},
				hover: {
					value: "var(--color-blue-600)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-blue-700)",
					attributes,
				},
				hover: {
					value: "var(--color-blue-700)",
					attributes,
				},
			},
			shadow: {
				default: {
					value: "var(--color-slate-600)",
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
