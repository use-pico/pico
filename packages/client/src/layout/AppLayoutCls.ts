import { type Component, classes } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AppLayoutCls = PicoCls.component({
	slots: [
		"base",
		"header",
		"content",
	],
	root: {
		base: classes([
			"min-h-screen",
			"flex",
			"flex-col",
		]),
		header: classes([
			"flex",
			"flex-row",
			"items-center",
			"bg-slate-50",
			"shadow-xs",
			"border-b",
			"border-b-slate-200",
			"w-full",
			"gap-4",
			"p-4",
		]),
		content: classes([
			"grow",
			"h-full",
			"border-b",
			"border-b-slate-200",
			"p-2",
		]),
	},
});

export namespace AppLayoutCls {
	export type Props<P = unknown> = Component<typeof AppLayoutCls, P>;
}
