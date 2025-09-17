import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const StatusCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"title",
			"body",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"Status-root",
					"w-full",
					"flex",
					"flex-col",
					"items-center",
					"justify-center",
					"gap-2",
				]),
				title: what.css([
					"Status-title",
					"flex",
					"flex-col",
					"gap-1",
					"items-center",
					"justify-center",
					"text-center",
				]),
				body: what.css([
					"Status-body",
				]),
			}),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type StatusCls = typeof StatusCls;

export namespace StatusCls {
	export type Props<P = unknown> = Cls.Props<typeof StatusCls, P>;
}
