import { cls } from "@use-pico/common";
import { ActionCls } from "./ActionCls";

export const ActionLinkCls = cls({
	use: ActionCls,
	slot: {},
	variant: {},
	defaults: {},
});

export namespace ActionLinkCls {
	export type Props<P = unknown> = cls.Props<typeof ActionLinkCls, P>;
}
