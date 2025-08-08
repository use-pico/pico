import { type Component, component } from "@use-pico/cls";

export const TxCls = component({
	slots: [
		"base",
	],
	root: {
		base: {
			class: [],
		},
	},
	defaults: {},
});

export namespace TxCls {
	export type Props<P = unknown> = Component<typeof TxCls, P>;
}
