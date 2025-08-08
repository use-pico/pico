import type { Component } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionModalCls = ActionCls.component({
	root: [],
	slots: [],
});

export namespace ActionModalCls {
	export type Props<P = unknown> = Component<typeof ActionModalCls, P>;
}
