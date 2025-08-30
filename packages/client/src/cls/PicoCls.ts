import { cls } from "@use-pico/cls";

/**
 * Root theme configuration for Pico, all components
 * will inherit from this theme.
 *
 * Design System Structure:
 * - Tones: primary, secondary, subtle, neutral
 * - Elements: text, background, border, shadow
 * - States: default, :hover, :focus, :even, :odd
 * - Themes: light, dark
 */
export const PicoCls = cls(
	{
		tokens: [
			/**
			 * Primary Tone
			 */
			"tone.primary.light.text",
			"tone.primary.light.text:hover",
			"tone.primary.light.text:focus",
			"tone.primary.light.bg",
			"tone.primary.light.bg:hover",
			"tone.primary.light.bg:focus",
			"tone.primary.light.bg:even",
			"tone.primary.light.bg:odd",
			"tone.primary.light.border",
			"tone.primary.light.border:hover",
			"tone.primary.light.border:focus",
			"tone.primary.light.border:group-hover",
			"tone.primary.light.shadow",
			"tone.primary.light.shadow:hover",
			"tone.primary.light.shadow:focus",
			"tone.primary.light.set",
			//
			"tone.primary.dark.text",
			"tone.primary.dark.text:hover",
			"tone.primary.dark.text:focus",
			"tone.primary.dark.bg",
			"tone.primary.dark.bg:hover",
			"tone.primary.dark.bg:focus",
			"tone.primary.dark.bg:even",
			"tone.primary.dark.bg:odd",
			"tone.primary.dark.border",
			"tone.primary.dark.border:hover",
			"tone.primary.dark.border:focus",
			"tone.primary.dark.border:group-hover",
			"tone.primary.dark.shadow",
			"tone.primary.dark.shadow:hover",
			"tone.primary.dark.shadow:focus",
			"tone.primary.dark.set",
			/**
			 * Secondary Tone
			 */
			"tone.secondary.light.text",
			"tone.secondary.light.text:hover",
			"tone.secondary.light.text:focus",
			"tone.secondary.light.bg",
			"tone.secondary.light.bg:hover",
			"tone.secondary.light.bg:focus",
			"tone.secondary.light.bg:even",
			"tone.secondary.light.bg:odd",
			"tone.secondary.light.border",
			"tone.secondary.light.border:hover",
			"tone.secondary.light.border:focus",
			"tone.secondary.light.border:group-hover",
			"tone.secondary.light.shadow",
			"tone.secondary.light.shadow:hover",
			"tone.secondary.light.shadow:focus",
			"tone.secondary.light.set",
			//
			"tone.secondary.dark.text",
			"tone.secondary.dark.text:hover",
			"tone.secondary.dark.text:focus",
			"tone.secondary.dark.bg",
			"tone.secondary.dark.bg:hover",
			"tone.secondary.dark.bg:focus",
			"tone.secondary.dark.bg:even",
			"tone.secondary.dark.bg:odd",
			"tone.secondary.dark.border",
			"tone.secondary.dark.border:hover",
			"tone.secondary.dark.border:focus",
			"tone.secondary.dark.border:group-hover",
			"tone.secondary.dark.shadow",
			"tone.secondary.dark.shadow:hover",
			"tone.secondary.dark.shadow:focus",
			"tone.secondary.dark.set",
			/**
			 * Danger Tone
			 */
			"tone.danger.light.text",
			"tone.danger.light.text:hover",
			"tone.danger.light.text:focus",
			"tone.danger.light.bg",
			"tone.danger.light.bg:hover",
			"tone.danger.light.bg:focus",
			"tone.danger.light.bg:even",
			"tone.danger.light.bg:odd",
			"tone.danger.light.border",
			"tone.danger.light.border:hover",
			"tone.danger.light.border:focus",
			"tone.danger.light.border:group-hover",
			"tone.danger.light.shadow",
			"tone.danger.light.shadow:hover",
			"tone.danger.light.shadow:focus",
			"tone.danger.light.set",
			//
			"tone.danger.dark.text",
			"tone.danger.dark.text:hover",
			"tone.danger.dark.text:focus",
			"tone.danger.dark.bg",
			"tone.danger.dark.bg:hover",
			"tone.danger.dark.bg:focus",
			"tone.danger.dark.bg:even",
			"tone.danger.dark.bg:odd",
			"tone.danger.dark.border",
			"tone.danger.dark.border:hover",
			"tone.danger.dark.border:focus",
			"tone.danger.dark.border:group-hover",
			"tone.danger.dark.shadow",
			"tone.danger.dark.shadow:hover",
			"tone.danger.dark.shadow:focus",
			"tone.danger.dark.set",
			/**
			 * Warning Tone
			 */
			"tone.warning.light.text",
			"tone.warning.light.text:hover",
			"tone.warning.light.text:focus",
			"tone.warning.light.bg",
			"tone.warning.light.bg:hover",
			"tone.warning.light.bg:focus",
			"tone.warning.light.bg:even",
			"tone.warning.light.bg:odd",
			"tone.warning.light.border",
			"tone.warning.light.border:hover",
			"tone.warning.light.border:focus",
			"tone.warning.light.border:group-hover",
			"tone.warning.light.shadow",
			"tone.warning.light.shadow:hover",
			"tone.warning.light.shadow:focus",
			"tone.warning.light.set",
			//
			"tone.warning.dark.text",
			"tone.warning.dark.text:hover",
			"tone.warning.dark.text:focus",
			"tone.warning.dark.bg",
			"tone.warning.dark.bg:hover",
			"tone.warning.dark.bg:focus",
			"tone.warning.dark.bg:even",
			"tone.warning.dark.bg:odd",
			"tone.warning.dark.border",
			"tone.warning.dark.border:hover",
			"tone.warning.dark.border:focus",
			"tone.warning.dark.border:group-hover",
			"tone.warning.dark.shadow",
			"tone.warning.dark.shadow:hover",
			"tone.warning.dark.shadow:focus",
			"tone.warning.dark.set",
			/**
			 * Subtle Tone
			 */
			"tone.subtle.light.text",
			"tone.subtle.light.text:hover",
			"tone.subtle.light.text:focus",
			"tone.subtle.light.bg",
			"tone.subtle.light.bg:hover",
			"tone.subtle.light.bg:focus",
			"tone.subtle.light.bg:even",
			"tone.subtle.light.bg:odd",
			"tone.subtle.light.border",
			"tone.subtle.light.border:hover",
			"tone.subtle.light.border:focus",
			"tone.subtle.light.border:group-hover",
			"tone.subtle.light.shadow",
			"tone.subtle.light.shadow:hover",
			"tone.subtle.light.shadow:focus",
			"tone.subtle.light.set",
			//
			"tone.subtle.dark.text",
			"tone.subtle.dark.text:hover",
			"tone.subtle.dark.text:focus",
			"tone.subtle.dark.bg",
			"tone.subtle.dark.bg:hover",
			"tone.subtle.dark.bg:focus",
			"tone.subtle.dark.bg:even",
			"tone.subtle.dark.bg:odd",
			"tone.subtle.dark.border",
			"tone.subtle.dark.border:hover",
			"tone.subtle.dark.border:focus",
			"tone.subtle.dark.border:group-hover",
			"tone.subtle.dark.shadow",
			"tone.subtle.dark.shadow:hover",
			"tone.subtle.dark.shadow:focus",
			"tone.subtle.dark.set",
			/**
			 * Neutral Tone
			 */
			"tone.neutral.light.text",
			"tone.neutral.light.text:hover",
			"tone.neutral.light.text:focus",
			"tone.neutral.light.bg",
			"tone.neutral.light.bg:hover",
			"tone.neutral.light.bg:focus",
			"tone.neutral.light.bg:even",
			"tone.neutral.light.bg:odd",
			"tone.neutral.light.border",
			"tone.neutral.light.border:hover",
			"tone.neutral.light.border:focus",
			"tone.neutral.light.border:group-hover",
			"tone.neutral.light.shadow",
			"tone.neutral.light.shadow:hover",
			"tone.neutral.light.shadow:focus",
			"tone.neutral.light.set",
			//
			"tone.neutral.dark.text",
			"tone.neutral.dark.text:hover",
			"tone.neutral.dark.text:focus",
			"tone.neutral.dark.bg",
			"tone.neutral.dark.bg:hover",
			"tone.neutral.dark.bg:focus",
			"tone.neutral.dark.bg:even",
			"tone.neutral.dark.bg:odd",
			"tone.neutral.dark.border",
			"tone.neutral.dark.border:hover",
			"tone.neutral.dark.border:focus",
			"tone.neutral.dark.border:group-hover",
			"tone.neutral.dark.shadow",
			"tone.neutral.dark.shadow:hover",
			"tone.neutral.dark.shadow:focus",
			"tone.neutral.dark.set",
			/**
			 * Link Tone
			 */
			"tone.link.light.text",
			"tone.link.light.text:hover",
			"tone.link.light.text:focus",
			"tone.link.light.bg",
			"tone.link.light.bg:hover",
			"tone.link.light.bg:focus",
			"tone.link.light.bg:even",
			"tone.link.light.bg:odd",
			"tone.link.light.border",
			"tone.link.light.border:hover",
			"tone.link.light.border:focus",
			"tone.link.light.border:group-hover",
			"tone.link.light.shadow",
			"tone.link.light.shadow:hover",
			"tone.link.light.shadow:focus",
			"tone.link.light.set",
			//
			"tone.link.dark.text",
			"tone.link.dark.text:hover",
			"tone.link.dark.text:focus",
			"tone.link.dark.bg",
			"tone.link.dark.bg:hover",
			"tone.link.dark.bg:focus",
			"tone.link.dark.bg:even",
			"tone.link.dark.bg:odd",
			"tone.link.dark.border",
			"tone.link.dark.border:hover",
			"tone.link.dark.border:focus",
			"tone.link.dark.border:group-hover",
			"tone.link.dark.shadow",
			"tone.link.dark.shadow:hover",
			"tone.link.dark.shadow:focus",
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
		],
		slot: [],
		variant: {},
	},
	({ def, what }) => ({
		token: def.token({
			/**
			 * Primary Tone - Modern Indigo/Purple
			 */
			"tone.primary.light.text": what.css([
				"text-indigo-700",
			]),
			"tone.primary.light.text:hover": what.css([
				"hover:text-indigo-800",
			]),
			"tone.primary.light.text:focus": what.css([
				"focus:text-indigo-800",
			]),
			"tone.primary.light.bg": what.css([
				"bg-indigo-100",
			]),
			"tone.primary.light.bg:hover": what.css([
				"hover:bg-indigo-200",
			]),
			"tone.primary.light.bg:focus": what.css([
				"focus:bg-indigo-200",
			]),
			"tone.primary.light.bg:even": what.css([
				"even:bg-indigo-100",
			]),
			"tone.primary.light.bg:odd": what.css([
				"odd:bg-indigo-50",
			]),
			"tone.primary.light.border": what.css([
				"border-indigo-200/60",
				"border-b-indigo-200",
			]),
			"tone.primary.light.border:hover": what.css([
				"hover:border-indigo-300/60",
				"hover:border-b-indigo-300",
			]),
			"tone.primary.light.border:focus": what.css([
				"focus:border-indigo-300/60",
				"focus:border-b-indigo-300",
			]),
			"tone.primary.light.border:group-hover": what.css([
				"group-hover:border-indigo-300/60",
				"group-hover:border-b-indigo-300",
			]),
			"tone.primary.light.shadow": what.css([
				"shadow-indigo-200/50",
			]),
			"tone.primary.light.shadow:hover": what.css([
				"hover:shadow-indigo-300/60",
			]),
			"tone.primary.light.shadow:focus": what.css([
				"focus:shadow-indigo-300/60",
			]),
			//
			"tone.primary.dark.text": what.css([
				"text-violet-100",
			]),
			"tone.primary.dark.text:hover": what.css([
				"hover:text-violet-50",
			]),
			"tone.primary.dark.text:focus": what.css([
				"focus:text-violet-50",
			]),
			"tone.primary.dark.bg": what.css([
				"bg-violet-900/90",
			]),
			"tone.primary.dark.bg:hover": what.css([
				"hover:bg-violet-800/90",
			]),
			"tone.primary.dark.bg:focus": what.css([
				"focus:bg-violet-800/90",
			]),
			"tone.primary.dark.bg:even": what.css([
				"even:bg-violet-800/80",
			]),
			"tone.primary.dark.bg:odd": what.css([
				"odd:bg-violet-950/90",
			]),
			"tone.primary.dark.border": what.css([
				"border-violet-400/60",
				"border-b-violet-400/80",
			]),
			"tone.primary.dark.border:hover": what.css([
				"hover:border-violet-300/70",
				"hover:border-b-violet-300/90",
			]),
			"tone.primary.dark.border:focus": what.css([
				"focus:border-violet-300/70",
				"focus:border-b-violet-300/90",
			]),
			"tone.primary.dark.border:group-hover": what.css([
				"group-hover:border-violet-300/70",
				"group-hover:border-b-violet-300/90",
			]),
			"tone.primary.dark.shadow": what.css([
				"shadow-violet-900/40",
			]),
			"tone.primary.dark.shadow:hover": what.css([
				"hover:shadow-violet-800/50",
			]),
			"tone.primary.dark.shadow:focus": what.css([
				"focus:shadow-violet-800/50",
			]),
			/**
			 * Secondary Tone - Modern Teal/Cyan
			 */
			"tone.secondary.light.text": what.css([
				"text-teal-700",
			]),
			"tone.secondary.light.text:hover": what.css([
				"hover:text-teal-800",
			]),
			"tone.secondary.light.text:focus": what.css([
				"focus:text-teal-800",
			]),
			"tone.secondary.light.bg": what.css([
				"bg-teal-100",
			]),
			"tone.secondary.light.bg:hover": what.css([
				"hover:bg-teal-200",
			]),
			"tone.secondary.light.bg:focus": what.css([
				"focus:bg-teal-200",
			]),
			"tone.secondary.light.bg:even": what.css([
				"even:bg-teal-100",
			]),
			"tone.secondary.light.bg:odd": what.css([
				"odd:bg-teal-50",
			]),
			"tone.secondary.light.border": what.css([
				"border-teal-200/60",
				"border-b-teal-200",
			]),
			"tone.secondary.light.border:hover": what.css([
				"hover:border-teal-300/60",
				"hover:border-b-teal-300",
			]),
			"tone.secondary.light.border:focus": what.css([
				"focus:border-teal-300/60",
				"focus:border-b-teal-300",
			]),
			"tone.secondary.light.border:group-hover": what.css([
				"group-hover:border-teal-300/60",
				"group-hover:border-b-teal-300",
			]),
			"tone.secondary.light.shadow": what.css([
				"shadow-teal-200/50",
			]),
			"tone.secondary.light.shadow:hover": what.css([
				"hover:shadow-teal-300/60",
			]),
			"tone.secondary.light.shadow:focus": what.css([
				"focus:shadow-teal-300/60",
			]),
			//
			"tone.secondary.dark.text": what.css([
				"text-cyan-100",
			]),
			"tone.secondary.dark.text:hover": what.css([
				"hover:text-cyan-50",
			]),
			"tone.secondary.dark.text:focus": what.css([
				"focus:text-cyan-50",
			]),
			"tone.secondary.dark.bg": what.css([
				"bg-teal-900/90",
			]),
			"tone.secondary.dark.bg:hover": what.css([
				"hover:bg-teal-800/90",
			]),
			"tone.secondary.dark.bg:focus": what.css([
				"focus:bg-teal-800/90",
			]),
			"tone.secondary.dark.bg:even": what.css([
				"even:bg-teal-800/80",
			]),
			"tone.secondary.dark.bg:odd": what.css([
				"odd:bg-teal-950/90",
			]),
			"tone.secondary.dark.border": what.css([
				"border-teal-500/60",
				"border-b-teal-500/80",
			]),
			"tone.secondary.dark.border:hover": what.css([
				"hover:border-teal-400/70",
				"hover:border-b-teal-400/90",
			]),
			"tone.secondary.dark.border:focus": what.css([
				"focus:border-teal-400/70",
				"focus:border-b-teal-400/90",
			]),
			"tone.secondary.dark.border:group-hover": what.css([
				"group-hover:border-teal-400/70",
				"group-hover:border-b-teal-400/90",
			]),
			"tone.secondary.dark.shadow": what.css([
				"shadow-teal-900/40",
			]),
			"tone.secondary.dark.shadow:hover": what.css([
				"hover:shadow-teal-800/50",
			]),
			"tone.secondary.dark.shadow:focus": what.css([
				"focus:shadow-teal-800/50",
			]),
			/**
			 * Danger Tone - Modern Rose/Red
			 */
			"tone.danger.light.text": what.css([
				"text-rose-700",
			]),
			"tone.danger.light.text:hover": what.css([
				"hover:text-rose-800",
			]),
			"tone.danger.light.text:focus": what.css([
				"focus:text-rose-800",
			]),
			"tone.danger.light.bg": what.css([
				"bg-rose-100",
			]),
			"tone.danger.light.bg:hover": what.css([
				"hover:bg-rose-200",
			]),
			"tone.danger.light.bg:focus": what.css([
				"focus:bg-rose-200",
			]),
			"tone.danger.light.bg:even": what.css([
				"even:bg-rose-100",
			]),
			"tone.danger.light.bg:odd": what.css([
				"odd:bg-rose-50",
			]),
			"tone.danger.light.border": what.css([
				"border-rose-200/60",
				"border-b-rose-200",
			]),
			"tone.danger.light.border:hover": what.css([
				"hover:border-rose-300/60",
				"hover:border-b-rose-300",
			]),
			"tone.danger.light.border:focus": what.css([
				"focus:border-rose-300/60",
				"focus:border-b-rose-300",
			]),
			"tone.danger.light.border:group-hover": what.css([
				"group-hover:border-rose-300/60",
				"group-hover:border-b-rose-300",
			]),
			"tone.danger.light.shadow": what.css([
				"shadow-rose-200/50",
			]),
			"tone.danger.light.shadow:hover": what.css([
				"hover:shadow-rose-300/60",
			]),
			"tone.danger.light.shadow:focus": what.css([
				"focus:shadow-rose-300/60",
			]),
			//
			"tone.danger.dark.text": what.css([
				"text-rose-100",
			]),
			"tone.danger.dark.text:hover": what.css([
				"hover:text-rose-50",
			]),
			"tone.danger.dark.text:focus": what.css([
				"focus:text-rose-50",
			]),
			"tone.danger.dark.bg": what.css([
				"bg-rose-900/90",
			]),
			"tone.danger.dark.bg:hover": what.css([
				"hover:bg-rose-800/90",
			]),
			"tone.danger.dark.bg:focus": what.css([
				"focus:bg-rose-800/90",
			]),
			"tone.danger.dark.bg:even": what.css([
				"even:bg-rose-800/80",
			]),
			"tone.danger.dark.bg:odd": what.css([
				"odd:bg-rose-950/90",
			]),
			"tone.danger.dark.border": what.css([
				"border-rose-500/60",
				"border-b-rose-500/80",
			]),
			"tone.danger.dark.border:hover": what.css([
				"hover:border-rose-400/70",
				"hover:border-b-rose-400/90",
			]),
			"tone.danger.dark.border:focus": what.css([
				"focus:border-rose-400/70",
				"focus:border-b-rose-400/90",
			]),
			"tone.danger.dark.border:group-hover": what.css([
				"group-hover:border-rose-400/70",
				"group-hover:border-b-rose-400/90",
			]),
			"tone.danger.dark.shadow": what.css([
				"shadow-rose-900/40",
			]),
			"tone.danger.dark.shadow:hover": what.css([
				"hover:shadow-rose-800/50",
			]),
			"tone.danger.dark.shadow:focus": what.css([
				"focus:shadow-rose-800/50",
			]),
			/**
			 * Warning Tone - Modern Amber/Orange
			 */
			"tone.warning.light.text": what.css([
				"text-amber-700",
			]),
			"tone.warning.light.text:hover": what.css([
				"hover:text-amber-800",
			]),
			"tone.warning.light.text:focus": what.css([
				"focus:text-amber-800",
			]),
			"tone.warning.light.bg": what.css([
				"bg-amber-100",
			]),
			"tone.warning.light.bg:hover": what.css([
				"hover:bg-amber-200",
			]),
			"tone.warning.light.bg:focus": what.css([
				"focus:bg-amber-200",
			]),
			"tone.warning.light.bg:even": what.css([
				"even:bg-amber-100",
			]),
			"tone.warning.light.bg:odd": what.css([
				"odd:bg-amber-50",
			]),
			"tone.warning.light.border": what.css([
				"border-amber-200/60",
				"border-b-amber-200",
			]),
			"tone.warning.light.border:hover": what.css([
				"hover:border-amber-300/60",
				"hover:border-b-amber-300",
			]),
			"tone.warning.light.border:focus": what.css([
				"focus:border-amber-300/60",
				"focus:border-b-amber-300",
			]),
			"tone.warning.light.border:group-hover": what.css([
				"group-hover:border-amber-300/60",
				"group-hover:border-b-amber-300",
			]),
			"tone.warning.light.shadow": what.css([
				"shadow-amber-200/50",
			]),
			"tone.warning.light.shadow:hover": what.css([
				"hover:shadow-amber-300/60",
			]),
			"tone.warning.light.shadow:focus": what.css([
				"focus:shadow-amber-300/60",
			]),
			//
			"tone.warning.dark.text": what.css([
				"text-amber-100",
			]),
			"tone.warning.dark.text:hover": what.css([
				"hover:text-amber-50",
			]),
			"tone.warning.dark.text:focus": what.css([
				"focus:text-amber-50",
			]),
			"tone.warning.dark.bg": what.css([
				"bg-amber-900/90",
			]),
			"tone.warning.dark.bg:hover": what.css([
				"hover:bg-amber-800/90",
			]),
			"tone.warning.dark.bg:focus": what.css([
				"focus:bg-amber-800/90",
			]),
			"tone.warning.dark.bg:even": what.css([
				"even:bg-amber-800/80",
			]),
			"tone.warning.dark.bg:odd": what.css([
				"odd:bg-amber-950/90",
			]),
			"tone.warning.dark.border": what.css([
				"border-amber-500/60",
				"border-b-amber-500/80",
			]),
			"tone.warning.dark.border:hover": what.css([
				"hover:border-amber-400/70",
				"hover:border-b-amber-400/90",
			]),
			"tone.warning.dark.border:focus": what.css([
				"focus:border-amber-400/70",
				"focus:border-b-amber-400/90",
			]),
			"tone.warning.dark.border:group-hover": what.css([
				"group-hover:border-amber-400/70",
				"group-hover:border-b-amber-400/90",
			]),
			"tone.warning.dark.shadow": what.css([
				"shadow-amber-900/40",
			]),
			"tone.warning.dark.shadow:hover": what.css([
				"hover:shadow-amber-800/50",
			]),
			"tone.warning.dark.shadow:focus": what.css([
				"focus:shadow-amber-800/50",
			]),
			/**
			 * Subtle Tone - Modern Stone/Neutral
			 */
			"tone.subtle.light.text": what.css([
				"text-stone-700",
			]),
			"tone.subtle.light.text:hover": what.css([
				"hover:text-stone-800",
			]),
			"tone.subtle.light.text:focus": what.css([
				"focus:text-stone-800",
			]),
			"tone.subtle.light.bg": what.css([
				"bg-stone-100",
			]),
			"tone.subtle.light.bg:hover": what.css([
				"hover:bg-stone-200",
			]),
			"tone.subtle.light.bg:focus": what.css([
				"focus:bg-stone-200",
			]),
			"tone.subtle.light.bg:even": what.css([
				"even:bg-stone-100",
			]),
			"tone.subtle.light.bg:odd": what.css([
				"odd:bg-stone-50",
			]),
			"tone.subtle.light.border": what.css([
				"border-stone-200/60",
				"border-b-stone-200",
			]),
			"tone.subtle.light.border:hover": what.css([
				"hover:border-stone-300/60",
				"hover:border-b-stone-300",
			]),
			"tone.subtle.light.border:focus": what.css([
				"focus:border-stone-300/60",
				"focus:border-b-stone-300",
			]),
			"tone.subtle.light.border:group-hover": what.css([
				"group-hover:border-stone-300/60",
				"group-hover:border-b-stone-300",
			]),
			"tone.subtle.light.shadow": what.css([
				"shadow-stone-200/50",
			]),
			"tone.subtle.light.shadow:hover": what.css([
				"hover:shadow-stone-300/60",
			]),
			"tone.subtle.light.shadow:focus": what.css([
				"focus:shadow-stone-300/60",
			]),
			//
			"tone.subtle.dark.text": what.css([
				"text-stone-100",
			]),
			"tone.subtle.dark.text:hover": what.css([
				"hover:text-stone-50",
			]),
			"tone.subtle.dark.text:focus": what.css([
				"focus:text-stone-50",
			]),
			"tone.subtle.dark.bg": what.css([
				"bg-stone-900/90",
			]),
			"tone.subtle.dark.bg:hover": what.css([
				"hover:bg-stone-800/90",
			]),
			"tone.subtle.dark.bg:focus": what.css([
				"focus:bg-stone-800/90",
			]),
			"tone.subtle.dark.bg:even": what.css([
				"even:bg-stone-800/80",
			]),
			"tone.subtle.dark.bg:odd": what.css([
				"odd:bg-stone-950/90",
			]),
			"tone.subtle.dark.border": what.css([
				"border-stone-400/60",
				"border-b-stone-400/80",
			]),
			"tone.subtle.dark.border:hover": what.css([
				"hover:border-stone-300/70",
				"hover:border-b-stone-300/90",
			]),
			"tone.subtle.dark.border:focus": what.css([
				"focus:border-stone-300/70",
				"focus:border-b-stone-300/90",
			]),
			"tone.subtle.dark.border:group-hover": what.css([
				"group-hover:border-stone-300/70",
				"group-hover:border-b-stone-300/90",
			]),
			"tone.subtle.dark.shadow": what.css([
				"shadow-stone-900/40",
			]),
			"tone.subtle.dark.shadow:hover": what.css([
				"hover:shadow-stone-800/50",
			]),
			"tone.subtle.dark.shadow:focus": what.css([
				"focus:shadow-stone-800/50",
			]),
			/**
			 * Neutral Tone - Enhanced Slate
			 */
			"tone.neutral.light.text": what.css([
				"text-slate-900",
			]),
			"tone.neutral.light.text:hover": what.css([
				"hover:text-slate-950",
			]),
			"tone.neutral.light.text:focus": what.css([
				"focus:text-slate-950",
			]),
			"tone.neutral.light.bg": what.css([
				"bg-slate-100",
			]),
			"tone.neutral.light.bg:hover": what.css([
				"hover:bg-slate-200",
			]),
			"tone.neutral.light.bg:focus": what.css([
				"focus:bg-slate-200",
			]),
			"tone.neutral.light.bg:even": what.css([
				"even:bg-slate-100",
			]),
			"tone.neutral.light.bg:odd": what.css([
				"odd:bg-slate-50",
			]),
			"tone.neutral.light.border": what.css([
				"border-slate-200/60",
				"border-b-slate-200",
			]),
			"tone.neutral.light.border:hover": what.css([
				"hover:border-slate-300/60",
				"hover:border-b-slate-300",
			]),
			"tone.neutral.light.border:focus": what.css([
				"focus:border-slate-300/60",
				"focus:border-b-slate-300",
			]),
			"tone.neutral.light.border:group-hover": what.css([
				"group-hover:border-slate-300/60",
				"group-hover:border-b-slate-300",
			]),
			"tone.neutral.light.shadow": what.css([
				"shadow-slate-200/50",
			]),
			"tone.neutral.light.shadow:hover": what.css([
				"hover:shadow-slate-300/60",
			]),
			"tone.neutral.light.shadow:focus": what.css([
				"focus:shadow-slate-300/60",
			]),
			//
			"tone.neutral.dark.text": what.css([
				"text-slate-100",
			]),
			"tone.neutral.dark.text:hover": what.css([
				"hover:text-slate-50",
			]),
			"tone.neutral.dark.text:focus": what.css([
				"focus:text-slate-50",
			]),
			"tone.neutral.dark.bg": what.css([
				"bg-slate-900/90",
			]),
			"tone.neutral.dark.bg:hover": what.css([
				"hover:bg-slate-800/90",
			]),
			"tone.neutral.dark.bg:focus": what.css([
				"focus:bg-slate-800/90",
			]),
			"tone.neutral.dark.bg:even": what.css([
				"even:bg-slate-800/80",
			]),
			"tone.neutral.dark.bg:odd": what.css([
				"odd:bg-slate-950/90",
			]),
			"tone.neutral.dark.border": what.css([
				"border-slate-400/60",
				"border-b-slate-400/80",
			]),
			"tone.neutral.dark.border:hover": what.css([
				"hover:border-slate-300/70",
				"hover:border-b-slate-300/90",
			]),
			"tone.neutral.dark.border:focus": what.css([
				"focus:border-slate-300/70",
				"focus:border-b-slate-300/90",
			]),
			"tone.neutral.dark.border:group-hover": what.css([
				"group-hover:border-slate-300/70",
				"group-hover:border-b-slate-300/90",
			]),
			"tone.neutral.dark.shadow": what.css([
				"shadow-slate-900/40",
			]),
			"tone.neutral.dark.shadow:hover": what.css([
				"hover:shadow-slate-800/50",
			]),
			"tone.neutral.dark.shadow:focus": what.css([
				"focus:shadow-slate-800/50",
			]),
			/**
			 * Link Tone - Modern Blue
			 */
			"tone.link.light.text": what.css([
				"text-blue-600",
			]),
			"tone.link.light.text:hover": what.css([
				"hover:text-blue-700",
			]),
			"tone.link.light.text:focus": what.css([
				"focus:text-blue-700",
			]),
			"tone.link.light.bg": what.css([
				"bg-blue-50",
			]),
			"tone.link.light.bg:hover": what.css([
				"hover:bg-blue-100",
			]),
			"tone.link.light.bg:focus": what.css([
				"focus:bg-blue-100",
			]),
			"tone.link.light.bg:even": what.css([
				"even:bg-blue-50",
			]),
			"tone.link.light.bg:odd": what.css([
				"odd:bg-blue-25",
			]),
			"tone.link.light.border": what.css([
				"border-blue-200/60",
				"border-b-blue-200",
			]),
			"tone.link.light.border:hover": what.css([
				"hover:border-blue-300/60",
				"hover:border-b-blue-300",
			]),
			"tone.link.light.border:focus": what.css([
				"focus:border-blue-300/60",
				"focus:border-b-blue-300",
			]),
			"tone.link.light.border:group-hover": what.css([
				"group-hover:border-blue-300/60",
				"group-hover:border-b-blue-300",
			]),
			"tone.link.light.shadow": what.css([
				"shadow-blue-200/50",
			]),
			"tone.link.light.shadow:hover": what.css([
				"hover:shadow-blue-300/60",
			]),
			"tone.link.light.shadow:focus": what.css([
				"focus:shadow-blue-300/60",
			]),
			//
			"tone.link.dark.text": what.css([
				"text-blue-300",
			]),
			"tone.link.dark.text:hover": what.css([
				"hover:text-blue-200",
			]),
			"tone.link.dark.text:focus": what.css([
				"focus:text-blue-200",
			]),
			"tone.link.dark.bg": what.css([
				"bg-blue-900/90",
			]),
			"tone.link.dark.bg:hover": what.css([
				"hover:bg-blue-800/90",
			]),
			"tone.link.dark.bg:focus": what.css([
				"focus:bg-blue-800/90",
			]),
			"tone.link.dark.bg:even": what.css([
				"even:bg-blue-800/80",
			]),
			"tone.link.dark.bg:odd": what.css([
				"odd:bg-blue-950/90",
			]),
			"tone.link.dark.border": what.css([
				"border-blue-500/60",
				"border-b-blue-500/80",
			]),
			"tone.link.dark.border:hover": what.css([
				"hover:border-blue-400/70",
				"hover:border-b-blue-400/90",
			]),
			"tone.link.dark.border:focus": what.css([
				"focus:border-blue-400/70",
				"focus:border-b-blue-400/90",
			]),
			"tone.link.dark.border:group-hover": what.css([
				"group-hover:border-blue-400/70",
				"group-hover:border-b-blue-400/90",
			]),
			"tone.link.dark.shadow": what.css([
				"shadow-blue-900/40",
			]),
			"tone.link.dark.shadow:hover": what.css([
				"hover:shadow-blue-800/50",
			]),
			"tone.link.dark.shadow:focus": what.css([
				"focus:shadow-blue-800/50",
			]),
			/**
			 * Tone Sets - Complete style collections (without :even/:odd)
			 */
			"tone.primary.light.set": what.token([
				"tone.primary.light.text",
				"tone.primary.light.text:hover",
				"tone.primary.light.text:focus",
				"tone.primary.light.bg",
				"tone.primary.light.bg:hover",
				"tone.primary.light.bg:focus",
				"tone.primary.light.border",
				"tone.primary.light.border:hover",
				"tone.primary.light.border:focus",
				"tone.primary.light.border:group-hover",
				"tone.primary.light.shadow",
				"tone.primary.light.shadow:hover",
				"tone.primary.light.shadow:focus",
			]),
			"tone.primary.dark.set": what.token([
				"tone.primary.dark.text",
				"tone.primary.dark.text:hover",
				"tone.primary.dark.text:focus",
				"tone.primary.dark.bg",
				"tone.primary.dark.bg:hover",
				"tone.primary.dark.bg:focus",
				"tone.primary.dark.border",
				"tone.primary.dark.border:hover",
				"tone.primary.dark.border:focus",
				"tone.primary.dark.border:group-hover",
				"tone.primary.dark.shadow",
				"tone.primary.dark.shadow:hover",
				"tone.primary.dark.shadow:focus",
			]),
			"tone.secondary.light.set": what.token([
				"tone.secondary.light.text",
				"tone.secondary.light.text:hover",
				"tone.secondary.light.text:focus",
				"tone.secondary.light.bg",
				"tone.secondary.light.bg:hover",
				"tone.secondary.light.bg:focus",
				"tone.secondary.light.border",
				"tone.secondary.light.border:hover",
				"tone.secondary.light.border:focus",
				"tone.secondary.light.border:group-hover",
				"tone.secondary.light.shadow",
				"tone.secondary.light.shadow:hover",
				"tone.secondary.light.shadow:focus",
			]),
			"tone.secondary.dark.set": what.token([
				"tone.secondary.dark.text",
				"tone.secondary.dark.text:hover",
				"tone.secondary.dark.text:focus",
				"tone.secondary.dark.bg",
				"tone.secondary.dark.bg:hover",
				"tone.secondary.dark.bg:focus",
				"tone.secondary.dark.border",
				"tone.secondary.dark.border:hover",
				"tone.secondary.dark.border:focus",
				"tone.secondary.dark.border:group-hover",
				"tone.secondary.dark.shadow",
				"tone.secondary.dark.shadow:hover",
				"tone.secondary.dark.shadow:focus",
			]),
			"tone.danger.light.set": what.token([
				"tone.danger.light.text",
				"tone.danger.light.text:hover",
				"tone.danger.light.text:focus",
				"tone.danger.light.bg",
				"tone.danger.light.bg:hover",
				"tone.danger.light.bg:focus",
				"tone.danger.light.border",
				"tone.danger.light.border:hover",
				"tone.danger.light.border:focus",
				"tone.danger.light.border:group-hover",
				"tone.danger.light.shadow",
				"tone.danger.light.shadow:hover",
				"tone.danger.light.shadow:focus",
			]),
			"tone.danger.dark.set": what.token([
				"tone.danger.dark.text",
				"tone.danger.dark.text:hover",
				"tone.danger.dark.text:focus",
				"tone.danger.dark.bg",
				"tone.danger.dark.bg:hover",
				"tone.danger.dark.bg:focus",
				"tone.danger.dark.border",
				"tone.danger.dark.border:hover",
				"tone.danger.dark.border:focus",
				"tone.danger.dark.border:group-hover",
				"tone.danger.dark.shadow",
				"tone.danger.dark.shadow:hover",
				"tone.danger.dark.shadow:focus",
			]),
			"tone.warning.light.set": what.token([
				"tone.warning.light.text",
				"tone.warning.light.text:hover",
				"tone.warning.light.text:focus",
				"tone.warning.light.bg",
				"tone.warning.light.bg:hover",
				"tone.warning.light.bg:focus",
				"tone.warning.light.border",
				"tone.warning.light.border:hover",
				"tone.warning.light.border:focus",
				"tone.warning.light.border:group-hover",
				"tone.warning.light.shadow",
				"tone.warning.light.shadow:hover",
				"tone.warning.light.shadow:focus",
			]),
			"tone.warning.dark.set": what.token([
				"tone.warning.dark.text",
				"tone.warning.dark.text:hover",
				"tone.warning.dark.text:focus",
				"tone.warning.dark.bg",
				"tone.warning.dark.bg:hover",
				"tone.warning.dark.bg:focus",
				"tone.warning.dark.border",
				"tone.warning.dark.border:hover",
				"tone.warning.dark.border:focus",
				"tone.warning.dark.border:group-hover",
				"tone.warning.dark.shadow",
				"tone.warning.dark.shadow:hover",
				"tone.warning.dark.shadow:focus",
			]),
			"tone.subtle.light.set": what.token([
				"tone.subtle.light.text",
				"tone.subtle.light.text:hover",
				"tone.subtle.light.text:focus",
				"tone.subtle.light.bg",
				"tone.subtle.light.bg:hover",
				"tone.subtle.light.bg:focus",
				"tone.subtle.light.border",
				"tone.subtle.light.border:hover",
				"tone.subtle.light.border:focus",
				"tone.subtle.light.border:group-hover",
				"tone.subtle.light.shadow",
				"tone.subtle.light.shadow:hover",
				"tone.subtle.light.shadow:focus",
			]),
			"tone.subtle.dark.set": what.token([
				"tone.subtle.dark.text",
				"tone.subtle.dark.text:hover",
				"tone.subtle.dark.text:focus",
				"tone.subtle.dark.bg",
				"tone.subtle.dark.bg:hover",
				"tone.subtle.dark.bg:focus",
				"tone.subtle.dark.border",
				"tone.subtle.dark.border:hover",
				"tone.subtle.dark.border:focus",
				"tone.subtle.dark.border:group-hover",
				"tone.subtle.dark.shadow",
				"tone.subtle.dark.shadow:hover",
				"tone.subtle.dark.shadow:focus",
			]),
			"tone.neutral.light.set": what.token([
				"tone.neutral.light.text",
				"tone.neutral.light.text:hover",
				"tone.neutral.light.text:focus",
				"tone.neutral.light.bg",
				"tone.neutral.light.bg:hover",
				"tone.neutral.light.bg:focus",
				"tone.neutral.light.border",
				"tone.neutral.light.border:hover",
				"tone.neutral.light.border:focus",
				"tone.neutral.light.border:group-hover",
				"tone.neutral.light.shadow",
				"tone.neutral.light.shadow:hover",
				"tone.neutral.light.shadow:focus",
			]),
			"tone.neutral.dark.set": what.token([
				"tone.neutral.dark.text",
				"tone.neutral.dark.text:hover",
				"tone.neutral.dark.text:focus",
				"tone.neutral.dark.bg",
				"tone.neutral.dark.bg:hover",
				"tone.neutral.dark.bg:focus",
				"tone.neutral.dark.border",
				"tone.neutral.dark.border:hover",
				"tone.neutral.dark.border:focus",
				"tone.neutral.dark.border:group-hover",
				"tone.neutral.dark.shadow",
				"tone.neutral.dark.shadow:hover",
				"tone.neutral.dark.shadow:focus",
			]),
			"tone.link.light.set": what.token([
				"tone.link.light.text",
				"tone.link.light.text:hover",
				"tone.link.light.text:focus",
				"tone.link.light.bg",
				"tone.link.light.bg:hover",
				"tone.link.light.bg:focus",
				"tone.link.light.border",
				"tone.link.light.border:hover",
				"tone.link.light.border:focus",
				"tone.link.light.border:group-hover",
				"tone.link.light.shadow",
				"tone.link.light.shadow:hover",
				"tone.link.light.shadow:focus",
			]),
			"tone.link.dark.set": what.token([
				"tone.link.dark.text",
				"tone.link.dark.text:hover",
				"tone.link.dark.text:focus",
				"tone.link.dark.bg",
				"tone.link.dark.bg:hover",
				"tone.link.dark.bg:focus",
				"tone.link.dark.border",
				"tone.link.dark.border:hover",
				"tone.link.dark.border:focus",
				"tone.link.dark.border:group-hover",
				"tone.link.dark.shadow",
				"tone.link.dark.shadow:hover",
				"tone.link.dark.shadow:focus",
			]),
			/**
			 * Rounding
			 */
			"round.default": what.css([
				"rounded-md",
			]),
			"round.sm": what.css([
				"rounded-sm",
			]),
			"round.md": what.css([
				"rounded-md",
			]),
			"round.lg": what.css([
				"rounded-lg",
			]),
			"round.xl": what.css([
				"rounded-xl",
			]),
			"round.full": what.css([
				"rounded-full",
			]),
			/**
			 * Border
			 */
			"border.default": what.css([
				"border-1",
				"border-b-2",
			]),
			"border.default:hover": what.css([
				"hover:border-1",
				"hover:border-b-2",
			]),
			"border.sm": what.css([
				"border-b-2",
			]),
			"border.md": what.css([
				"border-b-3",
			]),
			"border.lg": what.css([
				"border-b-4",
			]),
			/**
			 * Sizes
			 */
			"size.xs": what.css([
				"h-6",
				"px-2",
				"text-xs",
			]),
			"size.sm": what.css([
				"h-8",
				"px-3",
				"text-sm",
			]),
			"size.md": what.css([
				"h-10",
				"px-4",
				"text-base",
			]),
			"size.lg": what.css([
				"h-12",
				"px-6",
				"text-lg",
			]),
			"size.xl": what.css([
				"h-16",
				"px-8",
				"text-xl",
			]),
			//
			"padding.xs": what.css([
				"px-2",
				"py-1",
			]),
			"padding.sm": what.css([
				"px-3",
				"py-1.5",
			]),
			"padding.md": what.css([
				"px-4",
				"py-2",
			]),
			"padding.lg": what.css([
				"px-6",
				"py-3",
			]),
			"padding.xl": what.css([
				"px-8",
				"py-4",
			]),
			//
			"square.xs": what.css([
				"p-1",
			]),
			"square.sm": what.css([
				"p-1.5",
			]),
			"square.md": what.css([
				"p-2",
			]),
			"square.lg": what.css([
				"p-3",
			]),
			"square.xl": what.css([
				"p-4",
			]),
			//
			"icon.xs": what.css([
				"w-6",
				"h-6",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			"icon.sm": what.css([
				"w-8",
				"h-8",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			"icon.md": what.css([
				"w-10",
				"h-10",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			"icon.lg": what.css([
				"w-12",
				"h-12",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			"icon.xl": what.css([
				"w-16",
				"h-16",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			//
			"inner-icon.xs": what.css([
				"w-4",
				"h-4",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			"inner-icon.sm": what.css([
				"w-6",
				"h-6",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			"inner-icon.md": what.css([
				"w-8",
				"h-8",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			"inner-icon.lg": what.css([
				"w-10",
				"h-10",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			"inner-icon.xl": what.css([
				"w-14",
				"h-14",
				"flex-shrink-0",
				"min-w-0",
				"min-h-0",
			]),
			/**
			 * Scale
			 */
			"scale.default": what.css([
				"active:scale-97",
				"hover:scale-105",
			]),
			"scale.sm": what.css([
				"active:scale-97",
				"hover:scale-102",
			]),
			"scale.md": what.css([
				"active:scale-97",
				"hover:scale-105",
			]),
			"scale.lg": what.css([
				"active:scale-97",
				"hover:scale-107",
			]),
			/**
			 * Shadows
			 */
			"shadow.default": what.css([
				"shadow-sm",
			]),
			"shadow.sm": what.css([
				"shadow-sm",
			]),
			"shadow.md": what.css([
				"shadow-md",
			]),
			"shadow.lg": what.css([
				"shadow-lg",
			]),
			"shadow.xl": what.css([
				"shadow-xl",
			]),
			/**
			 * Focus
			 */
			"focus.off": what.css([
				"outline-none",
				"focus:outline-none",
				"focus-visible:outline-none",
				"ring-0",
				"focus:ring-0",
				"focus:ring-transparent",
				"focus-visible:ring-0",
				"focus-visible:ring-transparent",
			]),
			"focus.ring": what.css([
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
			]),
			/**
			 * Misc
			 */
			disabled: what.css([
				"opacity-60",
				"pointer-events-none",
				"shadow-none",
			]),
		}),
		rules: [],
		defaults: def.defaults({}),
	}),
);
