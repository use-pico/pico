import { type Cls, useCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { FlowCls } from "./FlowCls";

export namespace Flow {
	export interface Props extends FlowCls.Props<PropsWithChildren> {
		direction?: Cls.VariantOf<FlowCls, "direction">;
	}
}

export const Flow: FC<Flow.Props> = ({
	direction = "col",
	cls = FlowCls,
	tweak,
	children,
}) => {
	const slots = useCls(cls, tweak, ({ what }) => ({
		variant: what.variant({
			direction,
		}),
	}));

	return <div className={slots.root()}>{children}</div>;
};
