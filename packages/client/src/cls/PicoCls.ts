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
			// =====
			// Primary Tone
			"tone.primary.light.text",
			"tone.primary.light.text:hover",
			"tone.primary.light.bg",
			"tone.primary.light.bg:hover",
			"tone.primary.light.bg:even",
			"tone.primary.light.bg:odd",
			"tone.primary.light.border",
			"tone.primary.light.border:hover",
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
			"tone.primary.dark.shadow",
			"tone.primary.dark.shadow:hover",
			//
			// Secondary Tone
			"tone.secondary.light.text",
			"tone.secondary.light.text:hover",
			"tone.secondary.light.bg",
			"tone.secondary.light.bg:hover",
			"tone.secondary.light.bg:even",
			"tone.secondary.light.bg:odd",
			"tone.secondary.light.border",
			"tone.secondary.light.border:hover",
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
			"tone.secondary.dark.shadow",
			"tone.secondary.dark.shadow:hover",
			//
			// Danger Tone
			"tone.danger.light.text",
			"tone.danger.light.text:hover",
			"tone.danger.light.bg",
			"tone.danger.light.bg:hover",
			"tone.danger.light.bg:even",
			"tone.danger.light.bg:odd",
			"tone.danger.light.border",
			"tone.danger.light.border:hover",
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
			"tone.danger.dark.shadow",
			"tone.danger.dark.shadow:hover",
			//
			// Warning Tone
			"tone.warning.light.text",
			"tone.warning.light.text:hover",
			"tone.warning.light.bg",
			"tone.warning.light.bg:hover",
			"tone.warning.light.bg:even",
			"tone.warning.light.bg:odd",
			"tone.warning.light.border",
			"tone.warning.light.border:hover",
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
			"tone.warning.dark.shadow",
			"tone.warning.dark.shadow:hover",
			//
			// Subtle Tone
			"tone.subtle.light.text",
			"tone.subtle.light.text:hover",
			"tone.subtle.light.bg",
			"tone.subtle.light.bg:hover",
			"tone.subtle.light.bg:even",
			"tone.subtle.light.bg:odd",
			"tone.subtle.light.border",
			"tone.subtle.light.border:hover",
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
			"tone.subtle.dark.shadow",
			"tone.subtle.dark.shadow:hover",
			//
			// Neutral Tone
			"tone.neutral.light.text",
			"tone.neutral.light.text:hover",
			"tone.neutral.light.bg",
			"tone.neutral.light.bg:hover",
			"tone.neutral.light.bg:even",
			"tone.neutral.light.bg:odd",
			"tone.neutral.light.border",
			"tone.neutral.light.border:hover",
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
			"tone.neutral.dark.shadow",
			"tone.neutral.dark.shadow:hover",
			//
			// Layout & Spacing
			"round.sm",
			"round.md",
			"round.lg",
			"round.xl",
			//
			// Shadows
			"shadow.sm",
			"shadow.md",
			"shadow.lg",
			"shadow.xl",
			//
			// Focus
			"focus.off",
			"focus.ring",
		],
		slot: [],
		variant: {},
	},
	({ def, what }) => ({
		token: def.token({
			// =====
			// Primary Tone - Modern Indigo/Purple
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
				"bg-indigo-100",
			]),
			"tone.primary.light.bg:odd": what.css([
				"bg-indigo-50",
			]),
			"tone.primary.light.border": what.css([
				"border-indigo-200",
			]),
			"tone.primary.light.border:hover": what.css([
				"hover:border-indigo-300",
			]),
			"tone.primary.light.shadow": what.css([
				"shadow-indigo-200/50",
			]),
			"tone.primary.light.shadow:hover": what.css([
				"hover:shadow-indigo-300/60",
			]),
			//
			"tone.primary.dark.text": what.css([
				"text-indigo-200",
			]),
			"tone.primary.dark.text:hover": what.css([
				"hover:text-indigo-100",
			]),
			"tone.primary.dark.bg": what.css([
				"bg-indigo-900",
			]),
			"tone.primary.dark.bg:hover": what.css([
				"hover:bg-indigo-800",
			]),
			"tone.primary.dark.bg:even": what.css([
				"bg-indigo-800",
			]),
			"tone.primary.dark.bg:odd": what.css([
				"bg-indigo-950",
			]),
			"tone.primary.dark.border": what.css([
				"border-indigo-700",
			]),
			"tone.primary.dark.border:hover": what.css([
				"hover:border-indigo-600",
			]),
			"tone.primary.dark.shadow": what.css([
				"shadow-indigo-900",
			]),
			"tone.primary.dark.shadow:hover": what.css([
				"hover:shadow-indigo-800/60",
			]),
			//
			// Secondary Tone - Modern Emerald/Teal
			"tone.secondary.light.text": what.css([
				"text-emerald-700",
			]),
			"tone.secondary.light.text:hover": what.css([
				"hover:text-emerald-800",
			]),
			"tone.secondary.light.bg": what.css([
				"bg-emerald-100",
			]),
			"tone.secondary.light.bg:hover": what.css([
				"hover:bg-emerald-200",
			]),
			"tone.secondary.light.bg:even": what.css([
				"bg-emerald-100",
			]),
			"tone.secondary.light.bg:odd": what.css([
				"bg-emerald-50",
			]),
			"tone.secondary.light.border": what.css([
				"border-emerald-200",
			]),
			"tone.secondary.light.border:hover": what.css([
				"hover:border-emerald-300",
			]),
			"tone.secondary.light.shadow": what.css([
				"shadow-emerald-200/50",
			]),
			"tone.secondary.light.shadow:hover": what.css([
				"hover:shadow-emerald-300/60",
			]),
			//
			"tone.secondary.dark.text": what.css([
				"text-emerald-200",
			]),
			"tone.secondary.dark.text:hover": what.css([
				"hover:text-emerald-100",
			]),
			"tone.secondary.dark.bg": what.css([
				"bg-emerald-900",
			]),
			"tone.secondary.dark.bg:hover": what.css([
				"hover:bg-emerald-800",
			]),
			"tone.secondary.dark.bg:even": what.css([
				"bg-emerald-800",
			]),
			"tone.secondary.dark.bg:odd": what.css([
				"bg-emerald-950",
			]),
			"tone.secondary.dark.border": what.css([
				"border-emerald-700",
			]),
			"tone.secondary.dark.border:hover": what.css([
				"hover:border-emerald-600",
			]),
			"tone.secondary.dark.shadow": what.css([
				"shadow-emerald-900/50",
			]),
			"tone.secondary.dark.shadow:hover": what.css([
				"hover:shadow-emerald-800/60",
			]),
			//
			// Danger Tone - Modern Red/Rose
			"tone.danger.light.text": what.css([
				"text-red-700",
			]),
			"tone.danger.light.text:hover": what.css([
				"hover:text-red-800",
			]),
			"tone.danger.light.bg": what.css([
				"bg-red-100",
			]),
			"tone.danger.light.bg:hover": what.css([
				"hover:bg-red-200",
			]),
			"tone.danger.light.bg:even": what.css([
				"bg-red-100",
			]),
			"tone.danger.light.bg:odd": what.css([
				"bg-red-50",
			]),
			"tone.danger.light.border": what.css([
				"border-red-200",
			]),
			"tone.danger.light.border:hover": what.css([
				"hover:border-red-300",
			]),
			"tone.danger.light.shadow": what.css([
				"shadow-red-200/50",
			]),
			"tone.danger.light.shadow:hover": what.css([
				"hover:shadow-red-300/60",
			]),
			//
			"tone.danger.dark.text": what.css([
				"text-red-200",
			]),
			"tone.danger.dark.text:hover": what.css([
				"hover:text-red-100",
			]),
			"tone.danger.dark.bg": what.css([
				"bg-red-900",
			]),
			"tone.danger.dark.bg:hover": what.css([
				"hover:bg-red-800",
			]),
			"tone.danger.dark.bg:even": what.css([
				"bg-red-800",
			]),
			"tone.danger.dark.bg:odd": what.css([
				"bg-red-950",
			]),
			"tone.danger.dark.border": what.css([
				"border-red-700",
			]),
			"tone.danger.dark.border:hover": what.css([
				"hover:border-red-600",
			]),
			"tone.danger.dark.shadow": what.css([
				"shadow-red-900/50",
			]),
			"tone.danger.dark.shadow:hover": what.css([
				"hover:shadow-red-800/60",
			]),
			//
			// Warning Tone - Modern Orange/Amber
			"tone.warning.light.text": what.css([
				"text-orange-700",
			]),
			"tone.warning.light.text:hover": what.css([
				"hover:text-orange-800",
			]),
			"tone.warning.light.bg": what.css([
				"bg-orange-100",
			]),
			"tone.warning.light.bg:hover": what.css([
				"hover:bg-orange-200",
			]),
			"tone.warning.light.bg:even": what.css([
				"bg-orange-100",
			]),
			"tone.warning.light.bg:odd": what.css([
				"bg-orange-50",
			]),
			"tone.warning.light.border": what.css([
				"border-orange-200",
			]),
			"tone.warning.light.border:hover": what.css([
				"hover:border-orange-300",
			]),
			"tone.warning.light.shadow": what.css([
				"shadow-orange-200/50",
			]),
			"tone.warning.light.shadow:hover": what.css([
				"hover:shadow-orange-300/60",
			]),
			//
			"tone.warning.dark.text": what.css([
				"text-orange-200",
			]),
			"tone.warning.dark.text:hover": what.css([
				"hover:text-orange-100",
			]),
			"tone.warning.dark.bg": what.css([
				"bg-orange-900",
			]),
			"tone.warning.dark.bg:hover": what.css([
				"hover:bg-orange-800",
			]),
			"tone.warning.dark.bg:even": what.css([
				"bg-orange-800",
			]),
			"tone.warning.dark.bg:odd": what.css([
				"bg-orange-950",
			]),
			"tone.warning.dark.border": what.css([
				"border-orange-700",
			]),
			"tone.warning.dark.border:hover": what.css([
				"hover:border-orange-600",
			]),
			"tone.warning.dark.shadow": what.css([
				"shadow-orange-900/50",
			]),
			"tone.warning.dark.shadow:hover": what.css([
				"hover:shadow-orange-800/60",
			]),
			//
			// Subtle Tone - Modern Amber/Warm
			"tone.subtle.light.text": what.css([
				"text-amber-700",
			]),
			"tone.subtle.light.text:hover": what.css([
				"hover:text-amber-800",
			]),
			"tone.subtle.light.bg": what.css([
				"bg-amber-100",
			]),
			"tone.subtle.light.bg:hover": what.css([
				"hover:bg-amber-200",
			]),
			"tone.subtle.light.bg:even": what.css([
				"bg-amber-100",
			]),
			"tone.subtle.light.bg:odd": what.css([
				"bg-amber-50",
			]),
			"tone.subtle.light.border": what.css([
				"border-amber-200",
			]),
			"tone.subtle.light.border:hover": what.css([
				"hover:border-amber-300",
			]),
			"tone.subtle.light.shadow": what.css([
				"shadow-amber-200/50",
			]),
			"tone.subtle.light.shadow:hover": what.css([
				"hover:shadow-amber-300/60",
			]),
			//
			"tone.subtle.dark.text": what.css([
				"text-amber-200",
			]),
			"tone.subtle.dark.text:hover": what.css([
				"hover:text-amber-100",
			]),
			"tone.subtle.dark.bg": what.css([
				"bg-amber-900",
			]),
			"tone.subtle.dark.bg:hover": what.css([
				"hover:bg-amber-800",
			]),
			"tone.subtle.dark.bg:even": what.css([
				"bg-amber-800",
			]),
			"tone.subtle.dark.bg:odd": what.css([
				"bg-amber-950",
			]),
			"tone.subtle.dark.border": what.css([
				"border-amber-700",
			]),
			"tone.subtle.dark.border:hover": what.css([
				"hover:border-amber-600",
			]),
			"tone.subtle.dark.shadow": what.css([
				"shadow-amber-900/50",
			]),
			"tone.subtle.dark.shadow:hover": what.css([
				"hover:shadow-amber-800/60",
			]),
			//
			// Neutral Tone - Modern Slate/Gray
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
				"bg-slate-100",
			]),
			"tone.neutral.light.bg:odd": what.css([
				"bg-slate-50",
			]),
			"tone.neutral.light.border": what.css([
				"border-slate-200",
			]),
			"tone.neutral.light.border:hover": what.css([
				"hover:border-slate-300",
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
				"bg-slate-900",
			]),
			"tone.neutral.dark.bg:hover": what.css([
				"hover:bg-slate-800",
			]),
			"tone.neutral.dark.bg:even": what.css([
				"bg-slate-800",
			]),
			"tone.neutral.dark.bg:odd": what.css([
				"bg-slate-950",
			]),
			"tone.neutral.dark.border": what.css([
				"border-slate-700",
			]),
			"tone.neutral.dark.border:hover": what.css([
				"hover:border-slate-600",
			]),
			"tone.neutral.dark.shadow": what.css([
				"shadow-slate-900/30",
			]),
			"tone.neutral.dark.shadow:hover": what.css([
				"hover:shadow-slate-800/40",
			]),
			//
			// Layout & Spacing
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
			//
			// Shadows
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
			//
			// Focus
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
		}),
		rules: [],
		defaults: def.defaults({}),
	}),
);
