import { type Component, classes, component } from "@use-pico/cls";

export const StatusCls = component({
	slots: [
		"base",
		"title",
		"message",
		"body",
	],
	slot: {
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

export namespace StatusCls {
	export type Props<P = unknown> = Component<typeof StatusCls, P>;
}
