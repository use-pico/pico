import { cls } from "@use-pico/cls";

/**
 * Root theme configuration for Pico, all components
 * will inherit from this theme.
 */
export const PicoCls = cls(
	{
		tokens: {
			"primary.color": [
				"text",
			],
			shadow: [
				"default",
				"foo",
			],
		},
		slot: [],
		variant: {},
	},
	({ def }) => ({
		token: def.token({
			"primary.color": {
				text: [
					"text-blue-600",
					"hover:text-blue-700",
				],
			},
			shadow: {
				default: [
					"shadow-sm",
				],
			},
		}),
		rules: [],
		defaults: def.defaults({}),
	}),
);
