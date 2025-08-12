import { cls } from "@use-pico/cls";

// TODO Keep tones small
// TODO Add tokens for common components, e.g. table, button, etc.

const toneType = [
	"text-light",
	"text-light-hover",
	//
	"bg-light",
	"bg-light-hover",
	"bg-light-odd",
	"bg-light-odd-hover",
	//
	"border-light",
	"border-light-hover",
	"border-light-odd",
	"border-light-odd-hover",
	//
	"shadow-light",
	"shadow-light-hover",
	//
	//
	//
	"text-dark",
	"text-dark-hover",
	//
	"bg-dark",
	"bg-dark-hover",
	"bg-dark-odd",
	"bg-dark-odd-hover",
	//
	"border-dark",
	"border-dark-hover",
	"border-dark-odd",
	"border-dark-odd-hover",
	//
	"shadow-dark",
	"shadow-dark-hover",
] as const;

/**
 * Root theme configuration for Pico, all components
 * will inherit from this theme.
 */
export const PicoCls = cls(
	{
		tokens: {
            "primary.color": toneType,
			"secondary.color": toneType,
			"danger.color": toneType,
			"neutral.color": toneType,
			"subtle.color": toneType,
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
				"bg-light-odd": [
					"odd:bg-indigo-100",
				],
				"bg-light-odd-hover": [
					"odd:hover:bg-indigo-200",
				],
				"bg-dark": [
					"bg-indigo-600",
				],
				"bg-dark-hover": [
					"hover:bg-indigo-700",
				],
				"bg-dark-odd": [
					"odd:bg-indigo-700",
				],
				"bg-dark-odd-hover": [
					"odd:hover:bg-indigo-800",
				],
				//
				"border-light": [
					"border-indigo-200",
				],
				"border-light-hover": [
					"hover:border-indigo-300",
				],
				"border-light-odd": [
					"odd:border-indigo-300",
				],
				"border-light-odd-hover": [
					"odd:hover:border-indigo-400",
				],
				"border-dark": [
					"border-indigo-700",
				],
				"border-dark-hover": [
					"hover:border-indigo-800",
				],
				"border-dark-odd": [
					"odd:border-indigo-800",
				],
				"border-dark-odd-hover": [
					"odd:hover:border-indigo-900",
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
				"bg-light-odd": [
					"odd:bg-emerald-100",
				],
				"bg-light-odd-hover": [
					"odd:hover:bg-emerald-200",
				],
				"bg-dark": [
					"bg-emerald-600",
				],
				"bg-dark-hover": [
					"hover:bg-emerald-700",
				],
				"bg-dark-odd": [
					"odd:bg-emerald-700",
				],
				"bg-dark-odd-hover": [
					"odd:hover:bg-emerald-800",
				],
				//
				"border-light": [
					"border-emerald-200",
				],
				"border-light-hover": [
					"hover:border-emerald-300",
				],
				"border-light-odd": [
					"odd:border-emerald-300",
				],
				"border-light-odd-hover": [
					"odd:hover:border-emerald-400",
				],
				"border-dark": [
					"border-emerald-700",
				],
				"border-dark-hover": [
					"hover:border-emerald-800",
				],
				"border-dark-odd": [
					"odd:border-emerald-800",
				],
				"border-dark-odd-hover": [
					"odd:hover:border-emerald-900",
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
				"bg-light-odd": [
					"odd:bg-rose-100",
				],
				"bg-light-odd-hover": [
					"odd:hover:bg-rose-200",
				],
				"bg-dark": [
					"bg-rose-600",
				],
				"bg-dark-hover": [
					"hover:bg-rose-700",
				],
				"bg-dark-odd": [
					"odd:bg-rose-700",
				],
				"bg-dark-odd-hover": [
					"odd:hover:bg-rose-800",
				],
				//
				"border-light": [
					"border-rose-200",
				],
				"border-light-hover": [
					"hover:border-rose-300",
				],
				"border-light-odd": [
					"odd:border-rose-300",
				],
				"border-light-odd-hover": [
					"odd:hover:border-rose-400",
				],
				"border-dark": [
					"border-rose-700",
				],
				"border-dark-hover": [
					"hover:border-rose-800",
				],
				"border-dark-odd": [
					"odd:border-rose-800",
				],
				"border-dark-odd-hover": [
					"odd:hover:border-rose-900",
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
					"text-zinc-50",
				],
				"text-light-hover": [
					"hover:text-zinc-100",
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
				"bg-light-odd": [
					"odd:bg-zinc-100",
				],
				"bg-light-odd-hover": [
					"odd:hover:bg-zinc-200",
				],
				"bg-dark": [
					"bg-zinc-200",
				],
				"bg-dark-hover": [
					"hover:bg-zinc-300",
				],
				"bg-dark-odd": [
					"odd:bg-zinc-300",
				],
				"bg-dark-odd-hover": [
					"odd:hover:bg-zinc-400",
				],
				//
				"border-light": [
					"border-zinc-300",
				],
				"border-light-hover": [
					"hover:border-zinc-400",
				],
				"border-light-odd": [
					"odd:border-zinc-400",
				],
				"border-light-odd-hover": [
					"odd:hover:border-zinc-500",
				],
				"border-dark": [
					"border-zinc-500",
				],
				"border-dark-hover": [
					"hover:border-zinc-600",
				],
				"border-dark-odd": [
					"odd:border-zinc-600",
				],
				"border-dark-odd-hover": [
					"odd:hover:border-zinc-700",
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
					"text-sky-50",
				],
				"text-light-hover": [
					"hover:text-sky-100",
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
				"bg-light-odd": [
					"odd:bg-sky-100",
				],
				"bg-light-odd-hover": [
					"odd:hover:bg-sky-200",
				],
				"bg-dark-odd": [
					"odd:bg-sky-300",
				],
				"bg-dark-odd-hover": [
					"odd:hover:bg-sky-400",
				],
				//
				"border-light": [
					"border-sky-300",
				],
				"border-light-hover": [
					"hover:border-sky-400",
				],
				"border-light-odd": [
					"odd:border-sky-400",
				],
				"border-light-odd-hover": [
					"odd:hover:border-sky-500",
				],
				"border-dark": [
					"border-sky-500",
				],
				"border-dark-hover": [
					"hover:border-sky-600",
				],
				"border-dark-odd": [
					"odd:border-sky-600",
				],
				"border-dark-odd-hover": [
					"odd:hover:border-sky-700",
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
