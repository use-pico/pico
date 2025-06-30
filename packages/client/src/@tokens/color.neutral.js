import { attributes } from "./attributes/variable.js";

export default {
	color: {
		neutral: {
			text: {
				default: {
					value: "var(--color-slate-500)",
					attributes,
				},
				hover: {
					value: "var(--color-slate-600)",
					attributes,
				},
			},
			bg: {
				default: {
					value: "var(--color-slate-100)",
					attributes,
				},
				hover: {
					value: "var(--color-slate-200)",
					attributes,
				},
			},
			border: {
				default: {
					value: "var(--color-slate-300)",
					attributes,
				},
				hover: {
					value: "var(--color-slate-400)",
					attributes,
				},
			},
			shadow: {
				default: {
					value: "var(--color-slate-200)",
					attributes,
				},
				hover: {
					value: "var(--color-slate-400)",
					attributes,
				},
			},
		},
	},
};
