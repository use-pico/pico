import { useCls, withCls } from "@use-pico/cls";
import type { FC, PropsWithChildren } from "react";
import { useRef } from "react";
import { SnapperCls } from "./SnapperCls";
import { SnapperCtx } from "./SnapperCtx";

export namespace Snapper {
	export interface Props extends SnapperCls.Props<PropsWithChildren> {
		orientation: "vertical" | "horizontal";
	}
}

export const BaseSnapper: FC<Snapper.Props> = ({
	orientation,
	cls = SnapperCls,
	tweak,
	children,
}) => {
	const slots = useCls(cls, tweak);
	const containerRef = useRef<HTMLDivElement | null>(null);

	return (
		<SnapperCtx
			value={{
				containerRef,
				orientation,
			}}
		>
			<div className={slots.root()}>{children}</div>
		</SnapperCtx>
	);
};

export const Snapper = withCls(BaseSnapper, SnapperCls);
