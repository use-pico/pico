import { cls } from "@use-pico/cls";

export const PicoCls = cls(
	{
		slot: [],
		variant: {},
		tokens: {
			color: {
				variant: [
					"primary",
					"secondary",
				],
				group: [
					"textColor",
					"textHoverColor",
					"bgColor",
					"bgHoverColor",
				],
			},
            size: [
                variant: [
                    'sm',
                    'md',
                ],
                group: ['size']
            ]
		},
	},
	{
		defaults: {},
		slot: {},
		tokens: {},
	},
);
