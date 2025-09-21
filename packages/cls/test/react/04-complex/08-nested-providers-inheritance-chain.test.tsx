import { render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	TokenContext,
	TweakProvider,
	useCls,
	withCls,
} from "../../../src";

// Level 1: Base foundation
const Level1 = contract()
	.tokens([
		"base",
		"foundation",
	])
	.slots([
		"root",
	])
	.variant("type", [
		"primary",
		"secondary",
	])
	.def()
	.token({
		base: {
			class: [
				"BASE",
			],
		},
		foundation: {
			class: [
				"FOUNDATION",
			],
		},
	})
	.root({
		root: {
			token: [
				"base",
			],
			class: [
				"L1",
			],
		},
	})
	.match("type", "primary", {
		root: {
			class: [
				"L1-PRIMARY",
			],
		},
	})
	.defaults({
		type: "primary",
	})
	.cls();

// Level 2: Adds structure
const Level2 = Level1.extend(
	{
		tokens: [
			"structure",
		],
		slot: [
			"header",
			"body",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
		},
	},
	{
		token: {
			structure: {
				token: [
					"foundation",
				],
				class: [
					"STRUCTURE",
				],
			},
		},
		rules: [
			{
				slot: {
					header: {
						token: [
							"structure",
						],
						class: [
							"L2-HEADER",
						],
					},
					body: {
						token: [
							"base",
						],
						class: [
							"L2-BODY",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
		},
	},
);

// Level 3: Adds navigation
const Level3 = Level2.extend(
	{
		tokens: [
			"navigation",
		],
		slot: [
			"nav",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
		},
	},
	{
		token: {
			navigation: {
				token: [
					"structure",
				],
				class: [
					"NAVIGATION",
				],
			},
		},
		rules: [
			{
				slot: {
					nav: {
						token: [
							"navigation",
						],
						class: [
							"L3-NAV",
						],
					},
				},
			},
			{
				match: {
					nav: "top",
				},
				slot: {
					header: {
						class: [
							"L3-TOP-HEADER",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
		},
	},
);

// Level 4: Adds content
const Level4 = Level3.extend(
	{
		tokens: [
			"content",
		],
		slot: [
			"main",
			"sidebar",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
		},
	},
	{
		token: {
			content: {
				token: [
					"navigation",
				],
				class: [
					"CONTENT",
				],
			},
		},
		rules: [
			{
				slot: {
					main: {
						token: [
							"content",
						],
						class: [
							"L4-MAIN",
						],
					},
					sidebar: {
						token: [
							"content",
						],
						class: [
							"L4-SIDEBAR",
						],
					},
				},
			},
			{
				match: {
					content: "split",
				},
				slot: {
					body: {
						class: [
							"L4-SPLIT-BODY",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
		},
	},
);

// Level 5: Adds actions
const Level5 = Level4.extend(
	{
		tokens: [
			"actions",
		],
		slot: [
			"actions",
			"footer",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
		},
	},
	{
		token: {
			actions: {
				token: [
					"content",
				],
				class: [
					"ACTIONS",
				],
			},
		},
		rules: [
			{
				slot: {
					actions: {
						token: [
							"actions",
						],
						class: [
							"L5-ACTIONS",
						],
					},
					footer: {
						token: [
							"base",
						],
						class: [
							"L5-FOOTER",
						],
					},
				},
			},
			{
				match: {
					actions: "inline",
				},
				slot: {
					body: {
						class: [
							"L5-INLINE-BODY",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
		},
	},
);

// Level 6: Adds forms
const Level6 = Level5.extend(
	{
		tokens: [
			"forms",
		],
		slot: [
			"form",
			"field",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
		},
	},
	{
		token: {
			forms: {
				token: [
					"actions",
				],
				class: [
					"FORMS",
				],
			},
		},
		rules: [
			{
				slot: {
					form: {
						token: [
							"forms",
						],
						class: [
							"L6-FORM",
						],
					},
					field: {
						token: [
							"forms",
						],
						class: [
							"L6-FIELD",
						],
					},
				},
			},
			{
				match: {
					form: "complex",
				},
				slot: {
					main: {
						class: [
							"L6-COMPLEX-MAIN",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
		},
	},
);

// Level 7: Adds data
const Level7 = Level6.extend(
	{
		tokens: [
			"data",
		],
		slot: [
			"table",
			"list",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
		},
	},
	{
		token: {
			data: {
				token: [
					"forms",
				],
				class: [
					"DATA",
				],
			},
		},
		rules: [
			{
				slot: {
					table: {
						token: [
							"data",
						],
						class: [
							"L7-TABLE",
						],
					},
					list: {
						token: [
							"data",
						],
						class: [
							"L7-LIST",
						],
					},
				},
			},
			{
				match: {
					data: "table",
				},
				slot: {
					main: {
						class: [
							"L7-TABLE-MAIN",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
		},
	},
);

// Level 8: Adds media
const Level8 = Level7.extend(
	{
		tokens: [
			"media",
		],
		slot: [
			"image",
			"video",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
			media: [
				"image",
				"video",
				"audio",
			],
		},
	},
	{
		token: {
			media: {
				token: [
					"data",
				],
				class: [
					"MEDIA",
				],
			},
		},
		rules: [
			{
				slot: {
					image: {
						token: [
							"media",
						],
						class: [
							"L8-IMAGE",
						],
					},
					video: {
						token: [
							"media",
						],
						class: [
							"L8-VIDEO",
						],
					},
				},
			},
			{
				match: {
					media: "video",
				},
				slot: {
					main: {
						class: [
							"L8-VIDEO-MAIN",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
			media: "image",
		},
	},
);

// Level 9: Adds interaction
const Level9 = Level8.extend(
	{
		tokens: [
			"interaction",
		],
		slot: [
			"button",
			"link",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
			media: [
				"image",
				"video",
				"audio",
			],
			interaction: [
				"hover",
				"focus",
				"active",
			],
		},
	},
	{
		token: {
			interaction: {
				token: [
					"media",
				],
				class: [
					"INTERACTION",
				],
			},
		},
		rules: [
			{
				slot: {
					button: {
						token: [
							"interaction",
						],
						class: [
							"L9-BUTTON",
						],
					},
					link: {
						token: [
							"interaction",
						],
						class: [
							"L9-LINK",
						],
					},
				},
			},
			{
				match: {
					interaction: "hover",
				},
				slot: {
					button: {
						class: [
							"L9-HOVER-BUTTON",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
			media: "image",
			interaction: "hover",
		},
	},
);

// Level 10: Adds animation
const Level10 = Level9.extend(
	{
		tokens: [
			"animation",
		],
		slot: [
			"transition",
			"keyframe",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
			media: [
				"image",
				"video",
				"audio",
			],
			interaction: [
				"hover",
				"focus",
				"active",
			],
			animation: [
				"none",
				"fade",
				"slide",
			],
		},
	},
	{
		token: {
			animation: {
				token: [
					"interaction",
				],
				class: [
					"ANIMATION",
				],
			},
		},
		rules: [
			{
				slot: {
					transition: {
						token: [
							"animation",
						],
						class: [
							"L10-TRANSITION",
						],
					},
					keyframe: {
						token: [
							"animation",
						],
						class: [
							"L10-KEYFRAME",
						],
					},
				},
			},
			{
				match: {
					animation: "slide",
				},
				slot: {
					main: {
						class: [
							"L10-SLIDE-MAIN",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
			media: "image",
			interaction: "hover",
			animation: "none",
		},
	},
);

// Level 11: Adds state
const Level11 = Level10.extend(
	{
		tokens: [
			"state",
		],
		slot: [
			"loading",
			"error",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
			media: [
				"image",
				"video",
				"audio",
			],
			interaction: [
				"hover",
				"focus",
				"active",
			],
			animation: [
				"none",
				"fade",
				"slide",
			],
			state: [
				"idle",
				"loading",
				"error",
			],
		},
	},
	{
		token: {
			state: {
				token: [
					"animation",
				],
				class: [
					"STATE",
				],
			},
		},
		rules: [
			{
				slot: {
					loading: {
						token: [
							"state",
						],
						class: [
							"L11-LOADING",
						],
					},
					error: {
						token: [
							"state",
						],
						class: [
							"L11-ERROR",
						],
					},
				},
			},
			{
				match: {
					state: "loading",
				},
				slot: {
					main: {
						class: [
							"L11-LOADING-MAIN",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
			media: "image",
			interaction: "hover",
			animation: "none",
			state: "idle",
		},
	},
);

// Level 12: Adds accessibility
const Level12 = Level11.extend(
	{
		tokens: [
			"accessibility",
		],
		slot: [
			"aria",
			"focus",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
			media: [
				"image",
				"video",
				"audio",
			],
			interaction: [
				"hover",
				"focus",
				"active",
			],
			animation: [
				"none",
				"fade",
				"slide",
			],
			state: [
				"idle",
				"loading",
				"error",
			],
			a11y: [
				"basic",
				"enhanced",
				"full",
			],
		},
	},
	{
		token: {
			accessibility: {
				token: [
					"state",
				],
				class: [
					"ACCESSIBILITY",
				],
			},
		},
		rules: [
			{
				slot: {
					aria: {
						token: [
							"accessibility",
						],
						class: [
							"L12-ARIA",
						],
					},
					focus: {
						token: [
							"accessibility",
						],
						class: [
							"L12-FOCUS",
						],
					},
				},
			},
			{
				match: {
					a11y: "enhanced",
				},
				slot: {
					button: {
						class: [
							"L12-ENHANCED-BUTTON",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
			media: "image",
			interaction: "hover",
			animation: "none",
			state: "idle",
			a11y: "basic",
		},
	},
);

// Level 13: Adds theming
const Level13 = Level12.extend(
	{
		tokens: [
			"theming",
		],
		slot: [
			"theme",
			"color",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
			media: [
				"image",
				"video",
				"audio",
			],
			interaction: [
				"hover",
				"focus",
				"active",
			],
			animation: [
				"none",
				"fade",
				"slide",
			],
			state: [
				"idle",
				"loading",
				"error",
			],
			a11y: [
				"basic",
				"enhanced",
				"full",
			],
			theme: [
				"light",
				"dark",
				"auto",
			],
		},
	},
	{
		token: {
			theming: {
				token: [
					"accessibility",
				],
				class: [
					"THEMING",
				],
			},
		},
		rules: [
			{
				slot: {
					theme: {
						token: [
							"theming",
						],
						class: [
							"L13-THEME",
						],
					},
					color: {
						token: [
							"theming",
						],
						class: [
							"L13-COLOR",
						],
					},
				},
			},
			{
				match: {
					theme: "dark",
				},
				slot: {
					root: {
						class: [
							"L13-DARK-ROOT",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
			media: "image",
			interaction: "hover",
			animation: "none",
			state: "idle",
			a11y: "basic",
			theme: "light",
		},
	},
);

// Level 14: Adds responsiveness
const Level14 = Level13.extend(
	{
		tokens: [
			"responsiveness",
		],
		slot: [
			"breakpoint",
			"responsive",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
			media: [
				"image",
				"video",
				"audio",
			],
			interaction: [
				"hover",
				"focus",
				"active",
			],
			animation: [
				"none",
				"fade",
				"slide",
			],
			state: [
				"idle",
				"loading",
				"error",
			],
			a11y: [
				"basic",
				"enhanced",
				"full",
			],
			theme: [
				"light",
				"dark",
				"auto",
			],
			responsive: [
				"mobile",
				"tablet",
				"desktop",
			],
		},
	},
	{
		token: {
			responsiveness: {
				token: [
					"theming",
				],
				class: [
					"RESPONSIVENESS",
				],
			},
		},
		rules: [
			{
				slot: {
					breakpoint: {
						token: [
							"responsiveness",
						],
						class: [
							"L14-BREAKPOINT",
						],
					},
					responsive: {
						token: [
							"responsiveness",
						],
						class: [
							"L14-RESPONSIVE",
						],
					},
				},
			},
			{
				match: {
					responsive: "mobile",
				},
				slot: {
					nav: {
						class: [
							"L14-MOBILE-NAV",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
			media: "image",
			interaction: "hover",
			animation: "none",
			state: "idle",
			a11y: "basic",
			theme: "light",
			responsive: "desktop",
		},
	},
);

// Level 15: Final composition
const Level15 = Level14.extend(
	{
		tokens: [
			"composition",
		],
		slot: [
			"final",
			"complete",
		],
		variant: {
			type: [
				"primary",
				"secondary",
			],
			layout: [
				"vertical",
				"horizontal",
			],
			nav: [
				"top",
				"side",
			],
			content: [
				"single",
				"split",
			],
			actions: [
				"none",
				"inline",
				"block",
			],
			form: [
				"simple",
				"complex",
			],
			data: [
				"table",
				"list",
				"grid",
			],
			media: [
				"image",
				"video",
				"audio",
			],
			interaction: [
				"hover",
				"focus",
				"active",
			],
			animation: [
				"none",
				"fade",
				"slide",
			],
			state: [
				"idle",
				"loading",
				"error",
			],
			a11y: [
				"basic",
				"enhanced",
				"full",
			],
			theme: [
				"light",
				"dark",
				"auto",
			],
			responsive: [
				"mobile",
				"tablet",
				"desktop",
			],
			composition: [
				"minimal",
				"standard",
				"rich",
			],
		},
	},
	{
		token: {
			composition: {
				token: [
					"responsiveness",
				],
				class: [
					"COMPOSITION",
				],
			},
		},
		rules: [
			{
				slot: {
					final: {
						token: [
							"composition",
						],
						class: [
							"L15-FINAL",
						],
					},
					complete: {
						token: [
							"composition",
						],
						class: [
							"L15-COMPLETE",
						],
					},
				},
			},
			{
				match: {
					composition: "rich",
				},
				slot: {
					root: {
						class: [
							"L15-RICH-ROOT",
						],
					},
				},
			},
		],
		defaults: {
			type: "primary",
			layout: "vertical",
			nav: "side",
			content: "single",
			actions: "none",
			form: "simple",
			data: "table",
			media: "image",
			interaction: "hover",
			animation: "none",
			state: "idle",
			a11y: "basic",
			theme: "light",
			responsive: "desktop",
			composition: "standard",
		},
	},
);

interface MassiveComponentProps
	extends Cls.Props<typeof Level15>,
		PropsWithChildren {}
const BaseMassiveComponent: FC<MassiveComponentProps> = ({
	cls = Level15,
	tweak,
	children,
}) => {
	const { slots } = useCls(cls, tweak);
	return (
		<div
			data-ui="Massive-root"
			className={slots.root()}
		>
			<header
				data-ui="Massive-header"
				className={slots.header()}
			>
				<nav
					data-ui="Massive-nav"
					className={slots.nav()}
				/>
			</header>
			<div
				data-ui="Massive-body"
				className={slots.body()}
			>
				<main
					data-ui="Massive-main"
					className={slots.main()}
				>
					{children}
				</main>
				<button
					type="button"
					data-ui="Massive-button"
					className={slots.button()}
				/>
			</div>
		</div>
	);
};
const MassiveComponent = withCls(BaseMassiveComponent, Level15);

describe("react/04-complex/nested-providers-inheritance-chain", () => {
	it("handles nested providers with inheritance chain overrides", () => {
		const OverrideProvider = contract()
			.tokens([
				"base",
				"structure",
				"navigation",
				"content",
				"actions",
				"forms",
				"data",
				"media",
				"interaction",
				"animation",
				"state",
				"accessibility",
				"theming",
				"responsiveness",
				"composition",
			])
			.def()
			.token({
				base: {
					class: [
						"OVERRIDE-BASE",
					],
				},
				structure: {
					class: [
						"OVERRIDE-STRUCTURE",
					],
				},
				navigation: {
					class: [
						"OVERRIDE-NAVIGATION",
					],
				},
				content: {
					class: [
						"OVERRIDE-CONTENT",
					],
				},
				actions: {
					class: [
						"OVERRIDE-ACTIONS",
					],
				},
				forms: {
					class: [
						"OVERRIDE-FORMS",
					],
				},
				data: {
					class: [
						"OVERRIDE-DATA",
					],
				},
				media: {
					class: [
						"OVERRIDE-MEDIA",
					],
				},
				interaction: {
					class: [
						"OVERRIDE-INTERACTION",
					],
				},
				animation: {
					class: [
						"OVERRIDE-ANIMATION",
					],
				},
				state: {
					class: [
						"OVERRIDE-STATE",
					],
				},
				accessibility: {
					class: [
						"OVERRIDE-ACCESSIBILITY",
					],
				},
				theming: {
					class: [
						"OVERRIDE-THEMING",
					],
				},
				responsiveness: {
					class: [
						"OVERRIDE-RESPONSIVENESS",
					],
				},
				composition: {
					class: [
						"OVERRIDE-COMPOSITION",
					],
				},
			})
			.cls();

		const { container } = render(
			<TokenContext value={OverrideProvider}>
				<TweakProvider
					cls={Level15}
					tweak={{
						variant: {
							theme: "dark",
							composition: "rich",
						},
						slot: {
							root: {
								class: [
									"PROVIDER-ROOT",
								],
							},
							button: {
								class: [
									"PROVIDER-BUTTON",
								],
							},
						},
					}}
				>
					<MassiveComponent
						tweak={{
							variant: {
								state: "loading",
							},
							slot: {
								main: {
									class: [
										"USER-MAIN",
									],
								},
							},
						}}
					>
						Nested test
					</MassiveComponent>
				</TweakProvider>
			</TokenContext>,
		);

		const root = container.querySelector(
			'[data-ui="Massive-root"]',
		) as HTMLElement;
		const main = container.querySelector(
			'[data-ui="Massive-main"]',
		) as HTMLElement;
		const button = container.querySelector(
			'[data-ui="Massive-button"]',
		) as HTMLElement;

		// Root should have overridden tokens from provider
		expect(root.className).toBe(
			"OVERRIDE-BASE L1 L1-PRIMARY L13-DARK-ROOT L15-RICH-ROOT PROVIDER-ROOT",
		);

		// Main should have overridden content token + user override
		expect(main.className).toBe(
			"OVERRIDE-CONTENT L4-MAIN L7-TABLE-MAIN L11-LOADING-MAIN USER-MAIN",
		);

		// Button should have overridden interaction token + provider override
		expect(button.className).toBe(
			"OVERRIDE-INTERACTION L9-BUTTON L9-HOVER-BUTTON PROVIDER-BUTTON",
		);
	});
});
