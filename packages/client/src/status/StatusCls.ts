import type { Cls } from "@use-pico/cls";
import { contract } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const StatusCls = contract(PicoCls.contract)
	.slots([
		"root",
		"title",
		"body",
		"action",
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
				"w-full",
			],
			token: [
				"square.md",
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
				"w-full",
			],
			token: [
				"square.md",
			],
		},
		body: {
			class: [
				"Status-body",
				"w-full",
			],
			token: [
				"square.md",
			],
		},
		action: {
			class: [
				"Status-action",
				"flex",
				"gap-2",
				"items-center",
				"justify-evenly",
				"w-full",
			],
			token: [
				"square.md",
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
