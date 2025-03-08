import { css } from "@use-pico/common";

export const AlertCss = css({
	slot: {
		base: ["border", "rounded", "py-2", "px-3", "flex", "flex-col"],
		title: ["font-semibold", "w-full"],
		message: ["opacity-85", "text-sm", "w-full"],
		body: ["border-t", "border-slate-300", "w-full"],
	},
	variant: {
		variant: {
			info: ["border-blue-200", "bg-blue-50", "text-blue-900"],
			success: ["border-green-500", "bg-green-100", "text-green-900"],
			warning: ["border-amber-500", "bg-amber-100", "text-amber-900"],
			error: ["border-red-500", "bg-red-100", "text-red-900"],
			neutral: ["border-slate-300", "bg-slate-100", "text-slate-600"],
			subtle: ["border-slate-100", "bg-slate-50", "text-slate-400"],
		},
		clickable: {
			true: ["cursor-pointer"],
		},
	},
	match: [
		{
			if: {
				variant: "info",
				clickable: true,
			},
			then: {
				base: "hover:bg-sky-200",
			},
		},
		{
			if: {
				variant: "success",
				clickable: true,
			},
			then: {
				base: "hover:bg-green-200",
			},
		},
		{
			if: {
				variant: "warning",
				clickable: true,
			},
			then: {
				base: "hover:bg-amber-200",
			},
		},
		{
			if: {
				variant: "error",
				clickable: true,
			},
			then: {
				base: "hover:bg-red-200",
			},
		},
		{
			if: {
				variant: "neutral",
				clickable: true,
			},
			then: {
				base: "hover:bg-slate-200",
			},
		},
		{
			if: {
				variant: "subtle",
				clickable: true,
			},
			then: {
				base: "hover:bg-slate-100",
			},
		},
	],
	defaults: {
		clickable: false,
		variant: "info",
	},
});

export namespace AlertCss {
	export type Props<P = unknown> = css.Props<typeof AlertCss, P>;
}
