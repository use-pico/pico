import { contract } from "@use-pico/cls";

export const PicoCls = contract()
	.tokens([
		/**
		 * Primary Tone
		 */
		"tone.primary.light.text",
		"tone.primary.light.text:hover",
		"tone.primary.light.text",
		"tone.primary.light.bg",
		"tone.primary.light.bg:hover",
		"tone.primary.light.bg",
		"tone.primary.light.bg:even",
		"tone.primary.light.bg:odd",
		"tone.primary.light.accent",
		"tone.primary.light.from",
		"tone.primary.light.to",
		"tone.primary.light.border",
		"tone.primary.light.border:hover",
		"tone.primary.light.border",
		"tone.primary.light.border:group-hover",
		"tone.primary.light.shadow",
		"tone.primary.light.shadow:hover",
		"tone.primary.light.shadow",
		"tone.primary.light.set",
		//
		"tone.primary.dark.text",
		"tone.primary.dark.text:hover",
		"tone.primary.dark.text",
		"tone.primary.dark.bg",
		"tone.primary.dark.bg:hover",
		"tone.primary.dark.bg",
		"tone.primary.dark.bg:even",
		"tone.primary.dark.bg:odd",
		"tone.primary.dark.accent",
		"tone.primary.dark.from",
		"tone.primary.dark.to",
		"tone.primary.dark.border",
		"tone.primary.dark.border:hover",
		"tone.primary.dark.border",
		"tone.primary.dark.border:group-hover",
		"tone.primary.dark.shadow",
		"tone.primary.dark.shadow:hover",
		"tone.primary.dark.shadow",
		"tone.primary.dark.set",
		/**
		 * Secondary Tone
		 */
		"tone.secondary.light.text",
		"tone.secondary.light.text:hover",
		"tone.secondary.light.text",
		"tone.secondary.light.bg",
		"tone.secondary.light.bg:hover",
		"tone.secondary.light.bg",
		"tone.secondary.light.bg:even",
		"tone.secondary.light.bg:odd",
		"tone.secondary.light.accent",
		"tone.secondary.light.from",
		"tone.secondary.light.to",
		"tone.secondary.light.border",
		"tone.secondary.light.border:hover",
		"tone.secondary.light.border",
		"tone.secondary.light.border:group-hover",
		"tone.secondary.light.shadow",
		"tone.secondary.light.shadow:hover",
		"tone.secondary.light.shadow",
		"tone.secondary.light.set",
		//
		"tone.secondary.dark.text",
		"tone.secondary.dark.text:hover",
		"tone.secondary.dark.text",
		"tone.secondary.dark.bg",
		"tone.secondary.dark.bg:hover",
		"tone.secondary.dark.bg",
		"tone.secondary.dark.bg:even",
		"tone.secondary.dark.bg:odd",
		"tone.secondary.dark.accent",
		"tone.secondary.dark.from",
		"tone.secondary.dark.to",
		"tone.secondary.dark.border",
		"tone.secondary.dark.border:hover",
		"tone.secondary.dark.border",
		"tone.secondary.dark.border:group-hover",
		"tone.secondary.dark.shadow",
		"tone.secondary.dark.shadow:hover",
		"tone.secondary.dark.shadow",
		"tone.secondary.dark.set",
		/**
		 * Danger Tone
		 */
		"tone.danger.light.text",
		"tone.danger.light.text:hover",
		"tone.danger.light.text",
		"tone.danger.light.bg",
		"tone.danger.light.bg:hover",
		"tone.danger.light.bg",
		"tone.danger.light.bg:even",
		"tone.danger.light.bg:odd",
		"tone.danger.light.accent",
		"tone.danger.light.from",
		"tone.danger.light.to",
		"tone.danger.light.border",
		"tone.danger.light.border:hover",
		"tone.danger.light.border",
		"tone.danger.light.border:group-hover",
		"tone.danger.light.shadow",
		"tone.danger.light.shadow:hover",
		"tone.danger.light.shadow",
		"tone.danger.light.set",
		//
		"tone.danger.dark.text",
		"tone.danger.dark.text:hover",
		"tone.danger.dark.text",
		"tone.danger.dark.bg",
		"tone.danger.dark.bg:hover",
		"tone.danger.dark.bg",
		"tone.danger.dark.bg:even",
		"tone.danger.dark.bg:odd",
		"tone.danger.dark.accent",
		"tone.danger.dark.from",
		"tone.danger.dark.to",
		"tone.danger.dark.border",
		"tone.danger.dark.border:hover",
		"tone.danger.dark.border",
		"tone.danger.dark.border:group-hover",
		"tone.danger.dark.shadow",
		"tone.danger.dark.shadow:hover",
		"tone.danger.dark.shadow",
		"tone.danger.dark.set",
		/**
		 * Warning Tone
		 */
		"tone.warning.light.text",
		"tone.warning.light.text:hover",
		"tone.warning.light.text",
		"tone.warning.light.bg",
		"tone.warning.light.bg:hover",
		"tone.warning.light.bg",
		"tone.warning.light.bg:even",
		"tone.warning.light.bg:odd",
		"tone.warning.light.accent",
		"tone.warning.light.from",
		"tone.warning.light.to",
		"tone.warning.light.border",
		"tone.warning.light.border:hover",
		"tone.warning.light.border",
		"tone.warning.light.border:group-hover",
		"tone.warning.light.shadow",
		"tone.warning.light.shadow:hover",
		"tone.warning.light.shadow",
		"tone.warning.light.set",
		//
		"tone.warning.dark.text",
		"tone.warning.dark.text:hover",
		"tone.warning.dark.text",
		"tone.warning.dark.bg",
		"tone.warning.dark.bg:hover",
		"tone.warning.dark.bg",
		"tone.warning.dark.bg:even",
		"tone.warning.dark.bg:odd",
		"tone.warning.dark.accent",
		"tone.warning.dark.from",
		"tone.warning.dark.to",
		"tone.warning.dark.border",
		"tone.warning.dark.border:hover",
		"tone.warning.dark.border",
		"tone.warning.dark.border:group-hover",
		"tone.warning.dark.shadow",
		"tone.warning.dark.shadow:hover",
		"tone.warning.dark.shadow",
		"tone.warning.dark.set",
		/**
		 * Subtle Tone
		 */
		"tone.subtle.light.text",
		"tone.subtle.light.text:hover",
		"tone.subtle.light.text",
		"tone.subtle.light.bg",
		"tone.subtle.light.bg:hover",
		"tone.subtle.light.bg",
		"tone.subtle.light.bg:even",
		"tone.subtle.light.bg:odd",
		"tone.subtle.light.accent",
		"tone.subtle.light.from",
		"tone.subtle.light.to",
		"tone.subtle.light.border",
		"tone.subtle.light.border:hover",
		"tone.subtle.light.border",
		"tone.subtle.light.border:group-hover",
		"tone.subtle.light.shadow",
		"tone.subtle.light.shadow:hover",
		"tone.subtle.light.shadow",
		"tone.subtle.light.set",
		//
		"tone.subtle.dark.text",
		"tone.subtle.dark.text:hover",
		"tone.subtle.dark.text",
		"tone.subtle.dark.bg",
		"tone.subtle.dark.bg:hover",
		"tone.subtle.dark.bg",
		"tone.subtle.dark.bg:even",
		"tone.subtle.dark.bg:odd",
		"tone.subtle.dark.accent",
		"tone.subtle.dark.from",
		"tone.subtle.dark.to",
		"tone.subtle.dark.border",
		"tone.subtle.dark.border:hover",
		"tone.subtle.dark.border",
		"tone.subtle.dark.border:group-hover",
		"tone.subtle.dark.shadow",
		"tone.subtle.dark.shadow:hover",
		"tone.subtle.dark.shadow",
		"tone.subtle.dark.set",
		/**
		 * Neutral Tone
		 */
		"tone.neutral.light.text",
		"tone.neutral.light.text:hover",
		"tone.neutral.light.text",
		"tone.neutral.light.bg",
		"tone.neutral.light.bg:hover",
		"tone.neutral.light.bg",
		"tone.neutral.light.bg:even",
		"tone.neutral.light.bg:odd",
		"tone.neutral.light.accent",
		"tone.neutral.light.from",
		"tone.neutral.light.to",
		"tone.neutral.light.border",
		"tone.neutral.light.border:hover",
		"tone.neutral.light.border",
		"tone.neutral.light.border:group-hover",
		"tone.neutral.light.shadow",
		"tone.neutral.light.shadow:hover",
		"tone.neutral.light.shadow",
		"tone.neutral.light.set",
		//
		"tone.neutral.dark.text",
		"tone.neutral.dark.text:hover",
		"tone.neutral.dark.text",
		"tone.neutral.dark.bg",
		"tone.neutral.dark.bg:hover",
		"tone.neutral.dark.bg",
		"tone.neutral.dark.bg:even",
		"tone.neutral.dark.bg:odd",
		"tone.neutral.dark.accent",
		"tone.neutral.dark.from",
		"tone.neutral.dark.to",
		"tone.neutral.dark.border",
		"tone.neutral.dark.border:hover",
		"tone.neutral.dark.border",
		"tone.neutral.dark.border:group-hover",
		"tone.neutral.dark.shadow",
		"tone.neutral.dark.shadow:hover",
		"tone.neutral.dark.shadow",
		"tone.neutral.dark.set",
		/**
		 * Link Tone
		 */
		"tone.link.light.text",
		"tone.link.light.text:hover",
		"tone.link.light.text",
		"tone.link.light.bg",
		"tone.link.light.bg:hover",
		"tone.link.light.bg",
		"tone.link.light.bg:even",
		"tone.link.light.bg:odd",
		"tone.link.light.accent",
		"tone.link.light.from",
		"tone.link.light.to",
		"tone.link.light.border",
		"tone.link.light.border:hover",
		"tone.link.light.border",
		"tone.link.light.border:group-hover",
		"tone.link.light.shadow",
		"tone.link.light.shadow:hover",
		"tone.link.light.shadow",
		"tone.link.light.set",
		//
		"tone.link.dark.text",
		"tone.link.dark.text:hover",
		"tone.link.dark.text",
		"tone.link.dark.bg",
		"tone.link.dark.bg:hover",
		"tone.link.dark.bg",
		"tone.link.dark.bg:even",
		"tone.link.dark.bg:odd",
		"tone.link.dark.accent",
		"tone.link.dark.from",
		"tone.link.dark.to",
		"tone.link.dark.border",
		"tone.link.dark.border:hover",
		"tone.link.dark.border",
		"tone.link.dark.border:group-hover",
		"tone.link.dark.shadow",
		"tone.link.dark.shadow:hover",
		"tone.link.dark.shadow",
		"tone.link.dark.set",
		/**
		 * Rounding
		 */
		"round.default",
		"round.sm",
		"round.md",
		"round.lg",
		"round.xl",
		"round.full",
		/**
		 * Border
		 */
		"border.default",
		"border.default:hover",
		"border.sm",
		"border.md",
		"border.lg",
		"border.xl",
		/**
		 * Size - using w/h
		 *
		 * May contain more classes
		 */
		"size.xs",
		"size.sm",
		"size.md",
		"size.lg",
		"size.xl",
		//
		"padding.xs",
		"padding.sm",
		"padding.md",
		"padding.lg",
		"padding.xl",
		//
		"square.xs",
		"square.sm",
		"square.md",
		"square.lg",
		"square.xl",
		//
		"icon.xs",
		"icon.sm",
		"icon.md",
		"icon.lg",
		"icon.xl",
		"inner-icon.xs",
		"inner-icon.sm",
		"inner-icon.md",
		"inner-icon.lg",
		"inner-icon.xl",
		"inner-icon.2xl",
		"inner-icon.3xl",
		"inner-icon.4xl",
		/**
		 * Scale
		 */
		"scale.default",
		"scale.sm",
		"scale.md",
		"scale.lg",
		/**
		 * Shadows
		 */
		"shadow.default",
		"shadow.sm",
		"shadow.md",
		"shadow.lg",
		"shadow.xl",
		/**
		 * Focus
		 */
		"focus.off",
		"focus.ring",
		/**
		 * Misc
		 */
		"disabled",
	])
	.slot("default")
	.variant("tone", [
		"unset",
		"primary",
		"secondary",
		"danger",
		"warning",
		"neutral",
		"subtle",
		"link",
	])
	.variant("theme", [
		"unset",
		"light",
		"dark",
	])
	.def()
	.token({
		/**
		 * Primary Tone - Modern Indigo/Purple
		 */
		"tone.primary.light.text": {
			class: [
				"text-indigo-700",
			],
		},
		"tone.primary.light.text:hover": {
			class: [
				"hover:text-indigo-800",
			],
		},
		"tone.primary.light.bg": {
			class: [
				"bg-indigo-100",
			],
		},
		"tone.primary.light.bg:hover": {
			class: [
				"hover:bg-indigo-200",
			],
		},
		"tone.primary.light.bg:even": {
			class: [
				"even:bg-indigo-100",
			],
		},
		"tone.primary.light.bg:odd": {
			class: [
				"odd:bg-indigo-50",
			],
		},
		"tone.primary.light.accent": {
			class: [
				"bg-indigo-100/50",
			],
		},
		"tone.primary.light.from": {
			class: [
				"from-indigo-100/50",
			],
		},
		"tone.primary.light.to": {
			class: [
				"to-indigo-100/50",
			],
		},
		"tone.primary.light.border": {
			class: [
				"border-indigo-200/60",
				"border-b-indigo-200",
			],
		},
		"tone.primary.light.border:hover": {
			class: [
				"hover:border-indigo-300/60",
				"hover:border-b-indigo-300",
			],
		},
		"tone.primary.light.border:group-hover": {
			class: [
				"group-hover:border-indigo-300/60",
				"group-hover:border-b-indigo-300",
			],
		},
		"tone.primary.light.shadow": {
			class: [
				"shadow-indigo-200/50",
			],
		},
		"tone.primary.light.shadow:hover": {
			class: [
				"hover:shadow-indigo-300/60",
			],
		}, //
		"tone.primary.dark.text": {
			class: [
				"text-violet-100",
			],
		},
		"tone.primary.dark.text:hover": {
			class: [
				"hover:text-violet-50",
			],
		},
		"tone.primary.dark.bg": {
			class: [
				"bg-violet-900/90",
			],
		},
		"tone.primary.dark.bg:hover": {
			class: [
				"hover:bg-violet-800/90",
			],
		},
		"tone.primary.dark.bg:even": {
			class: [
				"even:bg-violet-800/80",
			],
		},
		"tone.primary.dark.bg:odd": {
			class: [
				"odd:bg-violet-950/90",
			],
		},
		"tone.primary.dark.accent": {
			class: [
				"bg-violet-900/50",
			],
		},
		"tone.primary.dark.from": {
			class: [
				"from-violet-900/50",
			],
		},
		"tone.primary.dark.to": {
			class: [
				"to-violet-900/50",
			],
		},
		"tone.primary.dark.border": {
			class: [
				"border-violet-400/60",
				"border-b-violet-400/80",
			],
		},
		"tone.primary.dark.border:hover": {
			class: [
				"hover:border-violet-300/70",
				"hover:border-b-violet-300/90",
			],
		},
		"tone.primary.dark.border:group-hover": {
			class: [
				"group-hover:border-violet-300/70",
				"group-hover:border-b-violet-300/90",
			],
		},
		"tone.primary.dark.shadow": {
			class: [
				"shadow-violet-900/40",
			],
		},
		"tone.primary.dark.shadow:hover": {
			class: [
				"hover:shadow-violet-800/50",
			],
		} /**
		 * Secondary Tone - Modern Teal/Cyan
		 */,
		"tone.secondary.light.text": {
			class: [
				"text-teal-700",
			],
		},
		"tone.secondary.light.text:hover": {
			class: [
				"hover:text-teal-800",
			],
		},
		"tone.secondary.light.bg": {
			class: [
				"bg-teal-100",
			],
		},
		"tone.secondary.light.bg:hover": {
			class: [
				"hover:bg-teal-200",
			],
		},
		"tone.secondary.light.bg:even": {
			class: [
				"even:bg-teal-100",
			],
		},
		"tone.secondary.light.bg:odd": {
			class: [
				"odd:bg-teal-50",
			],
		},
		"tone.secondary.light.accent": {
			class: [
				"bg-teal-100/50",
			],
		},
		"tone.secondary.light.from": {
			class: [
				"from-teal-100/50",
			],
		},
		"tone.secondary.light.to": {
			class: [
				"to-teal-100/50",
			],
		},
		"tone.secondary.light.border": {
			class: [
				"border-teal-200/60",
				"border-b-teal-200",
			],
		},
		"tone.secondary.light.border:hover": {
			class: [
				"hover:border-teal-300/60",
				"hover:border-b-teal-300",
			],
		},
		"tone.secondary.light.border:group-hover": {
			class: [
				"group-hover:border-teal-300/60",
				"group-hover:border-b-teal-300",
			],
		},
		"tone.secondary.light.shadow": {
			class: [
				"shadow-teal-200/50",
			],
		},
		"tone.secondary.light.shadow:hover": {
			class: [
				"hover:shadow-teal-300/60",
			],
		}, //
		"tone.secondary.dark.text": {
			class: [
				"text-cyan-100",
			],
		},
		"tone.secondary.dark.text:hover": {
			class: [
				"hover:text-cyan-50",
			],
		},
		"tone.secondary.dark.bg": {
			class: [
				"bg-teal-900/90",
			],
		},
		"tone.secondary.dark.bg:hover": {
			class: [
				"hover:bg-teal-800/90",
			],
		},
		"tone.secondary.dark.bg:even": {
			class: [
				"even:bg-teal-800/80",
			],
		},
		"tone.secondary.dark.bg:odd": {
			class: [
				"odd:bg-teal-950/90",
			],
		},
		"tone.secondary.dark.accent": {
			class: [
				"bg-teal-900/50",
			],
		},
		"tone.secondary.dark.from": {
			class: [
				"from-teal-900/50",
			],
		},
		"tone.secondary.dark.to": {
			class: [
				"to-teal-900/50",
			],
		},
		"tone.secondary.dark.border": {
			class: [
				"border-teal-500/60",
				"border-b-teal-500/80",
			],
		},
		"tone.secondary.dark.border:hover": {
			class: [
				"hover:border-teal-400/70",
				"hover:border-b-teal-400/90",
			],
		},
		"tone.secondary.dark.border:group-hover": {
			class: [
				"group-hover:border-teal-400/70",
				"group-hover:border-b-teal-400/90",
			],
		},
		"tone.secondary.dark.shadow": {
			class: [
				"shadow-teal-900/40",
			],
		},
		"tone.secondary.dark.shadow:hover": {
			class: [
				"hover:shadow-teal-800/50",
			],
		} /**
		 * Danger Tone - Modern Rose/Red
		 */,
		"tone.danger.light.text": {
			class: [
				"text-rose-700",
			],
		},
		"tone.danger.light.text:hover": {
			class: [
				"hover:text-rose-800",
			],
		},
		"tone.danger.light.bg": {
			class: [
				"bg-rose-100",
			],
		},
		"tone.danger.light.bg:hover": {
			class: [
				"hover:bg-rose-200",
			],
		},
		"tone.danger.light.bg:even": {
			class: [
				"even:bg-rose-100",
			],
		},
		"tone.danger.light.bg:odd": {
			class: [
				"odd:bg-rose-50",
			],
		},
		"tone.danger.light.accent": {
			class: [
				"bg-rose-100/50",
			],
		},
		"tone.danger.light.from": {
			class: [
				"from-rose-100/50",
			],
		},
		"tone.danger.light.to": {
			class: [
				"to-rose-100/50",
			],
		},
		"tone.danger.light.border": {
			class: [
				"border-rose-200/60",
				"border-b-rose-200",
			],
		},
		"tone.danger.light.border:hover": {
			class: [
				"hover:border-rose-300/60",
				"hover:border-b-rose-300",
			],
		},
		"tone.danger.light.border:group-hover": {
			class: [
				"group-hover:border-rose-300/60",
				"group-hover:border-b-rose-300",
			],
		},
		"tone.danger.light.shadow": {
			class: [
				"shadow-rose-200/50",
			],
		},
		"tone.danger.light.shadow:hover": {
			class: [
				"hover:shadow-rose-300/60",
			],
		}, //
		"tone.danger.dark.text": {
			class: [
				"text-rose-100",
			],
		},
		"tone.danger.dark.text:hover": {
			class: [
				"hover:text-rose-50",
			],
		},
		"tone.danger.dark.bg": {
			class: [
				"bg-rose-900/90",
			],
		},
		"tone.danger.dark.bg:hover": {
			class: [
				"hover:bg-rose-800/90",
			],
		},
		"tone.danger.dark.bg:even": {
			class: [
				"even:bg-rose-800/80",
			],
		},
		"tone.danger.dark.bg:odd": {
			class: [
				"odd:bg-rose-950/90",
			],
		},
		"tone.danger.dark.accent": {
			class: [
				"bg-rose-900/50",
			],
		},
		"tone.danger.dark.from": {
			class: [
				"from-rose-900/50",
			],
		},
		"tone.danger.dark.to": {
			class: [
				"to-rose-900/50",
			],
		},
		"tone.danger.dark.border": {
			class: [
				"border-rose-500/60",
				"border-b-rose-500/80",
			],
		},
		"tone.danger.dark.border:hover": {
			class: [
				"hover:border-rose-400/70",
				"hover:border-b-rose-400/90",
			],
		},
		"tone.danger.dark.border:group-hover": {
			class: [
				"group-hover:border-rose-400/70",
				"group-hover:border-b-rose-400/90",
			],
		},
		"tone.danger.dark.shadow": {
			class: [
				"shadow-rose-900/40",
			],
		},
		"tone.danger.dark.shadow:hover": {
			class: [
				"hover:shadow-rose-800/50",
			],
		} /**
		 * Warning Tone - Modern Amber/Orange
		 */,
		"tone.warning.light.text": {
			class: [
				"text-amber-700",
			],
		},
		"tone.warning.light.text:hover": {
			class: [
				"hover:text-amber-800",
			],
		},
		"tone.warning.light.bg": {
			class: [
				"bg-amber-100",
			],
		},
		"tone.warning.light.bg:hover": {
			class: [
				"hover:bg-amber-200",
			],
		},
		"tone.warning.light.bg:even": {
			class: [
				"even:bg-amber-100",
			],
		},
		"tone.warning.light.bg:odd": {
			class: [
				"odd:bg-amber-50",
			],
		},
		"tone.warning.light.accent": {
			class: [
				"bg-amber-100/50",
			],
		},
		"tone.warning.light.from": {
			class: [
				"from-amber-100/50",
			],
		},
		"tone.warning.light.to": {
			class: [
				"to-amber-100/50",
			],
		},
		"tone.warning.light.border": {
			class: [
				"border-amber-200/60",
				"border-b-amber-200",
			],
		},
		"tone.warning.light.border:hover": {
			class: [
				"hover:border-amber-300/60",
				"hover:border-b-amber-300",
			],
		},
		"tone.warning.light.border:group-hover": {
			class: [
				"group-hover:border-amber-300/60",
				"group-hover:border-b-amber-300",
			],
		},
		"tone.warning.light.shadow": {
			class: [
				"shadow-amber-200/50",
			],
		},
		"tone.warning.light.shadow:hover": {
			class: [
				"hover:shadow-amber-300/60",
			],
		}, //
		"tone.warning.dark.text": {
			class: [
				"text-amber-100",
			],
		},
		"tone.warning.dark.text:hover": {
			class: [
				"hover:text-amber-50",
			],
		},
		"tone.warning.dark.bg": {
			class: [
				"bg-amber-900/90",
			],
		},
		"tone.warning.dark.bg:hover": {
			class: [
				"hover:bg-amber-800/90",
			],
		},
		"tone.warning.dark.bg:even": {
			class: [
				"even:bg-amber-800/80",
			],
		},
		"tone.warning.dark.bg:odd": {
			class: [
				"odd:bg-amber-950/90",
			],
		},
		"tone.warning.dark.accent": {
			class: [
				"bg-amber-900/50",
			],
		},
		"tone.warning.dark.from": {
			class: [
				"from-amber-900/50",
			],
		},
		"tone.warning.dark.to": {
			class: [
				"to-amber-900/50",
			],
		},
		"tone.warning.dark.border": {
			class: [
				"border-amber-500/60",
				"border-b-amber-500/80",
			],
		},
		"tone.warning.dark.border:hover": {
			class: [
				"hover:border-amber-400/70",
				"hover:border-b-amber-400/90",
			],
		},
		"tone.warning.dark.border:group-hover": {
			class: [
				"group-hover:border-amber-400/70",
				"group-hover:border-b-amber-400/90",
			],
		},
		"tone.warning.dark.shadow": {
			class: [
				"shadow-amber-900/40",
			],
		},
		"tone.warning.dark.shadow:hover": {
			class: [
				"hover:shadow-amber-800/50",
			],
		} /**
		 * Subtle Tone - Modern Stone/Neutral
		 */,
		"tone.subtle.light.text": {
			class: [
				"text-stone-700",
			],
		},
		"tone.subtle.light.text:hover": {
			class: [
				"hover:text-stone-800",
			],
		},
		"tone.subtle.light.bg": {
			class: [
				"bg-stone-100",
			],
		},
		"tone.subtle.light.bg:hover": {
			class: [
				"hover:bg-stone-200",
			],
		},
		"tone.subtle.light.bg:even": {
			class: [
				"even:bg-stone-100",
			],
		},
		"tone.subtle.light.bg:odd": {
			class: [
				"odd:bg-stone-50",
			],
		},
		"tone.subtle.light.accent": {
			class: [
				"bg-stone-100/50",
			],
		},
		"tone.subtle.light.from": {
			class: [
				"from-stone-100/50",
			],
		},
		"tone.subtle.light.to": {
			class: [
				"to-stone-100/50",
			],
		},
		"tone.subtle.light.border": {
			class: [
				"border-stone-200/60",
				"border-b-stone-200",
			],
		},
		"tone.subtle.light.border:hover": {
			class: [
				"hover:border-stone-300/60",
				"hover:border-b-stone-300",
			],
		},
		"tone.subtle.light.border:group-hover": {
			class: [
				"group-hover:border-stone-300/60",
				"group-hover:border-b-stone-300",
			],
		},
		"tone.subtle.light.shadow": {
			class: [
				"shadow-stone-200/50",
			],
		},
		"tone.subtle.light.shadow:hover": {
			class: [
				"hover:shadow-stone-300/60",
			],
		}, //
		"tone.subtle.dark.text": {
			class: [
				"text-stone-100",
			],
		},
		"tone.subtle.dark.text:hover": {
			class: [
				"hover:text-stone-50",
			],
		},
		"tone.subtle.dark.bg": {
			class: [
				"bg-stone-900/90",
			],
		},
		"tone.subtle.dark.bg:hover": {
			class: [
				"hover:bg-stone-800/90",
			],
		},
		"tone.subtle.dark.bg:even": {
			class: [
				"even:bg-stone-800/80",
			],
		},
		"tone.subtle.dark.bg:odd": {
			class: [
				"odd:bg-stone-950/90",
			],
		},
		"tone.subtle.dark.accent": {
			class: [
				"bg-stone-900/50",
			],
		},
		"tone.subtle.dark.from": {
			class: [
				"from-stone-900/50",
			],
		},
		"tone.subtle.dark.to": {
			class: [
				"to-stone-900/50",
			],
		},
		"tone.subtle.dark.border": {
			class: [
				"border-stone-400/60",
				"border-b-stone-400/80",
			],
		},
		"tone.subtle.dark.border:hover": {
			class: [
				"hover:border-stone-300/70",
				"hover:border-b-stone-300/90",
			],
		},
		"tone.subtle.dark.border:group-hover": {
			class: [
				"group-hover:border-stone-300/70",
				"group-hover:border-b-stone-300/90",
			],
		},
		"tone.subtle.dark.shadow": {
			class: [
				"shadow-stone-900/40",
			],
		},
		"tone.subtle.dark.shadow:hover": {
			class: [
				"hover:shadow-stone-800/50",
			],
		} /**
		 * Neutral Tone - Enhanced Slate
		 */,
		"tone.neutral.light.text": {
			class: [
				"text-slate-900",
			],
		},
		"tone.neutral.light.text:hover": {
			class: [
				"hover:text-slate-950",
			],
		},
		"tone.neutral.light.bg": {
			class: [
				"bg-slate-100",
			],
		},
		"tone.neutral.light.bg:hover": {
			class: [
				"hover:bg-slate-200",
			],
		},
		"tone.neutral.light.bg:even": {
			class: [
				"even:bg-slate-100",
			],
		},
		"tone.neutral.light.bg:odd": {
			class: [
				"odd:bg-slate-50",
			],
		},
		"tone.neutral.light.accent": {
			class: [
				"bg-slate-100/50",
			],
		},
		"tone.neutral.light.from": {
			class: [
				"from-slate-100/50",
			],
		},
		"tone.neutral.light.to": {
			class: [
				"to-slate-100/50",
			],
		},
		"tone.neutral.light.border": {
			class: [
				"border-slate-200/60",
				"border-b-slate-200",
			],
		},
		"tone.neutral.light.border:hover": {
			class: [
				"hover:border-slate-300/60",
				"hover:border-b-slate-300",
			],
		},
		"tone.neutral.light.border:group-hover": {
			class: [
				"group-hover:border-slate-300/60",
				"group-hover:border-b-slate-300",
			],
		},
		"tone.neutral.light.shadow": {
			class: [
				"shadow-slate-200/50",
			],
		},
		"tone.neutral.light.shadow:hover": {
			class: [
				"hover:shadow-slate-300/60",
			],
		}, //
		"tone.neutral.dark.text": {
			class: [
				"text-slate-100",
			],
		},
		"tone.neutral.dark.text:hover": {
			class: [
				"hover:text-slate-50",
			],
		},
		"tone.neutral.dark.bg": {
			class: [
				"bg-slate-900/90",
			],
		},
		"tone.neutral.dark.bg:hover": {
			class: [
				"hover:bg-slate-800/90",
			],
		},
		"tone.neutral.dark.bg:even": {
			class: [
				"even:bg-slate-800/80",
			],
		},
		"tone.neutral.dark.bg:odd": {
			class: [
				"odd:bg-slate-950/90",
			],
		},
		"tone.neutral.dark.accent": {
			class: [
				"bg-slate-900/50",
			],
		},
		"tone.neutral.dark.from": {
			class: [
				"from-slate-900/50",
			],
		},
		"tone.neutral.dark.to": {
			class: [
				"to-slate-900/50",
			],
		},
		"tone.neutral.dark.border": {
			class: [
				"border-slate-400/60",
				"border-b-slate-400/80",
			],
		},
		"tone.neutral.dark.border:hover": {
			class: [
				"hover:border-slate-300/70",
				"hover:border-b-slate-300/90",
			],
		},
		"tone.neutral.dark.border:group-hover": {
			class: [
				"group-hover:border-slate-300/70",
				"group-hover:border-b-slate-300/90",
			],
		},
		"tone.neutral.dark.shadow": {
			class: [
				"shadow-slate-900/40",
			],
		},
		"tone.neutral.dark.shadow:hover": {
			class: [
				"hover:shadow-slate-800/50",
			],
		} /**
		 * Link Tone - Modern Blue
		 */,
		"tone.link.light.text": {
			class: [
				"text-blue-600",
			],
		},
		"tone.link.light.text:hover": {
			class: [
				"hover:text-blue-700",
			],
		},
		"tone.link.light.bg": {
			class: [
				"bg-blue-50",
			],
		},
		"tone.link.light.bg:hover": {
			class: [
				"hover:bg-blue-100",
			],
		},
		"tone.link.light.bg:even": {
			class: [
				"even:bg-blue-50",
			],
		},
		"tone.link.light.bg:odd": {
			class: [
				"odd:bg-blue-25",
			],
		},
		"tone.link.light.accent": {
			class: [
				"bg-blue-50/50",
			],
		},
		"tone.link.light.from": {
			class: [
				"from-blue-50/50",
			],
		},
		"tone.link.light.to": {
			class: [
				"to-blue-50/50",
			],
		},
		"tone.link.light.border": {
			class: [
				"border-blue-200/60",
				"border-b-blue-200",
			],
		},
		"tone.link.light.border:hover": {
			class: [
				"hover:border-blue-300/60",
				"hover:border-b-blue-300",
			],
		},
		"tone.link.light.border:group-hover": {
			class: [
				"group-hover:border-blue-300/60",
				"group-hover:border-b-blue-300",
			],
		},
		"tone.link.light.shadow": {
			class: [
				"shadow-blue-200/50",
			],
		},
		"tone.link.light.shadow:hover": {
			class: [
				"hover:shadow-blue-300/60",
			],
		}, //
		"tone.link.dark.text": {
			class: [
				"text-blue-300",
			],
		},
		"tone.link.dark.text:hover": {
			class: [
				"hover:text-blue-200",
			],
		},
		"tone.link.dark.bg": {
			class: [
				"bg-blue-900/90",
			],
		},
		"tone.link.dark.bg:hover": {
			class: [
				"hover:bg-blue-800/90",
			],
		},
		"tone.link.dark.bg:even": {
			class: [
				"even:bg-blue-800/80",
			],
		},
		"tone.link.dark.bg:odd": {
			class: [
				"odd:bg-blue-950/90",
			],
		},
		"tone.link.dark.accent": {
			class: [
				"bg-blue-900/50",
			],
		},
		"tone.link.dark.from": {
			class: [
				"from-blue-900/50",
			],
		},
		"tone.link.dark.to": {
			class: [
				"to-blue-900/50",
			],
		},
		"tone.link.dark.border": {
			class: [
				"border-blue-500/60",
				"border-b-blue-500/80",
			],
		},
		"tone.link.dark.border:hover": {
			class: [
				"hover:border-blue-400/70",
				"hover:border-b-blue-400/90",
			],
		},
		"tone.link.dark.border:group-hover": {
			class: [
				"group-hover:border-blue-400/70",
				"group-hover:border-b-blue-400/90",
			],
		},
		"tone.link.dark.shadow": {
			class: [
				"shadow-blue-900/40",
			],
		},
		"tone.link.dark.shadow:hover": {
			class: [
				"hover:shadow-blue-800/50",
			],
		} /**
		 * Tone Sets - Complete style collections (without :even/:odd)
		 */,
		"tone.primary.light.set": {
			token: [
				"tone.primary.light.text",
				"tone.primary.light.text:hover",
				"tone.primary.light.text",
				"tone.primary.light.bg",
				"tone.primary.light.bg:hover",
				"tone.primary.light.bg",
				"tone.primary.light.border",
				"tone.primary.light.border:hover",
				"tone.primary.light.border",
				"tone.primary.light.border:group-hover",
				"tone.primary.light.shadow",
				"tone.primary.light.shadow:hover",
				"tone.primary.light.shadow",
			],
		},
		"tone.primary.dark.set": {
			token: [
				"tone.primary.dark.text",
				"tone.primary.dark.text:hover",
				"tone.primary.dark.text",
				"tone.primary.dark.bg",
				"tone.primary.dark.bg:hover",
				"tone.primary.dark.bg",
				"tone.primary.dark.border",
				"tone.primary.dark.border:hover",
				"tone.primary.dark.border",
				"tone.primary.dark.border:group-hover",
				"tone.primary.dark.shadow",
				"tone.primary.dark.shadow:hover",
				"tone.primary.dark.shadow",
			],
		},
		"tone.secondary.light.set": {
			token: [
				"tone.secondary.light.text",
				"tone.secondary.light.text:hover",
				"tone.secondary.light.bg",
				"tone.secondary.light.bg:hover",
				"tone.secondary.light.bg",
				"tone.secondary.light.border",
				"tone.secondary.light.border:hover",
				"tone.secondary.light.border",
				"tone.secondary.light.border:group-hover",
				"tone.secondary.light.shadow",
				"tone.secondary.light.shadow:hover",
				"tone.secondary.light.shadow",
			],
		},
		"tone.secondary.dark.set": {
			token: [
				"tone.secondary.dark.text",
				"tone.secondary.dark.text:hover",
				"tone.secondary.dark.text",
				"tone.secondary.dark.bg",
				"tone.secondary.dark.bg:hover",
				"tone.secondary.dark.bg",
				"tone.secondary.dark.border",
				"tone.secondary.dark.border:hover",
				"tone.secondary.dark.border",
				"tone.secondary.dark.border:group-hover",
				"tone.secondary.dark.shadow",
				"tone.secondary.dark.shadow:hover",
				"tone.secondary.dark.shadow",
			],
		},
		"tone.danger.light.set": {
			token: [
				"tone.danger.light.text",
				"tone.danger.light.text:hover",
				"tone.danger.light.text",
				"tone.danger.light.bg",
				"tone.danger.light.bg:hover",
				"tone.danger.light.bg",
				"tone.danger.light.border",
				"tone.danger.light.border:hover",
				"tone.danger.light.border",
				"tone.danger.light.border:group-hover",
				"tone.danger.light.shadow",
				"tone.danger.light.shadow:hover",
				"tone.danger.light.shadow",
			],
		},
		"tone.danger.dark.set": {
			token: [
				"tone.danger.dark.text",
				"tone.danger.dark.text:hover",
				"tone.danger.dark.text",
				"tone.danger.dark.bg",
				"tone.danger.dark.bg:hover",
				"tone.danger.dark.bg",
				"tone.danger.dark.border",
				"tone.danger.dark.border:hover",
				"tone.danger.dark.border",
				"tone.danger.dark.border:group-hover",
				"tone.danger.dark.shadow",
				"tone.danger.dark.shadow:hover",
				"tone.danger.dark.shadow",
			],
		},
		"tone.warning.light.set": {
			token: [
				"tone.warning.light.text",
				"tone.warning.light.text:hover",
				"tone.warning.light.text",
				"tone.warning.light.bg",
				"tone.warning.light.bg:hover",
				"tone.warning.light.bg",
				"tone.warning.light.border",
				"tone.warning.light.border:hover",
				"tone.warning.light.border",
				"tone.warning.light.border:group-hover",
				"tone.warning.light.shadow",
				"tone.warning.light.shadow:hover",
				"tone.warning.light.shadow",
			],
		},
		"tone.warning.dark.set": {
			token: [
				"tone.warning.dark.text",
				"tone.warning.dark.text:hover",
				"tone.warning.dark.text",
				"tone.warning.dark.bg",
				"tone.warning.dark.bg:hover",
				"tone.warning.dark.bg",
				"tone.warning.dark.border",
				"tone.warning.dark.border:hover",
				"tone.warning.dark.border",
				"tone.warning.dark.border:group-hover",
				"tone.warning.dark.shadow",
				"tone.warning.dark.shadow:hover",
				"tone.warning.dark.shadow",
			],
		},
		"tone.subtle.light.set": {
			token: [
				"tone.subtle.light.text",
				"tone.subtle.light.text:hover",
				"tone.subtle.light.text",
				"tone.subtle.light.bg",
				"tone.subtle.light.bg:hover",
				"tone.subtle.light.bg",
				"tone.subtle.light.border",
				"tone.subtle.light.border:hover",
				"tone.subtle.light.border",
				"tone.subtle.light.border:group-hover",
				"tone.subtle.light.shadow",
				"tone.subtle.light.shadow:hover",
				"tone.subtle.light.shadow",
			],
		},
		"tone.subtle.dark.set": {
			token: [
				"tone.subtle.dark.text",
				"tone.subtle.dark.text:hover",
				"tone.subtle.dark.text",
				"tone.subtle.dark.bg",
				"tone.subtle.dark.bg:hover",
				"tone.subtle.dark.bg",
				"tone.subtle.dark.border",
				"tone.subtle.dark.border:hover",
				"tone.subtle.dark.border",
				"tone.subtle.dark.border:group-hover",
				"tone.subtle.dark.shadow",
				"tone.subtle.dark.shadow:hover",
				"tone.subtle.dark.shadow",
			],
		},
		"tone.neutral.light.set": {
			token: [
				"tone.neutral.light.text",
				"tone.neutral.light.text:hover",
				"tone.neutral.light.text",
				"tone.neutral.light.bg",
				"tone.neutral.light.bg:hover",
				"tone.neutral.light.bg",
				"tone.neutral.light.border",
				"tone.neutral.light.border:hover",
				"tone.neutral.light.border",
				"tone.neutral.light.border:group-hover",
				"tone.neutral.light.shadow",
				"tone.neutral.light.shadow:hover",
				"tone.neutral.light.shadow",
			],
		},
		"tone.neutral.dark.set": {
			token: [
				"tone.neutral.dark.text",
				"tone.neutral.dark.text:hover",
				"tone.neutral.dark.text",
				"tone.neutral.dark.bg",
				"tone.neutral.dark.bg:hover",
				"tone.neutral.dark.bg",
				"tone.neutral.dark.border",
				"tone.neutral.dark.border:hover",
				"tone.neutral.dark.border",
				"tone.neutral.dark.border:group-hover",
				"tone.neutral.dark.shadow",
				"tone.neutral.dark.shadow:hover",
				"tone.neutral.dark.shadow",
			],
		},
		"tone.link.light.set": {
			token: [
				"tone.link.light.text",
				"tone.link.light.text:hover",
				"tone.link.light.text",
				"tone.link.light.bg",
				"tone.link.light.bg:hover",
				"tone.link.light.bg",
				"tone.link.light.border",
				"tone.link.light.border:hover",
				"tone.link.light.border",
				"tone.link.light.border:group-hover",
				"tone.link.light.shadow",
				"tone.link.light.shadow:hover",
				"tone.link.light.shadow",
			],
		},
		"tone.link.dark.set": {
			token: [
				"tone.link.dark.text",
				"tone.link.dark.text:hover",
				"tone.link.dark.text",
				"tone.link.dark.bg",
				"tone.link.dark.bg:hover",
				"tone.link.dark.bg",
				"tone.link.dark.border",
				"tone.link.dark.border:hover",
				"tone.link.dark.border",
				"tone.link.dark.border:group-hover",
				"tone.link.dark.shadow",
				"tone.link.dark.shadow:hover",
				"tone.link.dark.shadow",
			],
		},
		/**
		 * Rounding
		 */
		"round.default": {
			class: [
				"rounded-md",
			],
		},
		"round.sm": {
			class: [
				"rounded-sm",
			],
		},
		"round.md": {
			class: [
				"rounded-md",
			],
		},
		"round.lg": {
			class: [
				"rounded-lg",
			],
		},
		"round.xl": {
			class: [
				"rounded-xl",
			],
		},
		"round.full": {
			class: [
				"rounded-full",
			],
		},
		/**
		 * Border
		 */
		"border.default": {
			class: [
				"border-1",
				"border-b-2",
			],
		},
		"border.default:hover": {
			class: [
				"hover:border-1",
				"hover:border-b-2",
			],
		},
		"border.sm": {
			class: [
				"border-b-2",
			],
		},
		"border.md": {
			class: [
				"border-b-3",
			],
		},
		"border.lg": {
			class: [
				"border-b-4",
			],
		},
		"border.xl": {
			class: [
				"border-b-5",
			],
		},
		/**
		 * Sizes
		 */
		"size.xs": {
			class: [
				"h-6",
				"px-2",
				"text-xs",
			],
		},
		"size.sm": {
			class: [
				"h-8",
				"px-3",
				"text-sm",
			],
		},
		"size.md": {
			class: [
				"h-10",
				"px-4",
				"text-base",
			],
		},
		"size.lg": {
			class: [
				"h-12",
				"px-6",
				"text-lg",
			],
		},
		"size.xl": {
			class: [
				"h-16",
				"px-8",
				"text-xl",
			],
		},
		//
		"padding.xs": {
			class: [
				"px-2",
				"py-1",
			],
		},
		"padding.sm": {
			class: [
				"px-3",
				"py-1.5",
			],
		},
		"padding.md": {
			class: [
				"px-4",
				"py-2",
			],
		},
		"padding.lg": {
			class: [
				"px-6",
				"py-3",
			],
		},
		"padding.xl": {
			class: [
				"px-8",
				"py-4",
			],
		},
		//
		"square.xs": {
			class: [
				"p-1",
			],
		},
		"square.sm": {
			class: [
				"p-1.5",
			],
		},
		"square.md": {
			class: [
				"p-2",
			],
		},
		"square.lg": {
			class: [
				"p-3",
			],
		},
		"square.xl": {
			class: [
				"p-4",
			],
		},
		//
		"icon.xs": {
			class: [
				"w-6",
				"h-6",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"icon.sm": {
			class: [
				"w-8",
				"h-8",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"icon.md": {
			class: [
				"w-10",
				"h-10",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"icon.lg": {
			class: [
				"w-12",
				"h-12",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"icon.xl": {
			class: [
				"w-16",
				"h-16",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		//
		"inner-icon.xs": {
			class: [
				"w-4",
				"h-4",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"inner-icon.sm": {
			class: [
				"w-6",
				"h-6",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"inner-icon.md": {
			class: [
				"w-8",
				"h-8",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"inner-icon.lg": {
			class: [
				"w-10",
				"h-10",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"inner-icon.xl": {
			class: [
				"w-14",
				"h-14",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"inner-icon.2xl": {
			class: [
				"w-16",
				"h-16",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"inner-icon.3xl": {
			class: [
				"w-20",
				"h-20",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		"inner-icon.4xl": {
			class: [
				"w-24",
				"h-24",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			],
		},
		/**
		 * Scale
		 */
		"scale.default": {
			class: [
				"active:scale-97",
				"hover:scale-105",
			],
		},
		"scale.sm": {
			class: [
				"active:scale-97",
				"hover:scale-102",
			],
		},
		"scale.md": {
			class: [
				"active:scale-97",
				"hover:scale-105",
			],
		},
		"scale.lg": {
			class: [
				"active:scale-97",
				"hover:scale-107",
			],
		},
		/**
		 * Shadows
		 */
		"shadow.default": {
			class: [
				"shadow-sm",
			],
		},
		"shadow.sm": {
			class: [
				"shadow-sm",
			],
		},
		"shadow.md": {
			class: [
				"shadow-md",
			],
		},
		"shadow.lg": {
			class: [
				"shadow-lg",
			],
		},
		"shadow.xl": {
			class: [
				"shadow-xl",
			],
		},
		/**
		 * Focus
		 */
		"focus.off": {
			class: [
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
		"focus.ring": {
			class: [
				"outline-none",
				"focus:outline-none",
				"focus-visible:outline-none",
				"ring-2",
				"focus:ring-2",
				"focus:ring-indigo-500",
				"focus:ring-offset-2",
				"focus-visible:ring-2",
				"focus-visible:ring-indigo-500",
				"focus-visible:ring-offset-2",
			],
		},
		/**
		 * Misc
		 */
		disabled: {
			class: [
				"opacity-60",
				"pointer-events-none",
				"shadow-none",
			],
		},
	})
	.defaults({
		tone: "unset",
		theme: "unset",
	})
	.cls();

export type PicoCls = typeof PicoCls;
