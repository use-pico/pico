import { cls } from "@use-pico/cls";

/**
 * Root theme configuration for Pico, all components
 * will inherit from this theme.
 *
 * Design System Structure:
 * - Tones: primary, secondary, subtle, neutral
 * - Elements: text, background, border, shadow
 * - States: default, :hover, :even, :odd
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
			"tone.primary.light.bg",
			"tone.primary.light.bg:hover",
			"tone.primary.light.bg:even",
			"tone.primary.light.bg:odd",
			"tone.primary.light.border",
			"tone.primary.light.border:hover",
			"tone.primary.light.border:group-hover",
			"tone.primary.light.shadow",
			"tone.primary.light.shadow:hover",
			//
			"tone.primary.dark.text",
			"tone.primary.dark.text:hover",
			"tone.primary.dark.bg",
			"tone.primary.dark.bg:hover",
			"tone.primary.dark.bg:even",
			"tone.primary.dark.bg:odd",
			"tone.primary.dark.border",
			"tone.primary.dark.border:hover",
			"tone.primary.dark.border:group-hover",
			"tone.primary.dark.shadow",
			"tone.primary.dark.shadow:hover",
			/**
			 * Secondary Tone
			 */
			"tone.secondary.light.text",
			"tone.secondary.light.text:hover",
			"tone.secondary.light.bg",
			"tone.secondary.light.bg:hover",
			"tone.secondary.light.bg:even",
			"tone.secondary.light.bg:odd",
			"tone.secondary.light.border",
			"tone.secondary.light.border:hover",
			"tone.secondary.light.border:group-hover",
			"tone.secondary.light.shadow",
			"tone.secondary.light.shadow:hover",
			//
			"tone.secondary.dark.text",
			"tone.secondary.dark.text:hover",
			"tone.secondary.dark.bg",
			"tone.secondary.dark.bg:hover",
			"tone.secondary.dark.bg:even",
			"tone.secondary.dark.bg:odd",
			"tone.secondary.dark.border",
			"tone.secondary.dark.border:hover",
			"tone.secondary.dark.border:group-hover",
			"tone.secondary.dark.shadow",
			"tone.secondary.dark.shadow:hover",
			/**
			 * Danger Tone
			 */
			"tone.danger.light.text",
			"tone.danger.light.text:hover",
			"tone.danger.light.bg",
			"tone.danger.light.bg:hover",
			"tone.danger.light.bg:even",
			"tone.danger.light.bg:odd",
			"tone.danger.light.border",
			"tone.danger.light.border:hover",
			"tone.danger.light.border:group-hover",
			"tone.danger.light.shadow",
			"tone.danger.light.shadow:hover",
			//
			"tone.danger.dark.text",
			"tone.danger.dark.text:hover",
			"tone.danger.dark.bg",
			"tone.danger.dark.bg:hover",
			"tone.danger.dark.bg:even",
			"tone.danger.dark.bg:odd",
			"tone.danger.dark.border",
			"tone.danger.dark.border:hover",
			"tone.danger.dark.border:group-hover",
			"tone.danger.dark.shadow",
			"tone.danger.dark.shadow:hover",
			/**
			 * Warning Tone
			 */
			"tone.warning.light.text",
			"tone.warning.light.text:hover",
			"tone.warning.light.bg",
			"tone.warning.light.bg:hover",
			"tone.warning.light.bg:even",
			"tone.warning.light.bg:odd",
			"tone.warning.light.border",
			"tone.warning.light.border:hover",
			"tone.warning.light.border:group-hover",
			"tone.warning.light.shadow",
			"tone.warning.light.shadow:hover",
			//
			"tone.warning.dark.text",
			"tone.warning.dark.text:hover",
			"tone.warning.dark.bg",
			"tone.warning.dark.bg:hover",
			"tone.warning.dark.bg:even",
			"tone.warning.dark.bg:odd",
			"tone.warning.dark.border",
			"tone.warning.dark.border:hover",
			"tone.warning.dark.border:group-hover",
			"tone.warning.dark.shadow",
			"tone.warning.dark.shadow:hover",
			/**
			 * Subtle Tone
			 */
			"tone.subtle.light.text",
			"tone.subtle.light.text:hover",
			"tone.subtle.light.bg",
			"tone.subtle.light.bg:hover",
			"tone.subtle.light.bg:even",
			"tone.subtle.light.bg:odd",
			"tone.subtle.light.border",
			"tone.subtle.light.border:hover",
			"tone.subtle.light.border:group-hover",
			"tone.subtle.light.shadow",
			"tone.subtle.light.shadow:hover",
			//
			"tone.subtle.dark.text",
			"tone.subtle.dark.text:hover",
			"tone.subtle.dark.bg",
			"tone.subtle.dark.bg:hover",
			"tone.subtle.dark.bg:even",
			"tone.subtle.dark.bg:odd",
			"tone.subtle.dark.border",
			"tone.subtle.dark.border:hover",
			"tone.subtle.dark.border:group-hover",
			"tone.subtle.dark.shadow",
			"tone.subtle.dark.shadow:hover",
			/**
			 * Neutral Tone
			 */
			"tone.neutral.light.text",
			"tone.neutral.light.text:hover",
			"tone.neutral.light.bg",
			"tone.neutral.light.bg:hover",
			"tone.neutral.light.bg:even",
			"tone.neutral.light.bg:odd",
			"tone.neutral.light.border",
			"tone.neutral.light.border:hover",
			"tone.neutral.light.border:group-hover",
			"tone.neutral.light.shadow",
			"tone.neutral.light.shadow:hover",
			//
			"tone.neutral.dark.text",
			"tone.neutral.dark.text:hover",
			"tone.neutral.dark.bg",
			"tone.neutral.dark.bg:hover",
			"tone.neutral.dark.bg:even",
			"tone.neutral.dark.bg:odd",
			"tone.neutral.dark.border",
			"tone.neutral.dark.border:hover",
			"tone.neutral.dark.border:group-hover",
			"tone.neutral.dark.shadow",
			"tone.neutral.dark.shadow:hover",
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
			"border.sm",
			"border.md",
			"border.lg",
			/**
			 * X-Y Padding
			 */
			"padding.xs",
			"padding.sm",
			"padding.md",
			"padding.lg",
			//
			"square.xs",
			"square.sm",
			"square.md",
			"square.lg",
			//
			"icon.xs",
			"icon.sm",
			"icon.md",
			"icon.lg",
			"icon.xl",
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
			"tone.primary.light.bg": what.css([
				"bg-indigo-100",
			]),
			"tone.primary.light.bg:hover": what.css([
				"hover:bg-indigo-200",
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
			//
			"tone.primary.dark.text": what.css([
				"text-violet-100",
			]),
			"tone.primary.dark.text:hover": what.css([
				"hover:text-violet-50",
			]),
			"tone.primary.dark.bg": what.css([
				"bg-violet-900/90",
			]),
			"tone.primary.dark.bg:hover": what.css([
				"hover:bg-violet-800/90",
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
			/**
			 * Secondary Tone - Modern Teal/Cyan
			 */
			"tone.secondary.light.text": what.css([
				"text-teal-700",
			]),
			"tone.secondary.light.text:hover": what.css([
				"hover:text-teal-800",
			]),
			"tone.secondary.light.bg": what.css([
				"bg-teal-100",
			]),
			"tone.secondary.light.bg:hover": what.css([
				"hover:bg-teal-200",
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
			//
			"tone.secondary.dark.text": what.css([
				"text-cyan-100",
			]),
			"tone.secondary.dark.text:hover": what.css([
				"hover:text-cyan-50",
			]),
			"tone.secondary.dark.bg": what.css([
				"bg-teal-900/90",
			]),
			"tone.secondary.dark.bg:hover": what.css([
				"hover:bg-teal-800/90",
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
			/**
			 * Danger Tone - Modern Rose/Red
			 */
			"tone.danger.light.text": what.css([
				"text-rose-700",
			]),
			"tone.danger.light.text:hover": what.css([
				"hover:text-rose-800",
			]),
			"tone.danger.light.bg": what.css([
				"bg-rose-100",
			]),
			"tone.danger.light.bg:hover": what.css([
				"hover:bg-rose-200",
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
			//
			"tone.danger.dark.text": what.css([
				"text-rose-100",
			]),
			"tone.danger.dark.text:hover": what.css([
				"hover:text-rose-50",
			]),
			"tone.danger.dark.bg": what.css([
				"bg-rose-900/90",
			]),
			"tone.danger.dark.bg:hover": what.css([
				"hover:bg-rose-800/90",
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
			/**
			 * Warning Tone - Modern Amber/Orange
			 */
			"tone.warning.light.text": what.css([
				"text-amber-700",
			]),
			"tone.warning.light.text:hover": what.css([
				"hover:text-amber-800",
			]),
			"tone.warning.light.bg": what.css([
				"bg-amber-100",
			]),
			"tone.warning.light.bg:hover": what.css([
				"hover:bg-amber-200",
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
			//
			"tone.warning.dark.text": what.css([
				"text-amber-100",
			]),
			"tone.warning.dark.text:hover": what.css([
				"hover:text-amber-50",
			]),
			"tone.warning.dark.bg": what.css([
				"bg-amber-900/90",
			]),
			"tone.warning.dark.bg:hover": what.css([
				"hover:bg-amber-800/90",
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
			/**
			 * Subtle Tone - Modern Stone/Neutral
			 */
			"tone.subtle.light.text": what.css([
				"text-stone-700",
			]),
			"tone.subtle.light.text:hover": what.css([
				"hover:text-stone-800",
			]),
			"tone.subtle.light.bg": what.css([
				"bg-stone-100",
			]),
			"tone.subtle.light.bg:hover": what.css([
				"hover:bg-stone-200",
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
			//
			"tone.subtle.dark.text": what.css([
				"text-stone-100",
			]),
			"tone.subtle.dark.text:hover": what.css([
				"hover:text-stone-50",
			]),
			"tone.subtle.dark.bg": what.css([
				"bg-stone-900/90",
			]),
			"tone.subtle.dark.bg:hover": what.css([
				"hover:bg-stone-800/90",
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
			/**
			 * Neutral Tone - Enhanced Slate
			 */
			"tone.neutral.light.text": what.css([
				"text-slate-900",
			]),
			"tone.neutral.light.text:hover": what.css([
				"hover:text-slate-950",
			]),
			"tone.neutral.light.bg": what.css([
				"bg-slate-100",
			]),
			"tone.neutral.light.bg:hover": what.css([
				"hover:bg-slate-200",
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
			//
			"tone.neutral.dark.text": what.css([
				"text-slate-100",
			]),
			"tone.neutral.dark.text:hover": what.css([
				"hover:text-slate-50",
			]),
			"tone.neutral.dark.bg": what.css([
				"bg-slate-900/90",
			]),
			"tone.neutral.dark.bg:hover": what.css([
				"hover:bg-slate-800/90",
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
			 * X-Y Padding
			 */
			"padding.xs": what.css([
				"px-2",
				"py-0.5",
			]),
			"padding.sm": what.css([
				"px-2",
				"py-1",
			]),
			"padding.md": what.css([
				"px-6",
				"py-1.5",
			]),
			"padding.lg": what.css([
				"px-12",
				"py-2",
			]),
			//
			"square.xs": what.css([
				"px-1",
				"py-1",
			]),
			"square.sm": what.css([
				"px-2",
				"py-2",
			]),
			"square.md": what.css([
				"px-3",
				"py-3",
			]),
			"square.lg": what.css([
				"px-4",
				"py-4",
			]),
			//
			"icon.xs": what.css([
				"w-2",
				"h-2",
			]),
			"icon.sm": what.css([
				"w-4",
				"h-4",
			]),
			"icon.md": what.css([
				"w-6",
				"h-6",
			]),
			"icon.lg": what.css([
				"w-8",
				"h-8",
			]),
			"icon.xl": what.css([
				"w-12",
				"h-12",
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
