import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DeleteControlCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"content",
			"footer",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"DeleteControl-root",
					"flex",
					"flex-col",
					"gap-4",
				]),
				content: what.both(
					[
						"DeleteControl-content",
						"text-bold",
						"font-bold",
					],
					[
						"tone.danger.light.text",
					],
				),
				footer: what.css([
					"DeleteControl-footer",
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-4",
				]),
			}),
		],
		defaults: def.defaults({
			tone: "unset",
			theme: "unset",
		}),
	}),
);

export type DeleteControlCls = typeof DeleteControlCls;

export namespace DeleteControlCls {
	export type Props<P = unknown> = Cls.Props<DeleteControlCls, P>;
}
