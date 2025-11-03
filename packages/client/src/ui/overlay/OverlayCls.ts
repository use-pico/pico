import { type Cls, contract } from "@use-pico/cls";
import { PicoCls } from "../../cls/PicoCls";

export const OverlayCls = contract(PicoCls.contract)
	.slots([
		"root",
		"top",
		"bottom",
	])
	.variant("opacity", [
		"100",
		"75",
		"50",
		"25",
		"15",
	])
	.variant("type", [
		"bg-1",
		"bg-2",
	])
	.variant("accent-from", [
		"primary.light",
		"primary.dark",
		"secondary.light",
		"secondary.dark",
		"danger.light",
		"danger.dark",
		"warning.light",
		"warning.dark",
		"neutral.light",
		"neutral.dark",
		"subtle.light",
		"subtle.dark",
		"link.light",
		"link.dark",
	])
	.variant("accent-to", [
		"primary.light",
		"primary.dark",
		"secondary.light",
		"secondary.dark",
		"danger.light",
		"danger.dark",
		"warning.light",
		"warning.dark",
		"neutral.light",
		"neutral.dark",
		"subtle.light",
		"subtle.dark",
		"link.light",
		"link.dark",
	])
	.def()
	.root({
		root: {
			class: [
				"Overlay-root",
				"pointer-events-none",
				"absolute",
				"h-dvh",
				"w-dvw",
				"top-0",
				"left-0",
				"overflow-hidden",
				"z-[100]",
			],
		},
		top: {
			class: [
				"absolute",
				"rounded-full",
			],
		},
		bottom: {
			class: [
				"absolute",
				"rounded-full",
			],
		},
	})
	//
	.match("opacity", "100", {
		root: {
			class: [
				"opacity-100",
			],
		},
	})
	.match("opacity", "75", {
		root: {
			class: [
				"opacity-75",
			],
		},
	})
	.match("opacity", "50", {
		root: {
			class: [
				"opacity-50",
			],
		},
	})
	.match("opacity", "25", {
		root: {
			class: [
				"opacity-25",
			],
		},
	})
	.match("opacity", "15", {
		root: {
			class: [
				"opacity-15",
			],
		},
	})
	//
	.match("type", "bg-1", {
		top: {
			class: [
				"-top-24",
				"right-[-10%]",
				"h-[36rem]",
				"w-[36rem]",
				"bg-gradient-to-br",
				"from-indigo-500/20",
				"to-cyan-500/10",
				"blur-2xl",
			],
		},
		bottom: {
			class: [
				"-bottom-16",
				"left-[-10%]",
				"h-[28rem]",
				"w-[28rem]",
				"bg-gradient-to-tl",
				"from-fuchsia-500/10",
				"to-purple-500/10",
				"blur-2xl",
			],
		},
	})
	.match("type", "bg-2", {
		top: {
			class: [
				"-top-14",
				"right-[-20%]",
				"h-[64rem]",
				"w-[64rem]",
				"bg-gradient-to-bl",
				"blur-2xl",
			],
		},
		bottom: {
			class: [
				"-bottom-24",
				"left-[-10%]",
				"h-[28rem]",
				"w-[28rem]",
				"bg-gradient-to-tr",
				"blur-2xl",
			],
		},
	})
	//
	// Accent From variants
	.match("accent-from", "primary.light", {
		top: {
			token: [
				"tone.primary.light.from",
			],
		},
	})
	.match("accent-from", "primary.dark", {
		top: {
			token: [
				"tone.primary.dark.from",
			],
		},
	})
	.match("accent-from", "secondary.light", {
		top: {
			token: [
				"tone.secondary.light.from",
			],
		},
	})
	.match("accent-from", "secondary.dark", {
		top: {
			token: [
				"tone.secondary.dark.from",
			],
		},
	})
	.match("accent-from", "danger.light", {
		top: {
			token: [
				"tone.danger.light.from",
			],
		},
	})
	.match("accent-from", "danger.dark", {
		top: {
			token: [
				"tone.danger.dark.from",
			],
		},
	})
	.match("accent-from", "warning.light", {
		top: {
			token: [
				"tone.warning.light.from",
			],
		},
	})
	.match("accent-from", "warning.dark", {
		top: {
			token: [
				"tone.warning.dark.from",
			],
		},
	})
	.match("accent-from", "neutral.light", {
		top: {
			token: [
				"tone.neutral.light.from",
			],
		},
	})
	.match("accent-from", "neutral.dark", {
		top: {
			token: [
				"tone.neutral.dark.from",
			],
		},
	})
	.match("accent-from", "subtle.light", {
		top: {
			token: [
				"tone.subtle.light.from",
			],
		},
	})
	.match("accent-from", "subtle.dark", {
		top: {
			token: [
				"tone.subtle.dark.from",
			],
		},
	})
	.match("accent-from", "link.light", {
		top: {
			token: [
				"tone.link.light.from",
			],
		},
	})
	.match("accent-from", "link.dark", {
		top: {
			token: [
				"tone.link.dark.from",
			],
		},
	})
	//
	.match("accent-to", "primary.light", {
		bottom: {
			token: [
				"tone.primary.light.to",
			],
		},
	})
	.match("accent-to", "primary.dark", {
		bottom: {
			token: [
				"tone.primary.dark.to",
			],
		},
	})
	.match("accent-to", "secondary.light", {
		bottom: {
			token: [
				"tone.secondary.light.to",
			],
		},
	})
	.match("accent-to", "secondary.dark", {
		bottom: {
			token: [
				"tone.secondary.dark.to",
			],
		},
	})
	.match("accent-to", "danger.light", {
		bottom: {
			token: [
				"tone.danger.light.to",
			],
		},
	})
	.match("accent-to", "danger.dark", {
		bottom: {
			token: [
				"tone.danger.dark.to",
			],
		},
	})
	.match("accent-to", "warning.light", {
		bottom: {
			token: [
				"tone.warning.light.to",
			],
		},
	})
	.match("accent-to", "warning.dark", {
		bottom: {
			token: [
				"tone.warning.dark.to",
			],
		},
	})
	.match("accent-to", "neutral.light", {
		bottom: {
			token: [
				"tone.neutral.light.to",
			],
		},
	})
	.match("accent-to", "neutral.dark", {
		bottom: {
			token: [
				"tone.neutral.dark.to",
			],
		},
	})
	.match("accent-to", "subtle.light", {
		bottom: {
			token: [
				"tone.subtle.light.to",
			],
		},
	})
	.match("accent-to", "subtle.dark", {
		bottom: {
			token: [
				"tone.subtle.dark.to",
			],
		},
	})
	.match("accent-to", "link.light", {
		bottom: {
			token: [
				"tone.link.light.to",
			],
		},
	})
	.match("accent-to", "link.dark", {
		bottom: {
			token: [
				"tone.link.dark.to",
			],
		},
	})
	//
	.defaults({
		opacity: "75",
		type: "bg-1",
		tone: "primary",
		theme: "light",
		"accent-from": "primary.light",
		"accent-to": "primary.dark",
	})
	.cls();

export type OverlayCls = typeof OverlayCls;

export namespace OverlayCls {
	export type Props<P = unknown> = Cls.Props<OverlayCls, P>;
}
