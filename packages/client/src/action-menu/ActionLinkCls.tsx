import type { Component } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionLinkCls = ActionCls.component({
	slots: [],
	root: [],
});

export namespace ActionLinkCls {
	export type Props<P = unknown> = Component<typeof ActionLinkCls, P>;
}
