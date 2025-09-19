import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const StatusCls = contract(PicoCls.contract)
	.slots([
		"root",
		"title",
		"body",
	])
	.def()
	.root({
		root: {
			class: [
				"Status-root",
				"w-full",
				"flex",
				"flex-col",
				"items-center",
				"justify-center",
				"gap-2",
			],
		},
		title: {
			class: [
				"Status-title",
				"flex",
				"flex-col",
				"gap-1",
				"items-center",
				"justify-center",
				"text-center",
			],
		},
		body: {
			class: [
				"Status-body",
			],
		},
	})
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

export type StatusCls = typeof StatusCls;

export namespace StatusCls {
	export type Props<P = unknown> = Cls.Props<typeof StatusCls, P>;
}
