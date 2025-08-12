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
			round: [
				"sm",
				"md",
				"lg",
			],
			shadow: [
				"sm",
			],
		},
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: def.token({
			"primary.color": {
				"text-light": [
					"text-blue-100",
					"hover:text-blue-200",
				],
				"text-dark": [
					"text-blue-600",
					"hover:text-blue-700",
				],
				//
				"bg-light": [
					"bg-blue-50",
					"hover:bg-blue-100",
				],
				"bg-dark": [
					"bg-blue-600",
					"hover:bg-blue-700",
				],
				//
				"border-light": [
					"border-blue-200",
					"hover:border-blue-300",
				],
				"border-dark": [
					"border-blue-700",
					"hover:border-blue-800",
				],
				//
				"shadow-light": [
					"shadow-blue-800",
					"hover:shadow-blue-200",
				],
				"shadow-dark": [
					"shadow-blue-200",
					"hover:shadow-blue-500",
				],
			},
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
			shadow: {
				sm: [
					"shadow-sm",
					"hover:shadow-md",
				],
			},
		}),
		rules: [],
		defaults: def.defaults({}),
	}),
);
