import { type Component, classes } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const StatusCls = PicoCls.component({
	slots: [
		"base",
		"title",
		"message",
		"body",
	],
	root: {
		base: classes([
			"w-full",
			"flex",
			"flex-col",
			"items-center",
			"justify-center",
		]),
		title: classes([
			"text-xl",
			"text-bold",
			"w-full",
			"text-center",
		]),
		message: classes([
			"text-base",
			"text-slate-500",
			"w-full",
			"text-center",
		]),
		body: classes([
			"pt-2",
			"w-full",
		]),
	},
});

export type StatusCls = typeof StatusCls;

export namespace StatusCls {
	export type Props<P = unknown> = Component<typeof StatusCls, P>;
}
