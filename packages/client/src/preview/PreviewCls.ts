import { type Component, classes } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PreviewCls = PicoCls.component({
	slots: [
		"base",
		"container",
		"title",
		"links",
		"actions",
		"extra",
	],
	root: {
		base: classes([
			"pico--preview",
			"flex",
			"flex-col",
			"gap-2",
			"bg-(--color-bg)",
			"p-2",
			"rounded-md",
			"border",
			"border-(--color-border)",
		]),
		container: classes([
			"flex",
			"flex-row",
			"items-center",
			"justify-between",
			"gap-1",
		]),
		title: classes([
			"flex",
			"flex-row",
			"items-center",
			"gap-4",
		]),
		links: classes([
			"flex",
			"flex-row",
			"items-center",
			"gap-4",
			"justify-end",
		]),
		actions: classes([
			"flex",
			"flex-row",
			"items-center",
			"gap-4",
		]),
		extra: classes([
			"flex",
			"flex-row",
			"gap-4",
			"justify-end",
		]),
	},
});

export type PreviewCls = typeof PreviewCls;

export namespace PreviewCls {
	export type Props<P = unknown> = Component<PreviewCls, P>;
}
