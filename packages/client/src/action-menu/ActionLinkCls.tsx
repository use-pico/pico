import { type ClsProps, cls } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionLinkCls = cls({
	use: ActionCls,
	slot: {},
	variant: {},
	defaults: {},
});

export namespace ActionLinkCls {
	export type Props<P = unknown> = ClsProps<typeof ActionLinkCls, P>;
}
