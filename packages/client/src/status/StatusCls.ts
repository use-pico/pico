import { cls } from "@use-pico/cls";

export const StatusCls = cls({
	slot: {
		base: [
			"w-full",
			"flex",
			"flex-col",
			"items-center",
			"justify-center",
		],
		title: [
			"text-xl",
			"text-bold",
			"w-full",
			"text-center",
		],
		message: [
			"text-base",
			"text-slate-500",
			"w-full",
			"text-center",
		],
		body: [
			"pt-2",
			"w-full",
		],
	},
	variant: {},
	defaults: {},
});

export namespace StatusCls {
	export type Props<P = unknown> = cls.Props<typeof StatusCls, P>;
}
