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
				"text-light-hover",
				"text-dark",
				"text-dark-hover",
				//
				"bg-light",
				"bg-light-hover",
				"bg-dark",
				"bg-dark-hover",
				//
				"border-light",
				"border-light-hover",
				"border-dark",
				"border-dark-hover",
				//
				"shadow-light",
				"shadow-light-hover",
				"shadow-dark",
				"shadow-dark-hover",
			],
			//
			"secondary.color": [
				"text-light",
				"text-light-hover",
				"text-dark",
				"text-dark-hover",
				//
				"bg-light",
				"bg-light-hover",
				"bg-dark",
				"bg-dark-hover",
				//
				"border-light",
				"border-light-hover",
				"border-dark",
				"border-dark-hover",
				//
				"shadow-light",
				"shadow-light-hover",
				"shadow-dark",
				"shadow-dark-hover",
			],
			//
			"danger.color": [
				"text-light",
				"text-light-hover",
				"text-dark",
				"text-dark-hover",
				//
				"bg-light",
				"bg-light-hover",
				"bg-dark",
				"bg-dark-hover",
				//
				"border-light",
				"border-light-hover",
				"border-dark",
				"border-dark-hover",
				//
				"shadow-light",
				"shadow-light-hover",
				"shadow-dark",
				"shadow-dark-hover",
			],
			//
			"neutral.color": [
				"text-light",
				"text-light-hover",
				"text-dark",
				"text-dark-hover",
				//
				"bg-light",
				"bg-light-hover",
				"bg-dark",
				"bg-dark-hover",
				//
				"border-light",
				"border-light-hover",
				"border-dark",
				"border-dark-hover",
				//
				"shadow-light",
				"shadow-light-hover",
				"shadow-dark",
				"shadow-dark-hover",
			],
			//
			"subtle.color": [
				"text-light",
				"text-light-hover",
				"text-dark",
				"text-dark-hover",
				//
				"bg-light",
				"bg-light-hover",
				"bg-dark",
				"bg-dark-hover",
				//
				"border-light",
				"border-light-hover",
				"border-dark",
				"border-dark-hover",
				//
				"shadow-light",
				"shadow-light-hover",
				"shadow-dark",
				"shadow-dark-hover",
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
				],
				"text-light-hover": [
					"hover:text-indigo-100",
				],
				"text-dark": [
					"text-indigo-600",
				],
				"text-dark-hover": [
					"hover:text-indigo-700",
				],
				//
				"bg-light": [
					"bg-indigo-50",
				],
				"bg-light-hover": [
					"hover:bg-indigo-100",
				],
				"bg-dark": [
					"bg-indigo-600",
				],
				"bg-dark-hover": [
					"hover:bg-indigo-700",
				],
				//
				"border-light": [
					"border-indigo-200",
				],
				"border-light-hover": [
					"hover:border-indigo-300",
				],
				"border-dark": [
					"border-indigo-700",
				],
				"border-dark-hover": [
					"hover:border-indigo-800",
				],
				//
				"shadow-light": [
					"shadow-indigo-200",
				],
				"shadow-light-hover": [
					"hover:shadow-indigo-300",
				],
				"shadow-dark": [
					"shadow-indigo-600",
				],
				"shadow-dark-hover": [
					"hover:shadow-indigo-800",
				],
			},
			//
			"secondary.color": {
				"text-light": [
					"text-emerald-50",
				],
				"text-light-hover": [
					"hover:text-emerald-100",
				],
				"text-dark": [
					"text-emerald-600",
				],
				"text-dark-hover": [
					"hover:text-emerald-700",
				],
				//
				"bg-light": [
					"bg-emerald-50",
				],
				"bg-light-hover": [
					"hover:bg-emerald-100",
				],
				"bg-dark": [
					"bg-emerald-600",
				],
				"bg-dark-hover": [
					"hover:bg-emerald-700",
				],
				//
				"border-light": [
					"border-emerald-200",
				],
				"border-light-hover": [
					"hover:border-emerald-300",
				],
				"border-dark": [
					"border-emerald-700",
				],
				"border-dark-hover": [
					"hover:border-emerald-800",
				],
				//
				"shadow-light": [
					"shadow-emerald-200",
				],
				"shadow-light-hover": [
					"hover:shadow-emerald-300",
				],
				"shadow-dark": [
					"shadow-emerald-600",
				],
				"shadow-dark-hover": [
					"hover:shadow-emerald-800",
				],
			},
			//
			"danger.color": {
				"text-light": [
					"text-rose-50",
				],
				"text-light-hover": [
					"hover:text-rose-100",
				],
				"text-dark": [
					"text-rose-600",
				],
				"text-dark-hover": [
					"hover:text-rose-700",
				],
				//
				"bg-light": [
					"bg-rose-50",
				],
				"bg-light-hover": [
					"hover:bg-rose-100",
				],
				"bg-dark": [
					"bg-rose-600",
				],
				"bg-dark-hover": [
					"hover:bg-rose-700",
				],
				//
				"border-light": [
					"border-rose-200",
				],
				"border-light-hover": [
					"hover:border-rose-300",
				],
				"border-dark": [
					"border-rose-700",
				],
				"border-dark-hover": [
					"hover:border-rose-800",
				],
				//
				"shadow-light": [
					"shadow-rose-200",
				],
				"shadow-light-hover": [
					"hover:shadow-rose-300",
				],
				"shadow-dark": [
					"shadow-rose-600",
				],
				"shadow-dark-hover": [
					"hover:shadow-rose-800",
				],
			},
			//
			"neutral.color": {
				"text-light": [
					"text-zinc-600",
				],
				"text-light-hover": [
					"hover:text-zinc-700",
				],
				"text-dark": [
					"text-zinc-900",
				],
				"text-dark-hover": [
					"hover:text-black",
				],
				//
				"bg-light": [
					"bg-zinc-50",
				],
				"bg-light-hover": [
					"hover:bg-zinc-100",
				],
				"bg-dark": [
					"bg-zinc-200",
				],
				"bg-dark-hover": [
					"hover:bg-zinc-300",
				],
				//
				"border-light": [
					"border-zinc-300",
				],
				"border-light-hover": [
					"hover:border-zinc-400",
				],
				"border-dark": [
					"border-zinc-500",
				],
				"border-dark-hover": [
					"hover:border-zinc-600",
				],
				//
				"shadow-light": [
					"shadow-zinc-100",
				],
				"shadow-light-hover": [
					"hover:shadow-zinc-200",
				],
				"shadow-dark": [
					"shadow-zinc-600",
				],
				"shadow-dark-hover": [
					"hover:shadow-zinc-800",
				],
			},
			//
			"subtle.color": {
				"text-light": [
					"text-sky-600",
				],
				"text-light-hover": [
					"hover:text-sky-700",
				],
				"text-dark": [
					"text-sky-900",
				],
				"text-dark-hover": [
					"hover:text-black",
				],
				//
				"bg-light": [
					"bg-sky-50",
				],
				"bg-light-hover": [
					"hover:bg-sky-100",
				],
				"bg-dark": [
					"bg-sky-200",
				],
				"bg-dark-hover": [
					"hover:bg-sky-300",
				],
				//
				"border-light": [
					"border-sky-300",
				],
				"border-light-hover": [
					"hover:border-sky-400",
				],
				"border-dark": [
					"border-sky-500",
				],
				"border-dark-hover": [
					"hover:border-sky-600",
				],
				//
				"shadow-light": [
					"shadow-sky-100",
				],
				"shadow-light-hover": [
					"hover:shadow-sky-200",
				],
				"shadow-dark": [
					"shadow-sky-600",
				],
				"shadow-dark-hover": [
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
