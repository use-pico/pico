import { attributes } from "./attributes/variable.js";

export default {
	color: {
		ui: {
			text: {
				default: {
					value: "var(--color-slate-500)",
					attributes,
				},
				hover: {
					value: "var(--color-blue-500)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-slate-50)",
					attributes,
				},
				hover: {
					value: "var(--color-slate-100)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-slate-300)",
					attributes,
				},
			},
		},
	},
};
