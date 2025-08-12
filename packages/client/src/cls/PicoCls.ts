import { cls } from "@use-pico/cls";

/**
 * Root theme configuration for Pico, all components
 * will inherit from this theme.
 */
export const PicoCls = cls(
	{
		tokens: {
			"primary.color": [
				"text-light",
				"text-dark",
				//
				"bg-light",
				"bg-dark",
				//
				"border-light",
				"border-dark",
				//
				"shadow-light",
				"shadow-dark",
			],
			//
			"secondary.color": [
				"text-light",
				"text-dark",
				//
				"bg-light",
				"bg-dark",
				//
				"border-light",
				"border-dark",
				//
				"shadow-light",
				"shadow-dark",
			],
			//
			"danger.color": [
				"text-light",
				"text-dark",
				//
				"bg-light",
				"bg-dark",
				//
				"border-light",
				"border-dark",
				//
				"shadow-light",
				"shadow-dark",
			],
			//
			"neutral.color": [
				"text-light",
				"text-dark",
				//
				"bg-light",
				"bg-dark",
				//
				"border-light",
				"border-dark",
				//
				"shadow-light",
				"shadow-dark",
			],
			//
			"subtle.color": [
				"text-light",
				"text-dark",
				//
				"bg-light",
				"bg-dark",
				//
				"border-light",
				"border-dark",
				//
				"shadow-light",
				"shadow-dark",
			],
			round: [
				"sm",
				"md",
				"lg",
			],
			shadow: [
				"sm",
			],
			"focus.reset": [
				"off",
			],
		},
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: def.token({
			"primary.color": {
				"text-light": [
					"text-indigo-50",
					"hover:text-indigo-100",
				],
				"text-dark": [
					"text-indigo-600",
					"hover:text-indigo-700",
				],
				//
				"bg-light": [
					"bg-indigo-50",
					"hover:bg-indigo-100",
				],
				"bg-dark": [
					"bg-indigo-600",
					"hover:bg-indigo-700",
				],
				//
				"border-light": [
					"border-indigo-200",
					"hover:border-indigo-300",
				],
				"border-dark": [
					"border-indigo-700",
					"hover:border-indigo-800",
				],
				//
				"shadow-light": [
					"shadow-indigo-200",
					"hover:shadow-indigo-300",
				],
				"shadow-dark": [
					"shadow-indigo-600",
					"hover:shadow-indigo-800",
				],
			},
			//
			"secondary.color": {
				"text-light": [
					"text-emerald-50",
					"hover:text-emerald-100",
				],
				"text-dark": [
					"text-emerald-600",
					"hover:text-emerald-700",
				],
				//
				"bg-light": [
					"bg-emerald-50",
					"hover:bg-emerald-100",
				],
				"bg-dark": [
					"bg-emerald-600",
					"hover:bg-emerald-700",
				],
				//
				"border-light": [
					"border-emerald-200",
					"hover:border-emerald-300",
				],
				"border-dark": [
					"border-emerald-700",
					"hover:border-emerald-800",
				],
				//
				"shadow-light": [
					"shadow-emerald-200",
					"hover:shadow-emerald-300",
				],
				"shadow-dark": [
					"shadow-emerald-600",
					"hover:shadow-emerald-800",
				],
			},
			//
			"danger.color": {
				"text-light": [
					"text-rose-50",
					"hover:text-rose-100",
				],
				"text-dark": [
					"text-rose-600",
					"hover:text-rose-700",
				],
				//
				"bg-light": [
					"bg-rose-50",
					"hover:bg-rose-100",
				],
				"bg-dark": [
					"bg-rose-600",
					"hover:bg-rose-700",
				],
				//
				"border-light": [
					"border-rose-200",
					"hover:border-rose-300",
				],
				"border-dark": [
					"border-rose-700",
					"hover:border-rose-800",
				],
				//
				"shadow-light": [
					"shadow-rose-200",
					"hover:shadow-rose-300",
				],
				"shadow-dark": [
					"shadow-rose-600",
					"hover:shadow-rose-800",
				],
			},
			//
			"neutral.color": {
				"text-light": [
					"text-zinc-600",
					"hover:text-zinc-700",
				],
				"text-dark": [
					"text-zinc-900",
					"hover:text-black",
				],
				//
				"bg-light": [
					"bg-zinc-50",
					"hover:bg-zinc-100",
				],
				"bg-dark": [
					"bg-zinc-200",
					"hover:bg-zinc-300",
				],
				//
				"border-light": [
					"border-zinc-300",
					"hover:border-zinc-400",
				],
				"border-dark": [
					"border-zinc-500",
					"hover:border-zinc-600",
				],
				//
				"shadow-light": [
					"shadow-zinc-100",
					"hover:shadow-zinc-200",
				],
				"shadow-dark": [
					"shadow-zinc-600",
					"hover:shadow-zinc-800",
				],
			},
			//
			"subtle.color": {
				"text-light": [
					"text-sky-600",
					"hover:text-sky-700",
				],
				"text-dark": [
					"text-sky-900",
					"hover:text-black",
				],
				//
				"bg-light": [
					"bg-sky-50",
					"hover:bg-sky-100",
				],
				"bg-dark": [
					"bg-sky-200",
					"hover:bg-sky-300",
				],
				//
				"border-light": [
					"border-sky-300",
					"hover:border-sky-400",
				],
				"border-dark": [
					"border-sky-500",
					"hover:border-sky-600",
				],
				//
				"shadow-light": [
					"shadow-sky-100",
					"hover:shadow-sky-200",
				],
				"shadow-dark": [
					"shadow-sky-600",
					"hover:shadow-sky-800",
				],
			},
			//
			round: {
				sm: [
					"rounded-sm",
				],
				md: [
					"rounded-md",
				],
				lg: [
					"rounded-lg",
				],
			},
			//
			shadow: {
				sm: [
					"shadow-sm",
				],
			},
			"focus.reset": {
				off: [
					"outline-none",
					"focus:outline-none",
					"focus-visible:outline-none",
					"ring-0",
					"focus:ring-0",
					"focus:ring-transparent",
					"focus-visible:ring-0",
					"focus-visible:ring-transparent",
				],
			},
		}),
		rules: [],
		defaults: def.defaults({}),
	}),
);
